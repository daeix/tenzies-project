export default function DarkMode(props) {
  const styles = {
    justifyContent: props.darkMode ? "flex-end" : "",
  }
  return (
    <div className="toggler">
      <p className="toggler--light">Light</p>
      <div
        onClick={props.toggleDarkMode}
        style={styles}
        className="toggler--slider"
      >
        <div className="toggler--slider--circle"></div>
      </div>
      <p className="toggler--dark">Dark</p>
    </div>
  )
}
