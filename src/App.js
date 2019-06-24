import React, { Component } from 'react';
import Object from './components/Object';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "object",
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
                    },
                    required: []
                }
            },
            required: []
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

    removeKey = (key, obj) => {
        for(var k in obj) {
            delete obj[k][key];
            if(obj[k].type === "object") {
                obj[k].properties = this.removeKey(key, obj[k].properties)
            }
        }
        return obj
    }

    render() {
        let scrubbedObj = JSON.parse(JSON.stringify(this.state))
        scrubbedObj.properties = this.removeKey("_sort", scrubbedObj.properties)
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-7">
                        <Object onUpdate={this.onUpdate} property={this.state} />
                    </div>
                    <div class="col-5">
                        <pre>
                            <code>
                            {JSON.stringify(scrubbedObj, undefined, 4)}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;