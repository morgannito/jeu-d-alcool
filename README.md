# 🍻 Jeux de Soirée - Alcool

Application web de jeux de soirée avec de l'alcool pour animer vos soirées entre amis !

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

Aucune installation nécessaire ! Il suffit d'ouvrir `index.html` dans votre navigateur.

```bash
# Cloner le dépôt
git clone https://github.com/morgannito/jeu-d-alcool.git

# Ouvrir le fichier
cd jeu-d-alcool
open index.html  # ou double-cliquez sur le fichier
```

## 📱 Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Choisissez un mode de jeu
3. Cliquez sur "Suivant" pour obtenir de nouveaux défis
4. Amusez-vous bien !

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

- ✅ 4 modes de jeu différents
- ✅ Design moderne et responsive
- ✅ Animations fluides
- ✅ Interface intuitive
- ✅ Compatible mobile et desktop
- ✅ Aucune dépendance externe

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
