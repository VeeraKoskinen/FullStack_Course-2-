import ReactDOM from 'react-dom';
import React from 'react';
import Input from './components/Input';
import AddingForm from './components/AddingForm';
import axios from 'axios';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            filter: '',
            notification: null,
            error: null
        }
    }


    handleFilterChange = (event) => {
        this.setState({filter: event.target.value})
    }
    
    makeFilteredList = () => {
        return this.state.persons.filter(person => this.checkPerson(person))  
    }

    updateNotification = (message) => {
        this.setState({notification: message})
        setTimeout(() => {
            this.setState({notification: null})
          }, 3000)
    }

    updateError = (message) => {
        this.setState({error: message})
        setTimeout(() => {
            this.setState({error: null})
          }, 4000)
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
                    this.updateNotification(`Numeron muutos onnistui henkilölle ${newPerson.name}!`)           
                    this.updateChanges()
                })
                .catch(error => {
                    this.updateError("Muutos epäonnistui!")
                })
                
            }  
        } else {
            const personObject = {
                name : newPerson.name,
                number : newPerson.number
            }
            personService
            .create(personObject)
            .then(notification => {
                this.updateNotification(`Lisättiin: ${personObject.name}`)
                this.updateChanges()
            })
        }                   
    }

    deletePerson = (id) => {
        const person = this.state.persons.find(n => n.id === id)
        if(window.confirm(`Poistetaanko '${person.name}'?`)) {
            personService            
            .remove(id)
            .then(response => {
                this.updateNotification(`Poistettiin onnistuneesti ${person.name}!`)
                this.updateChanges()
            })
            .catch(error => {
                console.log("Error poistettaessa!!")
                this.updateError("Tämä henkilö on jo aiemmin poistettu puhelinluettelosta.")
                this.updateChanges()
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

                <h1>Puhelinluettelo</h1>
               
                <Notification message={this.state.notification} className={"notification"}/>
                <Notification message={this.state.error} className={"error"}/>

                <Input name={"rajaa näytettäviä"} value={this.state.filter} handler={this.handleFilterChange} />
                <h3>Lisää uusi / muuta olemassaolevaa numeroa</h3>
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

