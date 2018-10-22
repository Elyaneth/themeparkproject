import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label, 
  Input, 
  Button,
  ListGroup, 
  ListGroupItem,
  Table
} from 'reactstrap';
import myData from './building.json';

class building extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showItems: [],
      value: "Search a name here",
      searchResult: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  

  handleSubmit(event) {
    alert('You have searched the following name: ' + this.state.value +'\n If nothing happens, it means the name was not found.');
    event.preventDefault();

    myData.map((buildingDetail, index) => {
      if(buildingDetail.name == this.state.value)
      {
        const element = 
        <ListGroup>
          <b>Result of your search</b>
        <ListGroupItem>{buildingDetail.id}</ListGroupItem>
        <ListGroupItem>{buildingDetail.name}</ListGroupItem>
        <ListGroupItem>{buildingDetail.installationdate}</ListGroupItem>
        </ListGroup>;

        this.setState({searchResult: element});
      }
    })    
  }

  onClick(index) {
    let showItems = this.state.showItems.slice();
    showItems[index] = !showItems[index];
    this.setState({ showItems });
  }
  

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Outil de Managment</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/attraction/">Attraction</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/batiments/" active="true">Batiments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/personnel/">Personnel</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/maintenance/">Maintenance</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/statistiques/">Statistiques</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

      <div style={{marginRight: 10, marginLeft: 10 }}>
        <br></br>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="Search"><b>Search: </b></Label>
            <Input type="text" name="Search" id="search" value={this.state.value} onChange={this.handleChange} />
            <Button>Submit</Button>
          </FormGroup>
        </Form>

        <br></br>

        <div> {this.state.searchResult} </div>

        <br></br>

        <Table hover>
          <thead>
            <tr>
              <th>Building Ids</th>
              <th>Building Names</th>
            </tr>
          </thead>
          <tbody>

            {myData.map((buildingDetail, index) => {
              return (
                <tr onClick={this.onClick.bind(this, buildingDetail.id)}>
                  <th scope="row"> {buildingDetail.id} </th>
                  <td> <b>{buildingDetail.name}</b> {this.state.showItems[buildingDetail.id] ? <div> Id: {buildingDetail.id}<br></br> Name: {buildingDetail.name} <br></br> Installation date: {buildingDetail.installationdate} </div> : null} </td>
                </tr>
              )
            })}

          </tbody>
        </Table>

            
      </div>
      </div>
    );
  }
}

export default building;
