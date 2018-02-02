import ReactDOM from 'react-dom';
import React from 'react';
import Input from './components/Input';
import AddingForm from './components/AddingForm';
import axios from 'axios'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            filter: '',
        }
    }


    handleFilterChange = (event) => {
        this.setState({filter: event.target.value})
    }
    
    makeFilteredList = () => {
        return this.state.persons.filter(person => this.checkPerson(person))  
    }

    checkPerson = (person) => {
        let inStudy = person.name.toLowerCase()
        if (inStudy.includes(this.state.filter.toLowerCase())) {
            console.log("true")
            return true 
        } else {
            console.log("false")
            return false 
        }
    }

    isPersonOnTheList = (newPerson) => {
        let id = undefined
        this.state.persons.forEach((person) => { 
            if (person.name === newPerson.name) {
                id = person.id 
            } 
        })    
        return id     
    } 

    addNewPerson = (newPerson) => {
        const id = this.isPersonOnTheList(newPerson) 
        if ( id !== undefined) {
           if(window.confirm(`'${newPerson.name}' on jo luettelossa, korvataanko vanha numero uudella?`))  {
            personService
               .update(id, newPerson)
               .then(response => {               
                    this.updateChanges()
                })
            }  
        } else {

            const personObject = {
                name : newPerson.name,
                number : newPerson.number
            }

            personService
            .create(personObject)
            .then(response => {
                this.updateChanges()
            })
        }                   
    }

    deletePerson = (id) => {
        const person = this.state.persons.find(n => n.id === id)
        if(window.confirm(`Poistetaanko '${person.name}'?`)) {
            personService            
            .remove(id)
            .then(response => 
                {this.updateChanges()
            })
            .catch(error => {
                console.log("Error poistettaessa!!")
            })
        }           
    }

    personListing = () => {
        return (
            <div>
                {this.makeFilteredList().map((person) => {
                    return (
                        <div key={person.id}>
                            {person.name} {person.number}
                            <button onClick={() => this.deletePerson(person.id)}>poista</button>
                        </div>
                    )
                })} 
            </div>
        )
    }

    updateChanges = () => {
        personService
        .getAll()
        .then(response => {
            this.setState({persons: response.data})
        })
    }

    componentDidMount() {
        this.updateChanges()
    }  

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Input name={"rajaa näytettäviä"} value={this.state.filter} handler={this.handleFilterChange} />
                <h3>Lisää uusi</h3>
                <AddingForm function={this.addNewPerson}/>
                <h3>Numerot</h3>

                <div>
                    {this.personListing()}
                </div>
            </div>
        )
    }
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));

