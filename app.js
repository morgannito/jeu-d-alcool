// État du jeu
let currentGame = null;
let currentChallenges = [];

// Base de données des défis
const games = {
    truthOrDare: {
        name: "Action ou Vérité",
        truths: [
            "Raconte ton pire date",
            "Quelle est ta plus grosse honte ?",
            "As-tu déjà menti à quelqu'un dans cette pièce ?",
            "Quelle est la chose la plus embarrassante sur ton téléphone ?",
            "Qui dans cette pièce aimerais-tu embrasser ?",
            "Quel est ton plus grand secret ?",
            "As-tu déjà triché dans une relation ?",
            "Quelle est ta plus grosse peur ?",
            "Raconte un mensonge que tu as dit récemment",
            "Qui est la dernière personne que tu as stalké sur les réseaux sociaux ?",
            "Quelle est la chose la plus bizarre que tu as faite bourré(e) ?",
            "As-tu déjà volé quelque chose ?",
            "Quel est ton fantasme le plus fou ?",
            "Si tu pouvais sortir avec quelqu'un ici, qui ce serait ?",
            "Quelle est la chose la plus gênante que tes parents t'aient surpris en train de faire ?"
        ],
        dares: [
            "Fais 10 pompes ou bois 3 gorgées",
            "Appelle ton ex ou cul sec",
            "Poste un selfie moche sur Instagram ou distribue 5 gorgées",
            "Embrasse la personne à ta gauche ou bois 2 gorgées",
            "Danse sur une table pendant 30 secondes ou cul sec",
            "Envoie un message bizarre à un contact aléatoire ou bois 4 gorgées",
            "Fais le tour de la pièce à quatre pattes ou distribue 3 gorgées",
            "Laisse quelqu'un écrire sur ton visage au marqueur ou bois 5 gorgées",
            "Imite quelqu'un dans la pièce jusqu'à ce qu'on devine ou cul sec",
            "Mange quelque chose du frigo les yeux fermés ou bois 3 gorgées",
            "Parle avec un accent pendant 3 tours ou distribue 4 gorgées",
            "Fais un lap dance à la personne de ton choix ou bois 6 gorgées",
            "Raconte une blague pourrie, si personne ne rit tu bois 3 gorgées",
            "Montre les 5 dernières photos de ta galerie ou bois 4 gorgées",
            "Fais le poirier contre un mur ou distribue 5 gorgées"
        ]
    },

    gage: {
        name: "Gage de Con",
        challenges: [
            {
                text: "Parle comme un pirate pendant 5 minutes",
                penalty: "Sinon bois 2 gorgées"
            },
            {
                text: "Fais un compliment bizarre à chaque personne dans la pièce",
                penalty: "Sinon bois 3 gorgées"
            },
            {
                text: "Mets ton t-shirt à l'envers pour le reste de la partie",
                penalty: "Sinon distribue 4 gorgées"
            },
            {
                text: "Fais une déclaration d'amour à un objet dans la pièce",
                penalty: "Sinon bois 2 gorgées"
            },
            {
                text: "Prends une photo de groupe ridicule et poste-la",
                penalty: "Sinon bois 5 gorgées"
            },
            {
                text: "Chante l'alphabet à l'envers",
                penalty: "Sinon cul sec"
            },
            {
                text: "Fais 20 jumping jacks",
                penalty: "Sinon bois 3 gorgées"
            },
            {
                text: "Invente une histoire sur la personne à ta droite",
                penalty: "Sinon bois 2 gorgées"
            },
            {
                text: "Parle uniquement en rimes pendant 3 tours",
                penalty: "Sinon distribue 5 gorgées"
            },
            {
                text: "Fais semblant d'être un mannequin sur un podium",
                penalty: "Sinon bois 4 gorgées"
            },
            {
                text: "Imite un animal jusqu'à ce que quelqu'un devine lequel",
                penalty: "Sinon bois 2 gorgées"
            },
            {
                text: "Raconte une blague en gardant un visage sérieux",
                penalty: "Sinon distribue 3 gorgées"
            },
            {
                text: "Fais un battle de danse avec la personne en face de toi",
                penalty: "Sinon vous buvez tous les deux 3 gorgées"
            },
            {
                text: "Échange un vêtement avec quelqu'un d'autre",
                penalty: "Sinon cul sec"
            },
            {
                text: "Imite un YouTubeur célèbre",
                penalty: "Sinon bois 2 gorgées"
            },
            {
                text: "Fais le moonwalk à travers la pièce",
                penalty: "Sinon distribue 4 gorgées"
            },
            {
                text: "Parle comme un robot pendant 2 tours",
                penalty: "Sinon bois 3 gorgées"
            },
            {
                text: "Raconte ton rêve le plus bizarre",
                penalty: "Sinon bois 2 gorgées"
            }
        ]
    },

    distribution: {
        name: "Distribution de Gorgées",
        challenges: [
            {
                text: "Tous ceux qui portent du noir boivent",
                sips: 2
            },
            {
                text: "Le plus jeune distribue 5 gorgées",
                sips: 5
            },
            {
                text: "Le plus vieux boit 3 gorgées",
                sips: 3
            },
            {
                text: "Tous ceux qui ont un iPhone boivent",
                sips: 2
            },
            {
                text: "Les célibataires boivent 2 gorgées",
                sips: 2
            },
            {
                text: "Les personnes en couple distribuent 3 gorgées chacune",
                sips: 3
            },
            {
                text: "Tous ceux qui ont bu de l'eau aujourd'hui boivent 2 gorgées",
                sips: 2
            },
            {
                text: "Le dernier arrivé à la soirée boit cul sec",
                sips: "cul sec"
            },
            {
                text: "Tous ceux qui portent des chaussettes boivent",
                sips: 2
            },
            {
                text: "La personne avec les cheveux les plus longs distribue 4 gorgées",
                sips: 4
            },
            {
                text: "Tous ceux qui ont Instagram boivent",
                sips: 1
            },
            {
                text: "Le plus grand distribue 3 gorgées",
                sips: 3
            },
            {
                text: "Tous ceux qui ont les yeux bleus boivent 2 gorgées",
                sips: 2
            },
            {
                text: "Les gauchers distribuent 5 gorgées",
                sips: 5
            },
            {
                text: "Tous ceux qui ont un animal de compagnie boivent",
                sips: 2
            },
            {
                text: "La personne avec le prénom le plus long boit 3 gorgées",
                sips: 3
            },
            {
                text: "Tous ceux qui sont nés en été boivent",
                sips: 2
            },
            {
                text: "Le dernier qui a posté sur les réseaux sociaux distribue 4 gorgées",
                sips: 4
            },
            {
                text: "Tous ceux qui ont déjà voyagé à l'étranger cette année boivent",
                sips: 2
            },
            {
                text: "La personne avec le plus de frères et soeurs distribue 6 gorgées",
                sips: 6
            }
        ]
    },

    roulette: {
        name: "Roulette Russe",
        challenges: [
            {
                text: "JACKPOT ! Distribue 10 gorgées comme tu veux",
                type: "jackpot"
            },
            {
                text: "Oups... Bois 5 gorgées",
                type: "drink"
            },
            {
                text: "CUL SEC !",
                type: "chug"
            },
            {
                text: "Tout le monde boit 2 gorgées !",
                type: "everyone"
            },
            {
                text: "Choisis quelqu'un qui boit 4 gorgées",
                type: "choose"
            },
            {
                text: "Safe ! Tu ne bois pas",
                type: "safe"
            },
            {
                text: "Bois 3 gorgées",
                type: "drink"
            },
            {
                text: "Distribue 5 gorgées",
                type: "give"
            },
            {
                text: "Les 2 personnes à côté de toi boivent 3 gorgées chacune",
                type: "neighbors"
            },
            {
                text: "Rejoue ! Lance à nouveau",
                type: "replay"
            },
            {
                text: "Bois 2 gorgées",
                type: "drink"
            },
            {
                text: "Tout le monde sauf toi boit 1 gorgée",
                type: "others"
            }
        ]
    }
};

// Démarrer un jeu
function startGame(gameType) {
    currentGame = gameType;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('gameArea').classList.remove('hidden');

    nextChallenge();
}

// Retour au menu
function backToMenu() {
    currentGame = null;
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('gameContent').innerHTML = '';
}

// Défi suivant
function nextChallenge() {
    let content = '';

    switch(currentGame) {
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
    }

    document.getElementById('gameContent').innerHTML = content;
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
    switch(challenge.type) {
        case 'jackpot':
        case 'safe':
            color = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            break;
        case 'chug':
            color = 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)';
            break;
        case 'everyone':
            color = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
            break;
    }

    return `
        <div class="challenge-card" style="background: ${color}">
            <div class="challenge-type">🎰 Roulette Russe</div>
            <div class="challenge-text">${challenge.text}</div>
        </div>
    `;
}

// Animation au chargement
window.addEventListener('load', () => {
    console.log('Jeux de soirée chargés ! 🍻');
});
