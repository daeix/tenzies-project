import React from "react"

export default function Die(props) {
  const styles = {
    color: props.isHeld ? "#59E391" : "#252526",
    backgroundColor: props.darkMode ? " #bc9943" : "white",
  }
  let num = "0"

  if (props.value === 1) {
    num = "one"
  } else if (props.value === 2) {
    num = "two"
  } else if (props.value === 3) {
    num = "three"
  } else if (props.value === 4) {
    num = "four"
  } else if (props.value === 5) {
    num = "five"
  } else if (props.value === 6) {
    num = "six"
  }

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <i className={`fas fa-dice-${!props.startGame && num}`}></i>
    </div>
  )
}
