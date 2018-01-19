import ReactDOM from 'react-dom'
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
            number: '040-123456'}
      ],
      newName: '',
      newNumber: ''
    }
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})   
    }

    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
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
                {this.state.persons.map((person) => {
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

        <h2>Numerot</h2>
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

