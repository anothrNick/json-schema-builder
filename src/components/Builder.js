import React, { Component } from 'react';
import Property from './Property';

class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {
                type: "object",
                properties: this.props.properties || {}
            }
        };
    }

    onUpdate = (key, obj) => {
        this.props.onUpdate(key, obj);
    }

    onAdd = (key, obj) => {
        var pr = this.state.schema.properties;
        var count = 0;
        for (var k in pr) if (pr.hasOwnProperty(k)) ++count;
        obj["_sort"] = count;
        pr[key] = obj;
        this.props.onUpdate("", pr);
    }

    onChange = (event) => {
        console.log(event.target);
        var pr = this.state.schema.properties;

        if(event.target.name === "_key") {
            var oldv = event.target.getAttribute('data-value');
            console.log(event.target.datavalue);
            var obj = pr[oldv];
            delete pr[oldv];
            pr[event.target.value] = obj;
        }

        console.log(pr);

        this.props.onUpdate("", pr);
    }

    render() {
        var {properties} = this.state.schema;

        var sortable = [];
        for (var key in properties) {
            sortable.push([key, properties[key]]);
        }

        sortable.sort(function(a, b) {
            return a[1]["_sort"] - b[1]["_sort"];
        });
        console.log(sortable);

        return (
            <div className="objectWrapper">
                {sortable.map(function(el){
                    return(
                        <Property name={el[0]} property={el[1]} onChange={this.onChange} onUpdate={this.onUpdate}/>
                    )
                }, this)}
                <button onClick={() => this.onAdd("new_key", {type: "string"})}>New Property</button>
            </div>
        );
    }
}

export default Builder;