// État du jeu
let currentGame = null;
let games = null;
let challengeCount = 0;

// Nouveau: Système de joueurs
let players = [];
let currentPlayerIndex = 0;

// Nouveau: Historique des défis
let challengeHistory = [];
let currentHistoryIndex = -1;

// Nouveau: Difficulté sélectionnée
let selectedDifficulty = 'all'; // 'all', 'easy', 'medium', 'hard'

// Générateurs de défis massifs
const challengeGenerators = {
    // Générateur de vérités
    generateTruths: function() {
        const baseTruths = [
            "Raconte ton pire date",
            "Quelle est ta plus grosse honte ?",
            "As-tu déjà menti à quelqu'un dans cette pièce ?",
            "Quelle est la chose la plus embarrassante sur ton téléphone ?",
            "Qui dans cette pièce aimerais-tu embrasser ?",
            "Quel est ton plus grand secret ?",
            "As-tu déjà triché dans une relation ?",
            "Quelle est ta plus grosse peur ?",
            "Raconte un mensonge que tu as dit récemment",
            "Qui est la dernière personne que tu as stalké sur les réseaux sociaux ?"
        ];

        const prefixes = [
            "Avoue :", "Dis la vérité :", "Sois honnête :", "Confesse :",
            "Révèle :", "Raconte vraiment :", "Dis-nous :", "Explique-nous :",
            "Partage avec nous :", "Ose dire :"
        ];

        const questions = [
            "Quelle est la chose la plus embarrassante que tu aies faite ?",
            "Quel est ton plus gros regret ?",
            "Quelle est ta plus grande honte ?",
            "Quel secret caches-tu à tout le monde ?",
            "Quelle est la pire chose que tu aies dite sur quelqu'un ?",
            "Quel est ton fantasme le plus fou ?",
            "Quelle est ton addiction secrète ?",
            "Quel est ton comportement le plus bizarre ?",
            "Quelle est la chose la plus dégoûtante que tu fais ?",
            "Quel est ton mensonge le plus fréquent ?",
            "Quelle est ton habitude la plus honteuse ?",
            "Quel est ton vice caché ?",
            "Quelle est la chose que personne ne sait sur toi ?",
            "Quel est ton moment le plus gênant ?",
            "Quelle est ta peur la plus ridicule ?",
            "Quel est ton crush le plus inapproprié ?",
            "Quelle est la chose la plus illégale que tu aies faite ?",
            "Quel est ton souvenir le plus humiliant ?",
            "Quelle est ta plus grosse erreur ?",
            "Quel est le truc le plus bizarre que tu trouves attirant ?",
            "Quelle est ton opinion la plus impopulaire ?",
            "Quel est ton comportement toxique ?",
            "Quelle est la chose que tu regrettes le plus ?",
            "Quel est ton échec le plus cuisant ?",
            "Quelle est la vérité que tu ne diras jamais ?",
            "Quel est ton secret le plus dark ?",
            "Quelle est ton insécurité la plus profonde ?",
            "Quel est ton traumatisme d'enfance ?",
            "Quelle est la chose dont tu as le plus honte ?",
            "Quel est le mensonge que tu maintiens depuis le plus longtemps ?"
        ];

        const subjects = [
            "en amour", "avec tes parents", "au travail", "à l'école",
            "en soirée", "bourré(e)", "sur les réseaux sociaux", "en vacances",
            "avec tes amis", "en couple", "célibataire", "adolescent(e)",
            "avec ton ex", "avec ton crush", "en ligne", "IRL",
            "la semaine dernière", "cette année", "dans ta vie",
            "récemment", "enfant", "l'année dernière"
        ];

        let generatedTruths = [...baseTruths];

        // Génère des combinaisons
        for (let i = 0; i < 1200; i++) {
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const question = questions[Math.floor(Math.random() * questions.length)];
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            generatedTruths.push(`${prefix} ${question} ${subject} ?`);
        }

        // Ajoute des variations spécifiques
        const specificQuestions = [
            "As-tu déjà", "Raconte quand tu as", "Quelle fois tu as",
            "Confesse avoir", "Avoue que tu as", "Dis-nous si tu as"
        ];

        const actions = [
            "menti à tes parents", "volé quelque chose", "triché", "trompé quelqu'un",
            "fait semblant d'être malade", "espionné quelqu'un", "stalké un ex",
            "envoyé un message embarrassant", "été rejeté(e)", "échoué lamentablement",
            "fait quelque chose d'illégal", "regretté une décision", "blessé quelqu'un",
            "été toxique", "manipulé quelqu'un", "profité de quelqu'un",
            "menti sur ton âge", "exagéré la vérité", "caché quelque chose d'important",
            "fait du mal volontairement", "été hypocrite", "jugé quelqu'un injustement",
            "dit du mal dans le dos", "rompu cruellement", "ghosté quelqu'un",
            "fait une grosse erreur", "gâché une opportunité", "saboté quelque chose",
            "été jaloux(se) maladement", "agi par vengeance"
        ];

        for (let i = 0; i < 1300; i++) {
            const q = specificQuestions[Math.floor(Math.random() * specificQuestions.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];
            generatedTruths.push(`${q} ${action} ?`);
        }

        return generatedTruths;
    },

    // Générateur d'actions
    generateDares: function() {
        const baseDares = [
            "Fais 10 pompes ou bois 3 gorgées",
            "Appelle ton ex ou cul sec",
            "Poste un selfie moche sur Instagram ou distribue 5 gorgées",
            "Embrasse la personne à ta gauche ou bois 2 gorgées",
            "Danse sur une table pendant 30 secondes ou cul sec"
        ];

        const actions = [
            "Embrasse", "Masse", "Complimente", "Imite", "Danse avec",
            "Chante pour", "Fais un câlin à", "Regarde dans les yeux",
            "Fais un bisou à", "Serre dans tes bras", "Caresse la joue de",
            "Chuchote à l'oreille de", "Fais un slow avec", "Assieds-toi sur les genoux de",
            "Fais un lap dance à", "Fais un compliment physique à",
            "Raconte une histoire embarrassante à", "Fais rire",
            "Fais un câlin de 30 secondes à", "Partage ton verre avec"
        ];

        const targets = [
            "la personne à ta gauche", "la personne à ta droite",
            "la personne en face de toi", "la personne la plus proche",
            "quelqu'un au hasard", "tout le monde", "la personne de ton choix",
            "la personne la plus jeune", "la personne la plus âgée",
            "la personne la plus grande", "la personne la plus petite",
            "quelqu'un du sexe opposé", "quelqu'un du même sexe",
            "la personne avec les cheveux les plus longs", "ton voisin de gauche et de droite"
        ];

        const penalties = [
            "ou bois 2 gorgées", "ou bois 3 gorgées", "ou bois 4 gorgées",
            "ou bois 5 gorgées", "ou distribue 3 gorgées", "ou distribue 4 gorgées",
            "ou distribue 5 gorgées", "ou distribue 6 gorgées", "ou cul sec",
            "ou bois 6 gorgées", "ou tout le monde boit 2 gorgées"
        ];

        const physicalChallenges = [
            "Fais {num} pompes", "Fais {num} squats", "Fais {num} jumping jacks",
            "Fais {num} burpees", "Fais {num} abdos", "Fais le gainage {num} secondes",
            "Tiens en équilibre sur un pied {num} secondes", "Fais {num} sauts",
            "Cours sur place {num} secondes", "Fais la planche {num} secondes",
            "Fais {num} pompes d'une main", "Fais {num} tractions",
            "Fais le poirier {num} secondes", "Saute {num} fois",
            "Fais {num} fentes"
        ];

        const numbers = [5, 10, 15, 20, 25, 30, 40, 50, 60];

        let generatedDares = [...baseDares];

        // Génère des combinaisons actions + cibles + pénalités
        for (let i = 0; i < 1500; i++) {
            const action = actions[Math.floor(Math.random() * actions.length)];
            const target = targets[Math.floor(Math.random() * targets.length)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedDares.push(`${action} ${target} ${penalty}`);
        }

        // Génère des défis physiques
        for (let i = 0; i < 800; i++) {
            const challenge = physicalChallenges[Math.floor(Math.random() * physicalChallenges.length)];
            const num = numbers[Math.floor(Math.random() * numbers.length)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedDares.push(`${challenge.replace('{num}', num)} ${penalty}`);
        }

        // Défis de danse
        const danceStyles = [
            "twerk", "moonwalk", "robot", "breakdance", "hip-hop",
            "salsa", "danse du ventre", "danse classique", "country",
            "K-pop", "slow", "danse sensuelle", "danse ridicule"
        ];

        for (let i = 0; i < 400; i++) {
            const style = danceStyles[Math.floor(Math.random() * danceStyles.length)];
            const duration = [10, 20, 30, 45, 60][Math.floor(Math.random() * 5)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedDares.push(`Danse le ${style} pendant ${duration} secondes ${penalty}`);
        }

        // Défis de chant
        const singChallenges = [
            "Chante une chanson", "Rappe", "Chante l'alphabet", "Chante une berceuse",
            "Chante en opéra", "Chante en fausset", "Chante la Marseillaise",
            "Fais du beatbox", "Chante en yaourt", "Chante comme un cowboy"
        ];

        for (let i = 0; i < 400; i++) {
            const sing = singChallenges[Math.floor(Math.random() * singChallenges.length)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedDares.push(`${sing} ${penalty}`);
        }

        // Défis technologiques
        const techChallenges = [
            "Appelle ton ex", "Envoie un message à ton crush", "Poste une story embarrassante",
            "Like les posts de ton ex", "Envoie un message aléatoire",
            "Montre tes dernières photos", "Montre ton historique de recherche",
            "Appelle tes parents", "Envoie un vocal embarrassant",
            "Change ta photo de profil", "Poste un selfie moche"
        ];

        for (let i = 0; i < 400; i++) {
            const tech = techChallenges[Math.floor(Math.random() * techChallenges.length)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedDares.push(`${tech} ${penalty}`);
        }

        return generatedDares;
    },

    // Générateur de gages
    generateGages: function() {
        const baseGages = [
            {text: "Parle comme un pirate pendant 5 minutes", penalty: "Sinon bois 2 gorgées"},
            {text: "Fais un compliment bizarre à chaque personne", penalty: "Sinon bois 3 gorgées"},
            {text: "Imite un animal jusqu'à ce qu'on devine", penalty: "Sinon bois 2 gorgées"}
        ];

        const actions = [
            "Parle comme", "Imite", "Fais semblant d'être", "Agis comme",
            "Comporte-toi comme", "Joue le rôle de", "Incarne"
        ];

        const characters = [
            "un pirate", "un robot", "un bébé", "un vieux de 90 ans",
            "un zombie", "un extraterrestre", "un chat", "un chien",
            "un aristocrate", "un gangster", "un super-héros", "un fantôme",
            "une plante", "une machine à laver", "un mannequin",
            "un influenceur", "un YouTubeur", "un rappeur", "un cowboy",
            "un politicien", "un journaliste", "un commentateur sportif",
            "quelqu'un de bourré", "quelqu'un d'amoureux", "quelqu'un de triste",
            "quelqu'un de très heureux", "quelqu'un qui a peur", "quelqu'un en colère"
        ];

        const durations = [
            "pendant 3 minutes", "pendant 5 minutes", "pendant 2 tours",
            "pendant 3 tours", "jusqu'à ton prochain tour", "pendant 10 minutes"
        ];

        const penalties = [
            "Sinon bois 2 gorgées", "Sinon bois 3 gorgées", "Sinon bois 4 gorgées",
            "Sinon distribue 3 gorgées", "Sinon distribue 4 gorgées",
            "Sinon distribue 5 gorgées", "Sinon cul sec"
        ];

        let generatedGages = [...baseGages];

        // Génère des gages d'imitation
        for (let i = 0; i < 900; i++) {
            const action = actions[Math.floor(Math.random() * actions.length)];
            const character = characters[Math.floor(Math.random() * characters.length)];
            const duration = durations[Math.floor(Math.random() * durations.length)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedGages.push({
                text: `${action} ${character} ${duration}`,
                penalty: penalty
            });
        }

        // Gages de parole
        const speechPatterns = [
            "en rimes", "en verlan", "en inversant les mots", "en chuchotant",
            "en criant", "super vite", "super lentement", "en bégayant",
            "avec un accent anglais", "avec un accent espagnol",
            "avec un accent allemand", "avec un accent russe",
            "uniquement en questions", "en alexandrins",
            "comme Yoda", "comme un bébé", "comme un vieux"
        ];

        for (let i = 0; i < 700; i++) {
            const pattern = speechPatterns[Math.floor(Math.random() * speechPatterns.length)];
            const duration = durations[Math.floor(Math.random() * durations.length)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedGages.push({
                text: `Parle ${pattern} ${duration}`,
                penalty: penalty
            });
        }

        // Gages physiques
        const physicalGages = [
            "Fais le tour de la pièce en crabe",
            "Marche à reculons",
            "Fais le moonwalk partout où tu vas",
            "Saute au lieu de marcher",
            "Rampe au sol",
            "Marche sur les mains",
            "Fais tout avec les yeux fermés",
            "Garde les bras levés",
            "Reste accroupi",
            "Tiens en équilibre sur un pied",
            "Fais la planche",
            "Reste immobile comme une statue",
            "Bouge en ralenti",
            "Bouge en accéléré"
        ];

        for (let i = 0; i < 500; i++) {
            const gage = physicalGages[Math.floor(Math.random() * physicalGages.length)];
            const duration = durations[Math.floor(Math.random() * durations.length)];
            const penalty = penalties[Math.floor(Math.random() * penalties.length)];
            generatedGages.push({
                text: `${gage} ${duration}`,
                penalty: penalty
            });
        }

        return generatedGages;
    },

    // Générateur de distributions
    generateDistributions: function() {
        const baseDistributions = [
            {text: "Tous ceux qui portent du noir boivent", sips: 2},
            {text: "Le plus jeune distribue 5 gorgées", sips: 5},
            {text: "Le plus vieux boit 3 gorgées", sips: 3}
        ];

        const criteria = [
            "Tous ceux qui portent {couleur}",
            "Tous ceux qui ont {caracteristique}",
            "Tous ceux qui sont {etat}",
            "Tous ceux qui ont déjà {action}",
            "Tous ceux qui aiment {chose}"
        ];

        const couleurs = ["du noir", "du blanc", "du rouge", "du bleu", "du vert", "du jaune", "du rose", "du violet", "du gris", "du orange"];

        const caracteristiques = [
            "les yeux bleus", "les yeux verts", "les yeux marron",
            "les cheveux longs", "les cheveux courts", "les cheveux blonds",
            "les cheveux bruns", "les cheveux roux", "une barbe",
            "des lunettes", "des piercings", "des tatouages",
            "des chaussettes", "une montre", "des bijoux",
            "un téléphone iPhone", "un téléphone Android",
            "un animal de compagnie", "des frères et sœurs",
            "Instagram", "TikTok", "Snapchat", "Facebook", "Twitter"
        ];

        const etats = [
            "célibataires", "en couple", "en études", "qui travaillent",
            "nés en été", "nés en hiver", "nés au printemps", "nés en automne",
            "gauchers", "droitiers", "ambidextres", "végétariens", "fumeurs"
        ];

        const actions = [
            "voyagé à l'étranger", "menti aujourd'hui", "fait du sport cette semaine",
            "bu du café aujourd'hui", "posté sur les réseaux aujourd'hui",
            "embrassé quelqu'un ici", "pleuré récemment", "déménagé cette année",
            "changé de travail/école", "été malade cette année"
        ];

        const choses = ["le sport", "la musique", "les animaux", "voyager", "cuisiner", "lire", "les jeux vidéo"];

        const sipsValues = [1, 2, 3, 4, 5, 6, "cul sec"];

        let generatedDistributions = [...baseDistributions];

        // Génère des distributions basées sur les couleurs
        for (let i = 0; i < 400; i++) {
            const couleur = couleurs[Math.floor(Math.random() * couleurs.length)];
            const sips = sipsValues[Math.floor(Math.random() * sipsValues.length)];
            generatedDistributions.push({
                text: `Tous ceux qui portent ${couleur} boivent`,
                sips: sips
            });
        }

        // Caractéristiques
        for (let i = 0; i < 700; i++) {
            const carac = caracteristiques[Math.floor(Math.random() * caracteristiques.length)];
            const sips = sipsValues[Math.floor(Math.random() * sipsValues.length)];
            const action = Math.random() > 0.5 ? "boivent" : "distribuent";
            generatedDistributions.push({
                text: `Tous ceux qui ont ${carac} ${action} ${action === "boivent" ? "" : sips + " gorgées"}`.trim(),
                sips: sips
            });
        }

        // États
        for (let i = 0; i < 500; i++) {
            const etat = etats[Math.floor(Math.random() * etats.length)];
            const sips = sipsValues[Math.floor(Math.random() * sipsValues.length)];
            generatedDistributions.push({
                text: `Les ${etat} boivent`,
                sips: sips
            });
        }

        // Actions
        for (let i = 0; i < 500; i++) {
            const action = actions[Math.floor(Math.random() * actions.length)];
            const sips = sipsValues[Math.floor(Math.random() * sipsValues.length)];
            generatedDistributions.push({
                text: `Tous ceux qui ont ${action} boivent`,
                sips: sips
            });
        }

        // Superlatifs
        const superlatifs = [
            "Le plus jeune", "Le plus vieux", "Le plus grand", "Le plus petit",
            "Le plus bavard", "Le plus silencieux", "Le plus sportif", "Le moins sportif",
            "Le plus matinal", "Le plus du soir", "Le plus bronzé", "Le plus pâle",
            "Le plus ponctuel", "Le plus en retard", "Le plus organisé", "Le plus bordélique",
            "Le plus créatif", "Le plus logique", "Le plus drôle", "Le plus sérieux"
        ];

        for (let i = 0; i < 500; i++) {
            const superlatif = superlatifs[Math.floor(Math.random() * superlatifs.length)];
            const sips = sipsValues[Math.floor(Math.random() * sipsValues.length)];
            const action = Math.random() > 0.5 ? "boit" : "distribue";
            generatedDistributions.push({
                text: `${superlatif} ${action} ${sips} ${action === "boit" ? "gorgées" : "gorgées"}`,
                sips: sips
            });
        }

        return generatedDistributions;
    },

    // Générateur de roulette
    generateRoulette: function() {
        const baseRoulette = [
            {text: "JACKPOT ! Distribue 10 gorgées comme tu veux", type: "jackpot"},
            {text: "Oups... Bois 5 gorgées", type: "drink"},
            {text: "CUL SEC !", type: "chug"}
        ];

        let generatedRoulette = [...baseRoulette];

        // Génère des variations de boisson
        for (let i = 1; i <= 10; i++) {
            generatedRoulette.push({
                text: `Bois ${i} gorgée${i > 1 ? 's' : ''}`,
                type: "drink"
            });
        }

        // Génère des variations de distribution
        for (let i = 1; i <= 15; i++) {
            generatedRoulette.push({
                text: `Distribue ${i} gorgée${i > 1 ? 's' : ''}`,
                type: "give"
            });
        }

        // Événements spéciaux
        const specialEvents = [
            "Tout le monde boit {num} gorgées !",
            "Tout le monde sauf toi boit {num} gorgées",
            "Les {num} personnes à côté de toi boivent {num} gorgées",
            "Choisis {num} personnes qui boivent {num} gorgées chacune",
            "La personne à ta gauche boit {num} gorgées",
            "La personne à ta droite boit {num} gorgées",
            "Les personnes en face de toi boivent {num} gorgées"
        ];

        for (let i = 0; i < 300; i++) {
            const event = specialEvents[Math.floor(Math.random() * specialEvents.length)];
            const num = Math.floor(Math.random() * 5) + 1;
            generatedRoulette.push({
                text: event.replace(/{num}/g, num),
                type: "everyone"
            });
        }

        // Jackpots
        for (let i = 5; i <= 20; i += 5) {
            generatedRoulette.push({
                text: `JACKPOT ! Distribue ${i} gorgées !`,
                type: "jackpot"
            });
        }

        // Safe et combinaisons
        generatedRoulette.push({text: "Safe ! Tu ne bois pas", type: "safe"});
        generatedRoulette.push({text: "SUPER SAFE ! Tu distribues 8 gorgées", type: "jackpot"});
        generatedRoulette.push({text: "Rejoue ! Lance à nouveau", type: "replay"});
        generatedRoulette.push({text: "DOUBLE CUL SEC !", type: "chug"});
        generatedRoulette.push({text: "Bois la moitié de ton verre", type: "drink"});

        return generatedRoulette;
    }
};

// Initialisation des jeux avec génération massive
function initializeGames() {
    games = {
        truthOrDare: {
            name: "Action ou Vérité",
            truths: challengeGenerators.generateTruths(),
            dares: challengeGenerators.generateDares()
        },
        gage: {
            name: "Gage de Con",
            challenges: challengeGenerators.generateGages()
        },
        distribution: {
            name: "Distribution de Gorgées",
            challenges: challengeGenerators.generateDistributions()
        },
        roulette: {
            name: "Roulette Russe",
            challenges: challengeGenerators.generateRoulette()
        }
    };

    console.log(`🎮 Base de données chargée :`);
    console.log(`   - Vérités: ${games.truthOrDare.truths.length}`);
    console.log(`   - Actions: ${games.truthOrDare.dares.length}`);
    console.log(`   - Gages: ${games.gage.challenges.length}`);
    console.log(`   - Distributions: ${games.distribution.challenges.length}`);
    console.log(`   - Roulette: ${games.roulette.challenges.length}`);
    console.log(`   📊 TOTAL: ${
        games.truthOrDare.truths.length +
        games.truthOrDare.dares.length +
        games.gage.challenges.length +
        games.distribution.challenges.length +
        games.roulette.challenges.length
    } défis !`);
}

// Fonction pour toggle le son
function toggleSound() {
    const soundBtn = document.getElementById('soundToggle');
    const isEnabled = AudioSystem.toggle();

    if (isEnabled) {
        soundBtn.textContent = '🔊';
        soundBtn.classList.remove('muted');
        AudioSystem.sounds.success();
        showNotification('Son activé ! 🔊');
    } else {
        soundBtn.textContent = '🔇';
        soundBtn.classList.add('muted');
        showNotification('Son désactivé 🔇');
    }
}

// Afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-badge';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Démarrer un jeu (MODIFIÉ avec nouvelles fonctionnalités)
function startGame(gameType) {
    currentGame = gameType;
    challengeCount = 0;
    currentHistoryIndex = -1;
    challengeHistory = [];
    updateCounter();

    // Sons et effets
    AudioSystem.sounds.click();
    VisualEffects.createParticles(window.innerWidth / 2, window.innerHeight / 2);

    // Initialiser le système de joueurs
    if (players.length > 0) {
        currentPlayerIndex = 0;
        updateCurrentPlayer();
    }

    document.getElementById('menu').classList.add('hidden');
    document.getElementById('gameArea').classList.remove('hidden');
    document.getElementById('challengeCounter').classList.remove('hidden');

    // Réinitialiser les boutons de navigation
    document.getElementById('prevBtn').disabled = true;
    updateHistoryDisplay();

    nextChallenge();
}

// Retour au menu (MODIFIÉ)
function backToMenu() {
    currentGame = null;
    challengeCount = 0;

    // Sons et effets
    AudioSystem.sounds.click();

    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('challengeCounter').classList.add('hidden');
    document.getElementById('currentPlayerIndicator').classList.add('hidden');
    document.getElementById('historyPanel').classList.add('hidden');
    document.getElementById('gameContent').innerHTML = '';
}

// Mettre à jour le compteur
function updateCounter() {
    document.getElementById('counterValue').textContent = challengeCount;
}

// Défi suivant (MODIFIÉ avec nouvelles fonctionnalités)
function nextChallenge() {
    // Si on navigue dans l'historique, vérifier si on peut avancer
    if (currentHistoryIndex < challengeHistory.length - 1) {
        currentHistoryIndex++;
        displayChallengeFromHistory();
        updateNavigationButtons();
        AudioSystem.sounds.click();
        return;
    }

    // Nouveau défi
    let content = '';
    challengeCount++;
    updateCounter();

    // Son de nouveau défi
    AudioSystem.sounds.newChallenge();

    // Passer au joueur suivant
    if (players.length > 0) {
        nextPlayer();
    }

    // Générer le défi selon la catégorie
    switch(currentGame) {
        case 'mix':
            content = getMix();
            break;
        case 'truthOrDare':
            content = getTruthOrDare();
            break;
        case 'gage':
            content = getGage();
            break;
        case 'distribution':
            content = getDistribution();
            break;
        case 'roulette':
            content = getRoulette();
            break;
        case 'mime':
            content = getMime();
            break;
        case 'hotSeat':
            content = getHotSeat();
            break;
        case 'duel':
            content = getDuel();
            break;
        case 'vote':
            content = getVote();
            break;
        case 'histoire':
            content = getHistoire();
            break;
        case 'regles':
            content = getRegles();
            break;
        case 'compliment':
            content = getCompliment();
            break;
        case 'cascade':
            content = getCascade();
            break;
        case 'hotSexy':
            content = getHotSexy();
            break;
    }

    document.getElementById('gameContent').innerHTML = content;

    // Ajouter à l'historique
    addToHistory(content, currentGame);
}

// Action ou Vérité
function getTruthOrDare() {
    const isTruth = Math.random() < 0.5;
    const challenges = isTruth ? games.truthOrDare.truths : games.truthOrDare.dares;
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];

    return `
        <div class="challenge-card">
            <div class="challenge-type">${isTruth ? '🤔 Vérité' : '🎯 Action'}</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Gage de Con
function getGage() {
    const challenge = games.gage.challenges[Math.floor(Math.random() * games.gage.challenges.length)];

    return `
        <div class="challenge-card">
            <div class="challenge-type">🎯 Gage</div>
            <div class="challenge-text">${challenge.text}</div>
            <div class="penalty">⚠️ ${challenge.penalty}</div>
        </div>
    `;
}

// Distribution de Gorgées
function getDistribution() {
    const challenge = games.distribution.challenges[Math.floor(Math.random() * games.distribution.challenges.length)];

    return `
        <div class="challenge-card">
            <div class="challenge-type">🍺 Distribution</div>
            <div class="challenge-text">${challenge.text}</div>
            <div class="penalty">💧 ${challenge.sips} ${challenge.sips === 'cul sec' ? '' : 'gorgée(s)'}</div>
        </div>
    `;
}

// Roulette Russe
function getRoulette() {
    const challenge = games.roulette.challenges[Math.floor(Math.random() * games.roulette.challenges.length)];

    let color = '#667eea';

    // Effets spéciaux selon le type
    switch(challenge.type) {
        case 'jackpot':
        case 'safe':
            color = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            AudioSystem.sounds.jackpot();
            VisualEffects.createConfetti(30);
            VisualEffects.flash('rgba(56, 239, 125, 0.3)');
            break;
        case 'chug':
            color = 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)';
            AudioSystem.sounds.chug();
            VisualEffects.flash('rgba(235, 51, 73, 0.3)');
            setTimeout(() => {
                const card = document.querySelector('.challenge-card');
                if (card) VisualEffects.shake(card);
            }, 100);
            break;
        case 'everyone':
            color = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
            AudioSystem.sounds.warning();
            VisualEffects.createConfetti(15);
            break;
        default:
            // Sons normaux pour les autres types
            break;
    }

    return `
        <div class="challenge-card" style="background: ${color}">
            <div class="challenge-type">🎰 Roulette Russe</div>
            <div class="challenge-text">${challenge.text}</div>
        </div>
    `;
}

// Mime & Charades
function getMime() {
    const challenge = games.mime.challenges[Math.floor(Math.random() * games.mime.challenges.length)];

    return `
        <div class="challenge-card">
            <div class="challenge-type">🎬 Mime & Charades</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Hot Seat
function getHotSeat() {
    const challenge = games.hotSeat.challenges[Math.floor(Math.random() * games.hotSeat.challenges.length)];

    // Effet spécial pour hot seat
    AudioSystem.sounds.warning();
    VisualEffects.flash('rgba(255, 100, 0, 0.3)');

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            <div class="challenge-type">🔥 Hot Seat</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Duel
function getDuel() {
    const challenge = games.duel.challenges[Math.floor(Math.random() * games.duel.challenges.length)];

    // Effet spécial pour duel
    AudioSystem.sounds.warning();

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            <div class="challenge-type">⚔️ Duel</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Vote
function getVote() {
    const challenge = games.vote.challenges[Math.floor(Math.random() * games.vote.challenges.length)];

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)">
            <div class="challenge-type">🗳️ Vote</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Histoire à Raconter
function getHistoire() {
    const challenge = games.histoire.challenges[Math.floor(Math.random() * games.histoire.challenges.length)];

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)">
            <div class="challenge-type">📖 Histoire à Raconter</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Nouvelles Règles
function getRegles() {
    const challenge = games.regles.challenges[Math.floor(Math.random() * games.regles.challenges.length)];

    // Effet spécial pour nouvelle règle
    AudioSystem.sounds.success();
    VisualEffects.createParticles(window.innerWidth / 2, window.innerHeight / 2);

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)">
            <div class="challenge-type">📜 Nouvelle Règle</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Compliments
function getCompliment() {
    const challenge = games.compliment.challenges[Math.floor(Math.random() * games.compliment.challenges.length)];

    // Effet spécial pour compliment
    VisualEffects.createConfetti(20);

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)">
            <div class="challenge-type">💝 Compliment</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Cascade
function getCascade() {
    const challenge = games.cascade.challenges[Math.floor(Math.random() * games.cascade.challenges.length)];

    // Effet spécial pour cascade
    AudioSystem.sounds.warning();
    VisualEffects.flash('rgba(0, 184, 217, 0.3)');

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%)">
            <div class="challenge-type">🌊 Cascade</div>
            <div class="challenge-text">${challenge}</div>
        </div>
    `;
}

// Hot & Sexy
function getHotSexy() {
    const challenge = games.hotSexy.challenges[Math.floor(Math.random() * games.hotSexy.challenges.length)];

    // Effets spéciaux pour hot & sexy
    AudioSystem.sounds.chug();
    VisualEffects.flash('rgba(255, 20, 147, 0.4)');
    VisualEffects.createParticles(window.innerWidth / 2, window.innerHeight / 2);

    return `
        <div class="challenge-card" style="background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%)">
            <div class="challenge-type">🔥💋 Hot & Sexy</div>
            <div class="challenge-text">${challenge}</div>
            <div class="penalty" style="color: #fff; margin-top: 10px;">⚠️ 18+ - Consentement requis</div>
        </div>
    `;
}


// Animation au chargement
window.addEventListener('load', () => {
    initializeGames();
    console.log('Jeux de soirée chargés ! 🍻');

    // Ajouter des effets sonores sur les boutons
    const buttons = document.querySelectorAll('.game-btn, .next-btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            AudioSystem.sounds.hover();
        });
    });
});
