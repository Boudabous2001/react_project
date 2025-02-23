# The Cocktail Bar - Application Mobile React Native 🍸

Application mobile permettant de découvrir et rechercher des cocktails grâce à l'API TheCocktailDB.

# APK 

https://estiam-my.sharepoint.com/:u:/p/mohamed-amine_dhaoui/EXe6cDYODpJHrhL_2ov-W5YBTNVauw7BA3T-YKpOxp8cCg?e=XGZwWX

## 📱 Fonctionnalités

- Recherche de cocktails par nom
- Affichage des détails des cocktails (ingrédients, instructions, etc.)
- Filtrage par catégorie
- Sauvegarde des cocktails favoris
- Interface utilisateur intuitive et responsive

## 🛠 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Node.js (version 14 ou supérieure)
- npm ou yarn
- React Native CLI
- XCode (pour iOS)
- Android Studio (pour Android)
- JDK 11

## ⚙️ Installation

1. Clonez le repository :
```bash
git clone https://github.com/Boudabous2001/react.git
cd the-cocktail-bar
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Installez les pods (iOS uniquement) :
```bash
cd ios
pod install
cd ..
```


## 🚀 Lancement de l'application

### iOS

```bash
# Démarrer le serveur Metro
npx react-native start

# Dans un autre terminal, lancer l'app iOS
npx react-native run-ios
```

### Android

```bash
# Démarrer le serveur Metro
npx react-native start

# Dans un autre terminal, lancer l'app Android
npx react-native run-android
```


## 🔧 Scripts disponibles

- `npm start` ou `yarn start` : Démarre le serveur Metro
- `npm run android` : Lance l'application sur Android
- `npm run ios` : Lance l'application sur iOS
- `npm run test` : Lance les tests
- `npm run lint` : Vérifie le code avec ESLint


## 🙏 Remerciements

- [TheCocktailDB](https://www.thecocktaildb.com/) pour leur API
- Tous les contributeurs du projet : Elyes BOUDABOUS, Yasmine AOUDJIT, Mohamed amine DEHAOUI.
- Notre cher prof : Yaaqoub SEMLALI.
