import React, { Component } from 'react';
import Object from './components/Object';
// import Builder from './components/Builder';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            properties: {
                "name": {
                    _sort: 0, // for consistent display order
                    type: "string",
                    description: "A human name."
                },
                "hobbies": {
                    _sort: 1, // for consistent display order
                    type: "object",
                    description: "A human's hobbies.",
                    properties: {
                        "label": {
                            _sort: 0,
                            type: "string"
                        }
                    }
                }
            }
         };
    }

    onUpdate = (key, obj) => {
        console.log("UPDATE");
        console.log(key);
        console.log(obj);
        this.setState({
            properties: obj.properties
        });
    }

    render() {
        return (
            <div>
                <Object onUpdate={this.onUpdate} property={this.state} />
                <pre>
                    {JSON.stringify(this.state.properties, undefined, 4)}
                </pre>
            </div>
        );
    }
}

export default App;