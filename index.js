/***Global Variable */
let gamesList;
let counter = 0;
/***Helper functions */
function clearDOM(parentElement) {
    const childElements = parentElement.children
    if (childElements.length) {
        Array.from(childElements).forEach(element => element.remove())
    }
}
/***Events */
function titleEvent(titleElement) {
    titleElement.addEventListener('click', () => {
        handleTitleEvent(titleElement)
    })
}

/***Handle Events Functions */
function handleTitleEvent(titleElement) {
    const gameObj = gamesList.find(game => game.title === titleElement.textContent)
    renderGameInfo(gameObj)
}
/***Render to DOM */
function renderGameTitles() {
    const gameTitles = gamesList.map(game => game.title)
    const nextGames = gameTitles.slice(counter, counter + 10)
    nextGames.forEach(gameTitle => {
        let titlesContainer = document.getElementById('game-list')
        const titleElement = document.createElement('li')
        titleElement.textContent = gameTitle
        titlesContainer.appendChild(titleElement)
        titleEvent(titleElement)
    })
    counter += 10
}
function renderGameInfo({ title, release_date, platform, genre, thumbnail, game_url }) {
    const gameInfoContainer = document.getElementById('game-info')
    clearDOM(gameInfoContainer)
    //create elements
    const img = document.createElement('img')
    const gameTitle = document.createElement('h2')
    const link = document.createElement('a')
    const dateReleased = document.createElement('p')
    const gamePlatform = document.createElement('p')
    const gameGenre = document.createElement('p')
    //add text to elements
    gameTitle.textContent = title
    link.textContent = 'Play Game'
    dateReleased.textContent = `Date Released: ${release_date}`
    gamePlatform.textContent = `Platform: ${platform}`
    gameGenre.textContent = `Genre: ${genre}`
    //set attributes
    img.src = thumbnail
    link.href = game_url
    gameInfoContainer.append(img, gameTitle, link, dateReleased, gamePlatform, gameGenre)
}
/***Fetch Requests */
let options = {
    method: 'GET',
    headers: config
}
function getGames() {
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
        .then(res => res.json())
        .then(games => {
            gamesList = games
            renderGameTitles()
        })
}

//initialize
function init() {
    getGames()
}
init()