export const Person = ({name, number, deletePerson}) =>{
    return(
        <p>
            {`${name} | ${number}`}
            <button onClick={() => {
                if(window.confirm('Are sure want to delete?')) {
                    deletePerson()
                }
            }}>delete</button>
        </p>
    )
}    