import React from 'react';

class Input extends React.Component {

    render() {
        return (
            <div>
                {this.props.name}:
                <input value={this.props.value}
                            onChange={this.props.handler}/>
            </div> 
        )
    }
}    

export default Input