import { useState } from "react"

const Header = (props) => {
  const {course} = props

  return(
    <div>
      {course}
    </div>
  )
}

const Part = (props) => {
  const {exercises, part} = props
  return(
    <>
      <p>{part} {exercises}</p>
    </>
  )
}


const Content = ({parts}) => {
 

  return(
    <div>
      { parts.map( (part, i) => {
          return(
          <Part key={i} exercises={part.exercises} part={part.name}/>)
      })}
    </div>  
    )
} 

const Total = ({ parts }) => {
  

  let total = 0;
  parts.forEach( part  =>  total = total+ part.exercises)

  return(
    <>
     <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    { 
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts} />
      <div>
        <button onClick={handleClick}></button>
      </div>
    </div>
  )
}

export default App