import ReactDOM from 'react-dom';
import React from 'react';

class Notification extends React.Component {
   
    constructor(props) {
        super(props)
    }
   
    render() {
        if (this.props.message === null) {
            return null
        }
        return (
            <div className="notification">
                {this.props.message}
            </div>
        )
    }
}

export default  Notification  