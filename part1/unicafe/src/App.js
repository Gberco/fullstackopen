import { useState } from "react"

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({all, average, positive, good, neutral, bad}) => {
  if (all === 0) {
    return( <p>No feedback given</p>)
  } 
  return(
    <div>
      <StaticsLine text="good" value={good} />
      <StaticsLine text="neutral" value={neutral} />
      <StaticsLine text="bad" value={bad} />
      <StaticsLine text="all" value={all} />
      <StaticsLine text="average" value={average} />
      <StaticsLine text="positive" value={positive} />
    </div>
  )
}

const StaticsLine = ({text, value}) => { 
  return( 
    <table>
      <tr>
        <td>{text}</td>
        <td>{text !== "positive" ? value : value + "%" } </td>
      </tr>
    </table> 
    )
  } 


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const setToValue = ({value, text}) => {

    if(text === "good"){
      setGood( good + 1)
    }

    if(text === "neutral"){
      setNeutral( neutral + 1)
    }

    if(text === "bad"){
      setBad( bad + 1)
    }
  }

  const calculateAll = () => {
    return  (good + neutral + bad)
  }

  const calculateAverage = () => {
    return ((good + neutral*0 + bad*-1) / calculateAll() )
  }

  const calculatePositive = () => {
    return ( (good / calculateAll()) * 100 )
  }

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={() => setToValue( {value: good + 1, text: 'good'} )} text="good" />
      <Button handleClick={() => setToValue( {value: neutral + 1, text: 'neutral'} )} text="neutral" />
      <Button handleClick={() => setToValue( {value: bad + 1, text: 'bad'} )} text="bad" />
     
      <h2>statics</h2>
      <Statistics 
        all={calculateAll()} 
        average={calculateAverage()} 
        positive={calculatePositive()} 
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

export default App