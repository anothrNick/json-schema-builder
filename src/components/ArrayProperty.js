import React, { Component } from 'react';

class Boolean extends Component {
    render() {
        return (
            <>
                <h5>Items</h5>
                <hr/>
                <div className="items form-group">
                    <label for="items">Items</label>
                    <select className="form-control" value={this.props.property.items.type} data-key={this.props.name} name="items">
                        <option value="string">string</option>
                        <option value="integer">integer</option>
                        <option value="number">number</option>
                        <option value="boolean">boolean</option>
                        <option value="array">array</option>
                        <option value="object">object</option>
                    </select>
                </div>
            </>
        );
    }
}

export default Boolean;
