import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import DarkMode from "./DarkMode"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [timer, setTimer] = React.useState(0)
  const [rollCount, setRollCount] = React.useState(0)
  const [startGame, setStartGame] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      !startGame && setTimer(0)
      setStartGame(true)
      setRollCount(rollCount + 1)
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setTimer(0)
      setRollCount(0)
    }
  }

  function holdDice(id) {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        })
      )
    }
  }

  React.useEffect(() => {
    let interval

    if (!tenzies) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [tenzies])

  const diceElements = dice.map((die) => (
    <Die
      darkMode={darkMode}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  function startGamePlaceholder() {
    let emptyDies = []
    for (let i = 0; i < 10; i++) {
      emptyDies.push(<Die key={i} />)
    }
    return emptyDies
  }

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode)
    console.log(darkMode)
  }

  return (
    <main className={darkMode ? "dark" : ""}>
      {tenzies && <Confetti />}

      <div className="title-toggler-flex">
        <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <h1 className="title">Tenzies</h1>

      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      {startGame ? (
        <div className="dice-container">{diceElements}</div>
      ) : (
        <div className="dice-container">{startGamePlaceholder()}</div>
      )}

      <button className={!darkMode ? "roll-dice" : ""} onClick={rollDice}>
        {tenzies || !startGame ? "New Game" : "Roll"}
      </button>
      <div>
        <p>Timer: {startGame ? timer : 0}</p>
        <p>Rolls: {startGame ? rollCount : 0}</p>
      </div>
    </main>
  )
}
