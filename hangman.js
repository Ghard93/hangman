import { words } from "./words.js";

let word
let wordsUsed = []
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
let lettersChecked = []
let guesses = 0
let lettersFound = 0
let gameWon = false

function newGame() {

    if(wordsUsed.length === words.length) {
        wordsUsed = []
    }
    console.log(words.length)
    let newWord
    
    do {
        newWord = words[Math.floor(Math.random() * 321)]
    } while(wordsUsed.includes(newWord))

    document.getElementById('endMsg').style.display = 'none'
    if(wordsUsed.length > 0) {
        document.getElementById('lettersDiv').remove()
        document.getElementById('blankWordDiv').remove()
    }
    guesses = 0
    lettersFound = 0
    word = newWord
    lettersChecked = []
    wordsUsed.push(newWord)
    gameWon = false
    createButtons()
    setCategory()
    setWordSpace()
    resetImages()
    setHangmanImg()
    if(word.word.includes(" ")) {
        lettersFound = 1
    }
}

function checkLetter(letter) {

    if(lettersChecked.includes(letter) || guesses === 8 || gameWon === true) {
        return
    }

    let letterCorrect = false

    for(let i = 0; i < word.word.length; i++) {
        if(word.word[i].toUpperCase() === letter) {
            document.getElementById(`letter${i}`).innerText = letter
            lettersFound++
            letterCorrect = true
        }
    }

    if(letterCorrect === false) {
        guesses++
        setHangmanImg()
    }

    document.getElementById(letter).style.backgroundColor = 'rgb(110, 110, 110)'
    lettersChecked.push(letter)
    checkGameEnd()
}

function createButtons() {
    const buttons = document.createElement('div')
    buttons.setAttribute('id', 'lettersDiv')
    buttons.setAttribute('class', 'letterBtns')

    letters.forEach(letter => {
        const button = document.createElement('div')
        button.addEventListener('click', () => {checkLetter(letter)})
        button.setAttribute('class', 'letterBtn')
        button.setAttribute('id', letter)
        button.textContent = letter
        buttons.append(button)
    })
    document.getElementById('letterBtns').append(buttons)
}

function setCategory() {
    let category = word.category.toUpperCase()
    document.getElementById('category').innerText = `Category: ${category}`
}

function setHangmanImg() {
    document.getElementById(`img${guesses}`).style.display = 'block'
}

function resetImages() {
    for(let i = 0; i < 9; i ++) {
        document.getElementById(`img${i}`).style.display = 'none'
    }
}

function setWordSpace() {
    const wordDiv = document.createElement('div')
    wordDiv.setAttribute('class', 'blankWordDiv')
    wordDiv.setAttribute('id', 'blankWordDiv')
    for(let i = 0; i < word.word.length; i++) {
        const letterDiv = document.createElement('div')
        if(word.word[i] === " ") {
            letterDiv.setAttribute('class', 'spaceDiv')    
        }
        else {
            letterDiv.setAttribute('class', 'letterDiv')
        }
        const letter = document.createElement('div')
        letter.setAttribute('id', `letter${i}`)
        letterDiv.append(letter)
        wordDiv.append(letterDiv)
    }
    document.getElementById('wordSpace').append(wordDiv)
}

function checkGameEnd() {
    if(lettersFound === word.word.length) {
        document.getElementById('wordWas').style.display = 'none'
        document.getElementById('msgTxt').innerText = "You saved Kenny!"
        setTimeout(displayEndMsg, 500)
        gameWon = true
    }

    if(guesses === 8) {
        document.getElementById('msgTxt').innerText = "You killed Kenny! You Bastard!"
        document.getElementById('wordWas').innerText = `The word was: ${word.word.toUpperCase()}`
        document.getElementById('wordWas').style.display = 'block'
        setTimeout(displayEndMsg, 500)
    }
}

function displayEndMsg() {
    document.getElementById('endMsg').style.display = 'block'
}

function createNewGameBtn() {
    const newGameBtn = document.createElement('button')
    newGameBtn.addEventListener('click', () => {newGame()})
    newGameBtn.setAttribute('class', 'newGameButton')
    newGameBtn.innerText = "New Game"
    document.getElementById('newGameBtn').append(newGameBtn)
}

createNewGameBtn()
newGame()