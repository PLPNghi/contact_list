import React from 'react';

class ContactRow extends React.Component {
    render() {
      return (
        <tr>
          <td>{this.props.contact.name}</td>
          <td>{this.props.contact.phone}</td>
          <td>{this.props.contact.email}</td>
        </tr>
      );
    }
  }
  
class ContactTable extends React.Component {
    render() {
        var rows = [];
        this.props.contacts.forEach((contact) => {
        if (contact.name.indexOf(this.props.filterText) === -1) {
            return;
        }
        rows.push(<ContactRow key={contact.key} contact={contact} />);
        });
        return (
        <table className='table table-hover'>
            <thead>
            <tr>
                <th><i className="fa fa-fw fa-user"></i>Name</th>
                <th><i className="fa fa-fw fa-phone"></i>Phone</th>
                <th><i className="fa fa-fw fa-envelope"></i>Email</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        );
    }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class NewContactRow extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const phone = target.phone.value;
    const email = target.email.value;
    
    var contact = {
      name : name,
      phone : phone,
      email : email
    };
    this.props.addContact(contact);
  }
   
  render(){
    return (
      
       <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <div className="col-md-3">
            <input type="text" name="name" className="form-control" id="nameInput" placeholder="Name" />
          </div>
          <div className="col-md-3">
            <input type="text" name="phone" className="form-control" id="phoneInput" placeholder="Phone" />
          </div>
          <div className="col-md-3">
            <input type="email" name="email" className="form-control" id="emailInput" placeholder="Email" />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary"><i className="fa fa-fw fa-plus"></i>Add</button>
          </div>
        </div>
      </form>
          
    )
  }
}

class FilterableContactTable extends React.Component {
  constructor(props) {
    super(props);
    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    this.state = {
      filterText: '',
      contacts : [
        {key: 1, name: 'Tom Jackson', phone: '555-444-333', email: 'tom@gmail.com'},
        {key: 2, name: 'Mike James', phone: '555-777-888', email: 'mikejames@gmail.com'},
        {key: 3, name: 'Janet Larson', phone: '555-222-111', email: 'janetlarson@gmail.com'},
        {key: 4, name: 'Clark Thompson', phone: '555-444-333', email: 'clark123@gmail.com'},
        {key: 5, name: 'Emma Pager', phone: '555-444-333', email: 'emma1page@gmail.com'},

      ]
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  addContact(contact) {
    var timestamp = new Date().getTime();
    contact['key'] = timestamp;
    console.log('BEFORE: this.state.contacts: '+ this.state.contacts.length);
    // update the state object
    this.state.contacts.push(contact);
    // set the state
    this.setState({ contacts: this.state.contacts });
  }
  
  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }
  
  render() {
    return (
      <div>
        <h1>React Contacts List App</h1>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <NewContactRow addContact={this.addContact}/>
        <ContactTable
          contacts={this.state.contacts}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}



export default FilterableContactTable;