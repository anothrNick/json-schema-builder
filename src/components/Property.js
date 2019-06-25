import React, { Component } from 'react';
import ObjectComponent from './Object';
import ArrayComponent from './Array';
import Modal from './Modal';
import PropertySettings from './Properties/PropertySettings';

class Property extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }

    open = () => {
        this.setState({show: true});
    }

    close = () => {
        this.setState({show: false});
    }

    render() {
        var {onChange} = this.props;
        var property = this.props.property;

        if(property.type === "object" && !property.properties) {
            property["properties"] = {};
            property["required"] = [];
        }

        if(property.type === "array" && !property.items) {
            property["items"] = {"type": "string"};
        }

        return (
            <>
                <Modal show={this.state.show} onClose={this.close}>
                    <div className="modal-wrapper">
                        <div className="backdrop-modal" onClick={this.close}></div>
                        <div className="x-modal">
                            <div className="wrapper">
                                <button type="button" className="close-modal btn btn-light btn-sm" onClick={this.close}><i className="fa fa-times"></i></button>

                                <div className="content">
                                    <PropertySettings  
                                        name={this.props.name} 
                                        property={this.props.property} 
                                        required={this.props.required} 
                                        onChange={this.props.onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="property-wrapper">
                    <div className="property form-inline">
                        <div className="name form-group mr-2">
                            <input className="form-control" name="_key" data-value={this.props.name} value={this.props.name} onChange={onChange}/>
                        </div>
                        <div className="type form-group mr-2 input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Type</div>
                            </div>
                            <select className="form-control" value={this.props.property.type} data-key={this.props.name} name="type" onChange={onChange}>
                                <option value="string">string</option>
                                <option value="integer">integer</option>
                                <option value="number">number</option>
                                <option value="boolean">boolean</option>
                                <option value="array">array</option>
                                <option value="object">object</option>
                            </select>
                        </div>
                        <div className="name form-group ">
                            <button type="button" className="btn btn-light btn-sm" onClick={this.open}><i className="fa fa-cog"></i></button>
                        </div>
                        <div className="name form-group mr-2">
                            <button type="button" className="btn btn-light btn-sm" onClick={() => this.props.onDeleteKey(this.props.name)}><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                    {this.props.property.type === "array" && 
                        <ArrayComponent name={this.props.name} property={this.props.property} required={this.props.required} onUpdate={this.props.onUpdate}/>
                        
                    }
                    {this.props.property.type === "object" && 
                        <ObjectComponent name={this.props.name} property={this.props.property} onUpdate={this.props.onUpdate}/>
                    }
                </div>
            </>
        );
    }
}

export default Property;
