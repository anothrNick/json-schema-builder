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
            <div className="container-fluid">
                <div className="row float-right">
                    <a href="https://github.com/anothrNick/json-schema-builder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 250 250" fill="#FFF" style={{position: "relative", float: "right", top: 0, right: 0}}>
                            <path d="M0 0l115 115h15l12 27 108 108V0z" fill="#151513"/>
                            <path className="octo-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" style={{"-webkit-transform-origin": "130px 106px", "transform-origin": "130px 106px"}}/>
                            <path className="octo-body" d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"/>
                        </svg>
                    </a>
                </div>
                <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 mt-3">
                        <Object onUpdate={this.onUpdate} property={this.state} />
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt-3">
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