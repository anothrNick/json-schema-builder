import React, { Component } from 'react';
import Object from './Object';

class Property extends Component {
    render() {
        var {onChange} = this.props;
        var property = this.props.property;

        if(!property.properties && property.type === "object") {
            property["properties"] = {"new_key": {type: "string"}};
            property["required"] = [];
        }

        return (
            <div className="property-wrapper">
                <div className="property">
                    <div className="name">
                        <input name="_key" data-value={this.props.name} value={this.props.name} onChange={onChange}/>
                    </div>
                    <div className="type">
                        <select value={this.props.property.type} data-key={this.props.name} name="type" onChange={onChange}>
                            <option value="string">string</option>
                            <option value="integer">integer</option>
                            <option value="number">number</option>
                            <option value="object">object</option>
                        </select>
                    </div>
                    <div className="description">
                        <input name="description" data-key={this.props.name} value={this.props.description} onChange={onChange}/>
                    </div>
                    <div className="required">
                        <input name="_required" data-key={this.props.name} checked={this.props.required} onChange={onChange} type="checkbox"/>
                    </div>
                </div>
                {this.props.property.type === "object" && 
                    <Object name={this.props.name} property={this.props.property} onUpdate={this.props.onUpdate}/>
                }
            </div>
        );
    }
}

export default Property;
