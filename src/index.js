import ReactDOM from 'react-dom';
import React from 'react';
import Input from './components/Input';
import AddingForm from './components/AddingForm';
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
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
            return true 
        } else {
            console.log("false")
            return false 
        }
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

            const personObject = {
                name : newPerson.name,
                number : newPerson.number
            }

            axios.post('http://localhost:3001/persons', personObject)
            .then(response => {
                this.setState({persons: this.state.persons.concat(response.data)})
            })
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

    componentWillMount() {
        console.log('will mount')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {  
                console.log("promise fullfilled")
                this.setState({persons: response.data})
                console.log(this.state.persons)
        })
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

