import Part from "./Part"

const Content = ({ parts }) => {
    const total = parts.reduce((s, p) => {
        console.log(s)
        return(
            s + p.exercises
        )
    }, 0)
   

    return(
    <>
        {parts.map( part => <Part key={part.id} part={part} />)}
        <p><strong>total of {total} exercises</strong></p>
    </>
    )
}

export default Content