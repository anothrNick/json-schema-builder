import React, { Component } from 'react';
import Property from './Property';

class PropertyObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "root"
        };
    }

    onUpdate = (key, obj) => {
        var property = this.props.property;
        var pr = this.props.property.properties;
        pr[key] = obj;
        property.properties = pr;
        this.props.onUpdate(this.state.name, property);
    }

    onAdd = (key, obj) => {
        var property = this.props.property;
        var pr = this.props.property.properties;
        var count = 0;
        for (var k in pr) if (pr.hasOwnProperty(k)) ++count;
        obj["_sort"] = count;
        pr[key] = obj;
        property.properties = pr;
        this.props.onUpdate(this.state.name, property);
    }

    onChange = (event) => {
        var property = this.props.property;
        var pr = this.props.property.properties;

        if(event.target.name === "_key") {
            var oldv = event.target.getAttribute('data-value');
            var obj = pr[oldv];
            delete pr[oldv];
            pr[event.target.value] = obj;
        } else {
            var k = event.target.getAttribute('data-key');
            pr[k][event.target.name] = event.target.value;
        }

        property.properties = pr;
        this.props.onUpdate(this.state.name, property);
    }

    render() {
        var {properties} = this.props.property;

        var sortable = [];
        for (var key in properties) {
            sortable.push([key, properties[key]]);
        }

        sortable.sort(function(a, b) {
            return a[1]["_sort"] - b[1]["_sort"];
        });

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

export default PropertyObject;