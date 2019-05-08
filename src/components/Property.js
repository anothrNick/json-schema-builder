import React, { Component } from 'react';
import Object from './Object';

class Property extends Component {
    render() {
        var {onChange} = this.props;
        var property = this.props.property;

        if(property.type === "object" && !property.properties) {
            property["properties"] = {"new_key": {type: "string", "_sort": 0}};
            property["required"] = [];
        }

        if(property.type === "array" && !property.items) {
            property["items"] = {"type": "string"};
        }

        return (
            <div className="property-wrapper">
                <div className="property form-inline">
                    <div className="name form-group mr-2">
                        <input className="form-control" name="_key" data-value={this.props.name} value={this.props.name} onChange={onChange}/>
                    </div>
                    <div className="type form-group mr-2">
                        <select className="form-control" value={this.props.property.type} data-key={this.props.name} name="type" onChange={onChange}>
                            <option value="string">string</option>
                            <option value="integer">integer</option>
                            <option value="number">number</option>
                            {/* <option value="array">array</option> */}
                            <option value="object">object</option>
                        </select>
                    </div>
                    <div className="description form-group mr-2">
                        <input className="form-control" name="description" placeholder="enter description" data-key={this.props.name} value={this.props.property.description} onChange={onChange}/>
                    </div>
                    <div className="required form-check mr-2">
                        <input id={"required_"+this.props.name} className="form-check-input" name="_required" data-key={this.props.name} checked={this.props.required} onChange={onChange} type="checkbox"/>
                        <label for={"required_"+this.props.name} class="form-check-label">Required</label>
                    </div>
                </div>
                {this.props.property.type === "array" && 
                    <div className="property form-inline">
                        <div className="items form-group mr-2">
                            <input type="text" disabled class="form-control" value="items" />
                        </div>
                        <div className="type form-group mr-2">
                            <select className="form-control" value={this.props.property.items.type} data-key={this.props.name} name="items" >
                                <option value="string">string</option>
                                <option value="integer">integer</option>
                                <option value="number">number</option>
                                <option value="array">array</option>
                                <option value="object">object</option>
                            </select>
                        </div>
                    </div>
                }
                {this.props.property.type === "object" && 
                    <Object name={this.props.name} property={this.props.property} onUpdate={this.props.onUpdate}/>
                }
            </div>
        );
    }
}

export default Property;
