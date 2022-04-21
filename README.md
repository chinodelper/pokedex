# Pokedex
## Project setup
### Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Run Lints and fixes files
```
npm run lint
```

# Features
### Home
In this section, we are collecting a list of 20 Pokemons retrieved from pokeapi.co endpoints.
The user can move back and forward from the bottom pagination buttons.

### Add new
Since we are not using an actual backend, the app saves the new data into the Vuex store to retrieve
the information from the local instance.
For this reason, an alert will appear when the user enters the new pokemon added.

# Technologies
1. Vue 3
2. Typescript
3. Axios
4. Jest / vue-utils
5. SASS
