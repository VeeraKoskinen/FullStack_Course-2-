import ReactDOM from 'react-dom'
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas'}
      ],
      newName: ''
    }
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})   
    }

    isPersonOnTheList = () => {
        let arvo = false
        this.state.persons.forEach((person) => { 
            if (person.name === this.state.newName) {
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
            {newList.push({name: this.state.newName})
                this.setState({persons: newList,
                            newName: ''
                            })}
            
        }
    }

    personListing = () => {
        return (
            <div>
                {this.state.persons.map((person) => {
                    return (
                        <div key={person.name}>
                            {person.name}
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

