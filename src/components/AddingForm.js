import ReactDOM from 'react-dom';
import React from 'react';
import Input from './Input';


class AddingForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        newName: "",
        newNumber: ""
      }
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})   
    }

    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
    }

    sendPerson = (event) => {
        event.preventDefault()
        const person = {
            name: this.state.newName,
            number: this.state.newNumber 
        }
        this.props.function(person)
        this.setState({newName: '', newNumber: ''})
    }

    render() {
        return (
            <form onSubmit={this.sendPerson}>           
                <Input name={"nimi"} value={this.state.newName} handler={this.handleNameChange}/>           
                <Input name={"numero"} value={this.state.newNumber} handler={this.handleNumberChange} />           
                <button type="submit">lisää</button>  
            </form>   
        )
    }
}

export default AddingForm