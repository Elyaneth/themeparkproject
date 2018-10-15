import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

import { Table } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      showItems:[]
    };
  }

  onClick(index){
    let showItems = this.state.showItems.slice(0);
    showItems[index] = !showItems[index];
    this.setState({showItems});
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Outil de Managment</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/attraction/" active="true">Attraction</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/batiments/">Batiments</NavLink>
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



        <Table hover>
        <thead>
          <tr>
            <th>#id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={this.onClick.bind(this,0)}>
            <th scope="row">1</th>
            <td>Mark</td>
          </tr>
          {this.state.showItems[0] ? <tr><th></th> <td>bla <br></br> bli <br></br> blu</td> </tr> : null} 

          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
          </tr>
        </tbody>
      </Table>

      </div>
    );
  }
}

export default App;
