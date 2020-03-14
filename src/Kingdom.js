import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [{
  dataField: 'name',
  text: 'Name',
  sort: true
}, {
  dataField: 'cost',
  text: 'Cost',
  sort: true
}, {
  dataField: 'setup',
  text: 'Setup',
  sort: true
}, {
   dataField: 'cardType',
   text: 'Card Type',
   sort: true
}, {
   dataField: 'box',
   text: 'Box',
   sort: true
}
];

class Kingdom extends Component {

    render() {
        return(
            <div>
                <BootstrapTable keyField='name' data={this.props.cards} columns={columns} />
                <BootstrapTable keyField='name' data={this.props.cardLikes} columns={columns} />
            </div>
        );
    }
}

export default Kingdom;