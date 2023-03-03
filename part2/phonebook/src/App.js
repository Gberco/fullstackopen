import {useState, useEffect} from 'react'
import {Person} from './components/Person'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notificaction from './components/Notificaction'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('')


  useEffect( () => {
    personService
    .getAll()
    .then(initialPerson =>
       setPersons(initialPerson))
  },[])

  const handleNameChange = (event) =>{
    const {value} = event.target
    setNewName(value)
  } 

  const handleNumberChange = (event) => {
    const {value} = event.target   
    setNewNumber(value)
  }

  const handleFilteredChange = (event) => {
    const {value} = event.target
    setFilteredName(value)
  }


  const checkUser = ( query) =>{
    const found = persons.find( element => element.name.toLowerCase() === query)

    if( found ){
      window.confirm(`
        ${found.name} is already added to phonebook, rapace the old number wit a new one?`)
      updatePerson( found )
      return false
    } else {
      return true
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const query = newName.toLowerCase()

    const objectPerson = {
      name: newName,
      number: newNumber
    }

    if ( checkUser( query ) ){
      personService
      .create(objectPerson)
      .then( returnedPerson => {
        setPersons( persons.concat( returnedPerson ))
        setErrorMessage(`Added ${objectPerson.name}`)
        setErrorType('successful')
        setTimeout( () => {
          setErrorMessage(null)
          setErrorType('')
        }, 5000)
      })
    }

    setNewName('')
    setNewNumber('') 
  }

  const updatePerson = (person) => {
    const changePerson = { ...person, number: newNumber}
    const id = person.id
  
    personService
      .updatePerson( id, changePerson )
      .then( returnedPerson => {
        setPersons(
          persons.map( p => (p.id !== id ? p : returnedPerson))
        )
        setErrorMessage(`Updated ${person.name}`)
        setErrorType('successful')
        setTimeout( () => {
          setErrorMessage(null)
          setErrorType('')
        }, 5000)
        })
      .catch(error => { 
        setErrorMessage(`Information of ${person.name} has been removed from server`) 
        setTimeout( () => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const deletePerson = (id) => {
    const person = persons.find( p => p.id === id )

    personService
      .deletePerson( id )
      .then( returnedPerson => setPersons( persons.filter( (p) =>  p.id !== id) ))
      .catch(error => { 
        setErrorMessage(`Information of ${person.name} has been removed from server`) 
        setTimeout( () => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <Notificaction message={errorMessage} errorType={errorType}/>
      <h2>Phonebook</h2>
      <Filter
        handleFilteredChange={handleFilteredChange}
      />

      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}  
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <div>
        {persons.filter( p => 
            p.name.toLowerCase().indexOf( filteredName ) > -1 ).map(p => 
        <Person 
            key={p.id} 
            name={p.name} 
            number={p.number}
            deletePerson={() => deletePerson(p.id)} 
         />
        )}
        
      </div>
    </div>
  )
}

export default App