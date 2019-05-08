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
            // update old key to new key, then delete old key
            var oldv = event.target.getAttribute('data-value');
            var obj = pr[oldv];
            delete pr[oldv];
            pr[event.target.value] = obj;

            // update required
            let i = property.required.indexOf(oldv)
            if(i > -1) {
                property.required.splice(i, 1)
                property.required.push(event.target.value);
            }
        } else if (event.target.name === "_required") {
            let k = event.target.getAttribute('data-key');
            if(event.target.checked) {
                // add
                property.required.push(k)
            } else {
                // remove
                let i = property.required.indexOf(k)
                if(i > -1) {
                    property.required.splice(i, 1)
                }
            }
        } else if (event.target.name === "_additionalProperties") {
            property.additionalProperties = event.target.checked
        } else {
            let k = event.target.getAttribute('data-key');
            pr[k][event.target.name] = event.target.value;

            // cleanup object and array specific keys
            if(event.target.name === "type" && event.target.value !== "object") {
                delete pr[k]["properties"];
                delete pr[k]["required"];
                delete pr[k]["additionalProperties"];
            }
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
                <div className="additionalProperties form-check mr-2">
                    <input id={"additionalProperties_"+this.props.name} className="form-check-input" name="_additionalProperties" checked={this.props.property.additionalProperties} onChange={this.onChange} type="checkbox"/>
                    <label for={"additionalProperties_"+this.props.name} class="form-check-label">Additional Properties</label>
                </div>
                {sortable.map(function(el){
                    return(
                        <Property name={el[0]} property={el[1]} required={this.props.property.required.indexOf(el[0]) > -1} onChange={this.onChange} onUpdate={this.onUpdate}/>
                    )
                }, this)}
                <button class="btn btn btn-outline-info mt-2" onClick={() => this.onAdd("new_key", {type: "string"})}>New Property</button>
            </div>
        );
    }
}

export default PropertyObject;