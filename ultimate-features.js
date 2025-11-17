// ===================================
// ULTIMATE EDITION - TOUTES LES FONCTIONNALITÉS
// ===================================

// Variables globales
let players = [];
let currentPlayerIndex = 0;
let teams = [];
let teamMode = false;
let challengeHistory = [];
let currentHistoryIndex = -1;
let selectedDifficulty = 'all';
let sessionStartTime = Date.now();

// Achievements
const achievements = {
    first: { id: 'first', name: 'Premier défi', desc: 'Complète ton premier défi', icon: '🎯', unlocked: false, condition: () => challengeCount >= 1 },
    ten: { id: 'ten', name: 'Échauffement', desc: 'Complète 10 défis', icon: '🔥', unlocked: false, condition: () => challengeCount >= 10 },
    fifty: { id: 'fifty', name: 'Warrior', desc: 'Complète 50 défis', icon: '⚔️', unlocked: false, condition: () => challengeCount >= 50 },
    party: { id: 'party', name: 'Party Animal', desc: 'Joue pendant 30 min', icon: '🎉', unlocked: false, condition: () => (Date.now() - sessionStartTime) >= 1800000 },
    team: { id: 'team', name: 'Esprit d\'équipe', desc: 'Joue en mode équipe', icon: '👥', unlocked: false, condition: () => teamMode },
    mix: { id: 'mix', name: 'Maître du Mix', desc: 'Joue 10 défis en mode Mix', icon: '🎲', unlocked: false, condition: () => mixCount >= 10 },
    hard: { id: 'hard', name: 'Casse-cou', desc: 'Complète 10 défis difficiles', icon: '😈', unlocked: false, condition: () => hardCount >= 10 },
    social: { id: 'social', name: 'Social', desc: 'Joue avec 5+ joueurs', icon: '🎭', unlocked: false, condition: () => players.length >= 5 },
    night: { id: 'night', name: 'Oiseau de nuit', desc: 'Joue après minuit', icon: '🌙', unlocked: false, condition: () => new Date().getHours() >= 0 && new Date().getHours() < 6 },
    legend: { id: 'legend', name: 'Légende', desc: 'Complète 100 défis', icon: '👑', unlocked: false, condition: () => challengeCount >= 100 }
};

let mixCount = 0;
let hardCount = 0;

// Playlist
const playlists = {
    party: ['Party Rock Anthem', 'Uptown Funk', 'Don\'t Stop Me Now', 'Celebration', 'September'],
    chill: ['Sunday Morning', 'Fireflies', 'Budapest', 'Riptide', 'Home'],
    intense: ['Eye of the Tiger', 'Thunderstruck', 'Till I Collapse', 'Lose Yourself', 'We Will Rock You']
};

let currentPlaylist = 'none';
let currentTrackIndex = 0;
let isPlaying = false;

// ===== FONCTIONS JOUEURS =====

function addPlayer() {
    const input = document.getElementById('playerNameInput');
    const name = input.value.trim();

    if (name && players.length < 10) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'];
        players.push({
            name: name,
            color: colors[players.length % colors.length],
            score: 0
        });
        input.value = '';
        updatePlayerList();
        updateStartButton();
        if (typeof AudioSystem !== 'undefined') AudioSystem.sounds.success();
    }
}

function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerList();
    updateStartButton();
}

function updatePlayerList() {
    const list = document.getElementById('playerList');
    list.innerHTML = players.map((p, i) => `
        <div class="player-card" style="background: ${p.color}">
            <span>${p.name}</span>
            <button onclick="removePlayer(${i})">×</button>
        </div>
    `).join('');
}

function updateCurrentPlayer() {
    const indicator = document.getElementById('currentPlayerIndicator');
    const nameSpan = document.getElementById('currentPlayerName');

    if (players.length > 0 && !teamMode) {
        const player = players[currentPlayerIndex];
        nameSpan.textContent = `Tour de ${player.name}`;
        nameSpan.style.color = player.color;
        indicator.classList.remove('hidden');
    } else if (teamMode && teams.length > 0) {
        const team = teams[currentPlayerIndex % teams.length];
        nameSpan.textContent = `Équipe ${team.name}`;
        nameSpan.style.color = team.color;
        indicator.classList.remove('hidden');
    } else {
        indicator.classList.add('hidden');
    }
}

function nextPlayer() {
    if (teamMode && teams.length > 0) {
        currentPlayerIndex = (currentPlayerIndex + 1) % teams.length;
    } else if (players.length > 0) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }
    updateCurrentPlayer();
}

// ===== FONCTIONS ÉQUIPES =====

function toggleTeamMode() {
    teamMode = document.getElementById('teamModeCheckbox').checked;
    const playersSection = document.getElementById('playersSection');
    const teamsSection = document.getElementById('teamsSection');

    if (teamMode) {
        playersSection.classList.add('hidden');
        teamsSection.classList.remove('hidden');
        players = []; // Reset players
        updatePlayerList();
    } else {
        playersSection.classList.remove('hidden');
        teamsSection.classList.add('hidden');
        teams = []; // Reset teams
        updateTeamsList();
    }
    updateStartButton();
}

function addTeam() {
    const input = document.getElementById('teamNameInput');
    const name = input.value.trim();

    if (name && teams.length < 4) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
        teams.push({
            name: name,
            color: colors[teams.length % colors.length],
            score: 0
        });
        input.value = '';
        updateTeamsList();
        updateStartButton();
        if (typeof AudioSystem !== 'undefined') AudioSystem.sounds.success();
    }
}

function removeTeam(index) {
    teams.splice(index, 1);
    updateTeamsList();
    updateStartButton();
}

function updateTeamsList() {
    const list = document.getElementById('teamsList');
    list.innerHTML = teams.map((t, i) => `
        <div class="team-card" style="background: ${t.color}">
            <span>${t.name}</span>
            <button onclick="removeTeam(${i})">×</button>
        </div>
    `).join('');
}

function updateTeamScores() {
    const scoresDiv = document.getElementById('teamScores');
    const scoresList = document.getElementById('scoresList');

    if (teamMode && teams.length > 0) {
        scoresDiv.classList.remove('hidden');
        scoresList.innerHTML = teams.map(t => `
            <div class="team-score" style="border-left: 4px solid ${t.color}">
                <div class="team-score-name">${t.name}</div>
                <div class="team-score-points">${t.score} pts</div>
            </div>
        `).join('');
    } else {
        scoresDiv.classList.add('hidden');
    }
}

function addPointsToCurrentTeam(points) {
    if (teamMode && teams.length > 0) {
        teams[currentPlayerIndex % teams.length].score += points;
        updateTeamScores();
    }
}

// ===== FONCTIONS SETUP =====

function updateStartButton() {
    const btn = document.getElementById('startBtn');
    const canStart = (teamMode && teams.length >= 2) || (!teamMode && players.length > 0) || (!teamMode && players.length === 0);
    btn.disabled = !canStart;
}

function skipSetup() {
    players = [];
    teams = [];
    teamMode = false;
    showMenu();
}

function startWithConfig() {
    showMenu();
    if (typeof AudioSystem !== 'undefined') {
        AudioSystem.sounds.success();
        VisualEffects.createConfetti(30);
    }
}

function showMenu() {
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
    updateTeamScores();
}

function backToSetup() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('playerSetup').classList.remove('hidden');
}

// ===== FONCTIONS HISTORIQUE =====

function addToHistory(content) {
    challengeHistory.push({
        content: content,
        number: challengeCount,
        game: currentGame
    });
    currentHistoryIndex = challengeHistory.length - 1;
    updateHistoryDisplay();
    updateNavigationButtons();
}

function toggleHistory() {
    const panel = document.getElementById('historyPanel');
    panel.classList.toggle('hidden');
}

function updateHistoryDisplay() {
    const list = document.getElementById('historyList');
    const count = document.getElementById('historyCount');

    count.textContent = challengeHistory.length;
    list.innerHTML = challengeHistory.slice().reverse().map(h => `
        <div class="history-item">
            <strong>#${h.number}</strong> - ${h.game}
        </div>
    `).join('');
}

function previousChallenge() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        const challenge = challengeHistory[currentHistoryIndex];
        document.getElementById('gameContent').innerHTML = challenge.content;
        document.getElementById('counterValue').textContent = challenge.number;
        updateNavigationButtons();
        if (typeof AudioSystem !== 'undefined') AudioSystem.sounds.click();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentHistoryIndex <= 0;
    nextBtn.textContent = currentHistoryIndex < challengeHistory.length - 1 ? 'Suivant →' : 'Nouveau défi →';
}

// ===== FONCTIONS DIFFICULTÉ =====

function updateDifficulty() {
    selectedDifficulty = document.getElementById('difficultySelect').value;
    if (typeof AudioSystem !== 'undefined') AudioSystem.sounds.click();
}

function getDifficultyLevel(challenge) {
    const text = (typeof challenge === 'string' ? challenge : challenge.text || '').toLowerCase();

    if (text.includes('cul sec') || text.includes('strip') || text.includes('embrasse') ||
        text.includes('18+') || text.includes('body shot') || /\d+/.test(text) && parseInt(text.match(/\d+/)?.[0] || 0) >= 6) {
        return 'hard';
    }

    if (text.includes('pompes') || text.includes('danse') || text.includes('chante') ||
        /\d+/.test(text) && parseInt(text.match(/\d+/)?.[0] || 0) >= 3) {
        return 'medium';
    }

    return 'easy';
}

// ===== MODE MIX =====

function getMix() {
    const categories = ['truthOrDare', 'gage', 'distribution', 'roulette', 'mime', 'hotSeat', 'duel', 'vote', 'histoire', 'regles', 'compliment', 'cascade', 'hotSexy'];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];

    const tempGame = currentGame;
    currentGame = randomCat;

    let content = '';
    switch(randomCat) {
        case 'truthOrDare': content = getTruthOrDare(); break;
        case 'gage': content = getGage(); break;
        case 'distribution': content = getDistribution(); break;
        case 'roulette': content = getRoulette(); break;
        case 'mime': content = getMime(); break;
        case 'hotSeat': content = getHotSeat(); break;
        case 'duel': content = getDuel(); break;
        case 'vote': content = getVote(); break;
        case 'histoire': content = getHistoire(); break;
        case 'regles': content = getRegles(); break;
        case 'compliment': content = getCompliment(); break;
        case 'cascade': content = getCascade(); break;
        case 'hotSexy': content = getHotSexy(); break;
    }

    currentGame = tempGame;
    mixCount++;

    const badge = '<div style="background: gold; color: black; padding: 5px 15px; border-radius: 15px; display: inline-block; margin-bottom: 10px; font-weight: bold;">🎲 MODE MIX</div>';
    return content.replace('<div class="challenge-card', badge + '<div class="challenge-card');
}

// ===== ACHIEVEMENTS =====

function loadAchievements() {
    const saved = localStorage.getItem('achievements');
    if (saved) {
        const data = JSON.parse(saved);
        Object.keys(data).forEach(key => {
            if (achievements[key]) achievements[key].unlocked = data[key];
        });
    }
    updateAchievementsDisplay();
}

function saveAchievements() {
    const data = {};
    Object.keys(achievements).forEach(key => {
        data[key] = achievements[key].unlocked;
    });
    localStorage.setItem('achievements', JSON.stringify(data));
}

function checkAchievements() {
    Object.values(achievements).forEach(ach => {
        if (!ach.unlocked && ach.condition()) {
            unlockAchievement(ach.id);
        }
    });
}

function unlockAchievement(id) {
    const ach = achievements[id];
    if (ach && !ach.unlocked) {
        ach.unlocked = true;
        saveAchievements();
        showAchievementNotification(ach);
        updateAchievementsDisplay();
    }
}

function showAchievementNotification(ach) {
    const notif = document.createElement('div');
    notif.className = 'achievement-notification';
    notif.innerHTML = `
        <div class="achievement-icon">${ach.icon}</div>
        <div class="achievement-info">
            <div class="achievement-title">Achievement Débloqué !</div>
            <div class="achievement-name">${ach.name}</div>
            <div class="achievement-desc">${ach.desc}</div>
        </div>
    `;
    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add('show'), 100);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 500);
    }, 4000);

    if (typeof AudioSystem !== 'undefined') AudioSystem.sounds.jackpot();
}

function toggleAchievements() {
    document.getElementById('achievementsPanel').classList.toggle('hidden');
    updateAchievementsDisplay();
}

function updateAchievementsDisplay() {
    const list = document.getElementById('achievementsList');
    const unlocked = Object.values(achievements).filter(a => a.unlocked).length;

    document.getElementById('statsTotal').textContent = challengeCount;
    document.getElementById('statsUnlocked').textContent = unlocked;

    list.innerHTML = Object.values(achievements).map(a => `
        <div class="achievement-item ${a.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${a.icon}</div>
            <div class="achievement-details">
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.desc}</div>
            </div>
            ${a.unlocked ? '<div class="achievement-check">✓</div>' : ''}
        </div>
    `).join('');
}

// ===== MUSIC =====

function toggleMusic() {
    document.getElementById('musicPanel').classList.toggle('hidden');
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playPauseBtn');
    btn.textContent = isPlaying ? '⏸️' : '▶️';
    updateCurrentTrack();
}

function nextTrack() {
    if (currentPlaylist !== 'none') {
        currentTrackIndex = (currentTrackIndex + 1) % playlists[currentPlaylist].length;
        updateCurrentTrack();
    }
}

function prevTrack() {
    if (currentPlaylist !== 'none') {
        currentTrackIndex = (currentTrackIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
        updateCurrentTrack();
    }
}

function changePlaylist() {
    currentPlaylist = document.getElementById('playlistSelect').value;
    currentTrackIndex = 0;
    updateCurrentTrack();
}

function updateCurrentTrack() {
    const trackSpan = document.getElementById('currentTrack');
    if (currentPlaylist === 'none' || !isPlaying) {
        trackSpan.textContent = 'Aucune musique';
    } else {
        trackSpan.textContent = playlists[currentPlaylist][currentTrackIndex];
    }
}

// ===== OVERRIDE NEXTCHALLENGE =====

const originalNextChallenge = nextChallenge;

function nextChallenge() {
    // Navigation dans l'historique
    if (currentHistoryIndex < challengeHistory.length - 1) {
        currentHistoryIndex++;
        const challenge = challengeHistory[currentHistoryIndex];
        document.getElementById('gameContent').innerHTML = challenge.content;
        document.getElementById('counterValue').textContent = challenge.number;
        updateNavigationButtons();
        return;
    }

    // Nouveau défi
    challengeCount++;
    updateCounter();

    if (typeof AudioSystem !== 'undefined') AudioSystem.sounds.newChallenge();

    // Passer au joueur/équipe suivant
    nextPlayer();

    // Points pour l'équipe (si mode équipe)
    if (teamMode && teams.length > 0) {
        addPointsToCurrentTeam(1);
    }

    // Obtenir le défi
    let content = '';
    if (currentGame === 'mix') {
        content = getMix();
        if (getDifficultyLevel(content) === 'hard') hardCount++;
    } else {
        switch(currentGame) {
            case 'truthOrDare': content = getTruthOrDare(); break;
            case 'gage': content = getGage(); break;
            case 'distribution': content = getDistribution(); break;
            case 'roulette': content = getRoulette(); break;
            case 'mime': content = getMime(); break;
            case 'hotSeat': content = getHotSeat(); break;
            case 'duel': content = getDuel(); break;
            case 'vote': content = getVote(); break;
            case 'histoire': content = getHistoire(); break;
            case 'regles': content = getRegles(); break;
            case 'compliment': content = getCompliment(); break;
            case 'cascade': content = getCascade(); break;
            case 'hotSexy': content = getHotSexy(); break;
        }
        if (getDifficultyLevel(content) === 'hard') hardCount++;
    }

    document.getElementById('gameContent').innerHTML = content;
    addToHistory(content);

    // Check achievements
    checkAchievements();
}

// ===== OVERRIDE STARTGAME =====

const originalStartGame = startGame;

function startGame(gameType) {
    currentGame = gameType;
    challengeCount = 0;
    challengeHistory = [];
    currentHistoryIndex = -1;
    updateCounter();

    if (typeof AudioSystem !== 'undefined') {
        AudioSystem.sounds.click();
        VisualEffects.createParticles(window.innerWidth / 2, window.innerHeight / 2);
    }

    // Initialiser joueurs/équipes
    if (players.length > 0 || teams.length > 0) {
        currentPlayerIndex = 0;
        updateCurrentPlayer();
    }

    document.getElementById('menu').classList.add('hidden');
    document.getElementById('gameArea').classList.remove('hidden');
    document.getElementById('challengeCounter').classList.remove('hidden');

    updateNavigationButtons();
    nextChallenge();
}

// ===== OVERRIDE BACKTOMENU =====

const originalBackToMenu = backToMenu;

function backToMenu() {
    currentGame = null;

    if (typeof AudioSystem !== 'undefined') AudioSystem.sounds.click();

    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('challengeCounter').classList.add('hidden');
    document.getElementById('currentPlayerIndicator').classList.add('hidden');
    document.getElementById('historyPanel').classList.add('hidden');
    document.getElementById('gameContent').innerHTML = '';
}

// ===== INITIALISATION =====

window.addEventListener('load', () => {
    loadAchievements();

    // Support Enter pour ajouter joueur
    const playerInput = document.getElementById('playerNameInput');
    const teamInput = document.getElementById('teamNameInput');

    playerInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addPlayer();
    });

    teamInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTeam();
    });

    console.log('🎮 Ultimate Edition chargée ! Toutes les fonctionnalités activées !');
});
