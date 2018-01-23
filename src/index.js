import ReactDOM from 'react-dom'
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})   
    }

    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
    }

    handleFilterChange = (event) => {
        this.setState({filter: event.target.value})
        console.log(this.state.filter)
        /* tänne filtteröinti */
    }
    
    makeFilteredList = () => {
        return this.state.persons.filter(person => this.checkPerson(person))        
    }

    checkPerson = (person) => {
        let inStudy = person.name.toLowerCase()
        if (inStudy.includes(this.state.filter.toLowerCase())) {
            console.log("true")
            return true }
        else {
            console.log("false")
            return false }
    }

    /* Tehty henkilön ja numeron perusteella */ 
    isPersonOnTheList = () => {
        let arvo = false
        this.state.persons.forEach((person) => { 
            if (person.name === this.state.newName || person.number === this.state.newNumber) {
                arvo = true

            } 
        })    
        return arvo      
    }

    addNewPerson = (event) => {
        event.preventDefault()
        if (this.isPersonOnTheList()) {
            alert('Tämä henkilö löytyy jo listalta!')  
        } else {
            let newList = this.state.persons.slice()
            {newList.push({name: this.state.newName, number:this.state.newNumber })
                this.setState({persons: newList,
                            newName: '', newNumber: ''
                            })}
            
        }
    }

    personListing = () => {
        return (
            <div>
                {this.makeFilteredList().map((person) => {
                    return (
                        <div key={person.name}>
                            {person.name} {person.number}
                        </div>
                    )
                })} 
            </div>
        )
    }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        rajaa näytettäviä: <input value={this.state.filter}
                                  onChange={this.handleFilterChange}  />

        <h3>Lisää uusi</h3>
        <form onSubmit={this.addNewPerson}>
            <div>
                nimi: <input value={this.state.newName}
                            onChange={this.handleNameChange}/>
            </div>
            <div>
                numero: <input value={this.state.newNumber}
                            onChange={this.handleNumberChange}/>
            </div>    
            <div>
                <button type="submit">lisää</button>
            </div>    
        </form>

        <h3>Numerot</h3>
        <div>
            {this.personListing()}
            debug: {this.state.newName}
        </div>
      </div>
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));

