import ReactDOM from 'react-dom';
import React from 'react';
import Input from './components/Input';
import AddingForm from './components/AddingForm';

/*
const AddingForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <Input name={"nimi:"} newInput={props.newInput1} handler={props.handler1}/>
            <Input name={"numero"} newInput={props.newInput2} handler={props.handler2}/>
            <div>
                <button type="submit">lisää</button>
            </div> 
        </form>    
    )
}
*/
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
      filter: ''
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
            return true }
        else {
            console.log("false")
            return false }
    }

    /* Tehty henkilön ja numeron perusteella  */
    isPersonOnTheList = (newPerson) => {
        let arvo = false
        this.state.persons.forEach((person) => { 
            if (person.name === newPerson.name || person.number === newPerson.number) {
                arvo = true
        
            } 
        })    
        return arvo      
    } 

    addNewPerson = (newPerson) => {
        if (this.isPersonOnTheList(newPerson)) {
            alert('Tämä henkilö löytyy jo listalta!')  
        } else {
            let newList = this.state.persons.slice()
            newList.push(newPerson)
            this.setState({persons: newList})
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
        <Input name={"rajaa näytettäviä"} value={this.state.filter} handler={this.handleFilterChange} />
        <h3>Lisää uusi</h3>
        <AddingForm function={this.addNewPerson}/>
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

