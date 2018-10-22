import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Attraction from './attraction.js';
import Building from './building.js';
import Personnal from './personnal.js';
import Maintainance from './maintainance.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page : "attraction"
    };

    this.renderSwitch = this.renderSwitch.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  renderSwitch(param) {
    switch(param) {
      case 'attraction':
        return <Attraction />;
        case 'building':
        return <Building />;
        case 'personnal':
        return <Personnal />;
        case 'maintainance':
        return <Maintainance />;
      default:
        return <Attraction />;
    }
  }

  onClick(event) {
    event.preventDefault();

    switch(event.target.href) {
      case 'http://localhost:3000/attraction/':
        return this.setState({page: "attraction"});
      case 'http://localhost:3000/batiment/':
        return this.setState({page: "building"});
      case 'http://localhost:3000/personnel/':
        return this.setState({page:"personnal"});
      case 'http://localhost:3000/maintenance/':
        return this.setState({page: "maintainance"});
      default:
        return this.setState({page: "attraction"});
    }
    
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Outil de Managment</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink id='1' href="/attraction/" value="attraction" onClick={this.onClick} active="true">Attraction</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/batiment/" value="building" onClick={this.onClick}>Batiments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/personnel/" value="personnal" onClick={this.onClick}>Personnel</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/maintenance/" value="maintainance" onClick={this.onClick}>Maintenance</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/statistiques/" value="stats" onClick={this.onClick}>Statistiques</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {this.renderSwitch(this.state.page)}

      </div>
    );
  }
}

export default App;
