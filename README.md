# 🍻 Jeux de Soirée - Alcool

Application web de jeux de soirée avec de l'alcool pour animer vos soirées entre amis !

## 🎯 Plus de 10 000 défis générés dynamiquement !

Cette application contient une base de données massive avec plus de **11 000 défis uniques** générés aléatoirement pour garantir des soirées toujours différentes et jamais ennuyeuses !

## 🎮 Modes de Jeu

### 1. Action ou Vérité 🎭
Le classique ! Choisis entre répondre à une question embarrassante ou relever un défi fou.
- Questions vérité
- Défis action
- Pénalités variées si tu refuses

### 2. Gage de Con 🎯
Des gages hilarants à réaliser, sinon tu bois !
- Gages drôles et embarrassants
- Pénalités en gorgées
- Possibilité de distribuer des gorgées

### 3. Distribution de Gorgées 🍺
Des règles aléatoires qui déterminent qui boit ou qui distribue des gorgées.
- Basé sur des caractéristiques (âge, apparence, etc.)
- Distribution de 1 à 6 gorgées
- Parfois tout le monde boit !

### 4. Roulette Russe 🎰
Tente ta chance ! Tu peux gagner gros ou tout perdre.
- Jackpot : distribue 10 gorgées
- Safe : tu ne bois pas
- Cul sec : à tes risques et périls
- Effets variés et surprenants

## 🚀 Installation

### Option 1 : Docker (Recommandé) 🐳

**La méthode la plus simple !** Lancez l'application en une seule commande :

```bash
# Cloner le dépôt
git clone https://github.com/morgannito/jeu-d-alcool.git
cd jeu-d-alcool

# Lancer avec Docker Compose
docker-compose up -d
```

L'application sera accessible sur **http://localhost:8080** 🎉

#### Commandes Docker utiles :

```bash
# Démarrer l'application
docker-compose up -d

# Arrêter l'application
docker-compose down

# Voir les logs
docker-compose logs -f

# Rebuilder après modifications
docker-compose up -d --build
```

#### Ou avec Docker directement :

```bash
# Build l'image
docker build -t jeu-alcool .

# Lancer le container
docker run -d -p 8080:80 --name jeu-alcool-app jeu-alcool

# Arrêter le container
docker stop jeu-alcool-app

# Supprimer le container
docker rm jeu-alcool-app
```

### Option 2 : Sans Docker

Aucune installation nécessaire ! Il suffit d'ouvrir `index.html` dans votre navigateur.

```bash
# Cloner le dépôt
git clone https://github.com/morgannito/jeu-d-alcool.git

# Ouvrir le fichier
cd jeu-d-alcool
open index.html  # ou double-cliquez sur le fichier
```

## 📱 Utilisation

1. **Avec Docker** : Ouvrez http://localhost:8080 dans votre navigateur
2. **Sans Docker** : Ouvrez `index.html` dans votre navigateur
3. Choisissez un mode de jeu
4. Cliquez sur "Suivant" pour obtenir de nouveaux défis
5. Amusez-vous bien !

## ⚠️ Avertissement

**À consommer avec modération**
- Ne buvez pas si vous conduisez
- Respectez vos limites
- Prenez soin les uns des autres
- Il s'agit d'un jeu, l'objectif est de s'amuser, pas de se mettre en danger

## 🛠️ Technologies

- HTML5
- CSS3 (avec animations et design responsive)
- JavaScript vanilla

## 🎨 Fonctionnalités

### Jeux
- ✅ **4 modes de jeu** différents avec 11 000+ défis
- ✅ **Génération dynamique** de défis uniques
- ✅ **Compteur de défis** en temps réel

### Effets Audiovisuels
- ✅ **7 types de sons** générés avec Web Audio API
- ✅ **Confettis animés** pour les jackpots
- ✅ **Particules explosives** et flash d'écran
- ✅ **15+ animations CSS** (shake, pulse, glow, bounce, rotate3D)
- ✅ **Notifications toast** contextuelles
- ✅ **Toggle son** pour activer/désactiver l'audio

### Design & UX
- ✅ **Design moderne** et responsive
- ✅ **Interface intuitive** et fluide
- ✅ **Compatible** mobile et desktop
- ✅ **Gradient animé** en arrière-plan
- ✅ **Effets visuels contextuels** selon le type de défi

### Technique
- ✅ **Aucune dépendance** externe
- ✅ **Docker Ready** - Déploiement en une commande
- ✅ **Léger et rapide** - Container nginx alpine
- ✅ **100% JavaScript vanilla**

## 📝 Personnalisation

Vous pouvez facilement ajouter vos propres défis en modifiant le fichier `app.js` :

```javascript
// Exemple : ajouter une nouvelle vérité
games.truthOrDare.truths.push("Votre nouvelle question ?");

// Exemple : ajouter un nouveau gage
games.gage.challenges.push({
    text: "Votre nouveau gage",
    penalty: "Sinon bois X gorgées"
});
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à proposer de nouveaux défis ou des améliorations.

## 📄 Licence

Ce projet est libre d'utilisation pour un usage personnel et entre amis.

---

**Amusez-vous bien et buvez responsable ! 🍻**
