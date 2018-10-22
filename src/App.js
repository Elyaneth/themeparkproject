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
import classnames from 'classnames';
import Stat from './statistics.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page : "",
      active: "attraction"
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
	    case 'stat':
		    return <Stat />;
      default:
        return <Attraction />;
    }
  }

  onClick(event) {
    event.preventDefault();

    switch(event.target.href) {
      case 'http://localhost:3000/attraction/':
        return this.setState({page: "attraction", active :"attraction"});
      case 'http://localhost:3000/batiment/':
        return this.setState({page: "building", active :"building"});
      case 'http://localhost:3000/personnel/':
        return this.setState({page:"personnal", active :"personnal"});
      case 'http://localhost:3000/maintenance/':
        return this.setState({page: "maintainance", active :"maintainance"});
	  case 'http://localhost:3000/statistiques/':
	    return this.setState({page: "stat", active :"stat"});
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
              <NavLink id='1' href="/attraction/" value="attraction" onClick={this.onClick} active={(this.state.active === "attraction")} >Attraction</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/batiment/" value="building" onClick={this.onClick} active={(this.state.active === "building")}>Batiments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/personnel/" value="personnal" onClick={this.onClick} active={(this.state.active === "personnal")}>Personnel</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/maintenance/" value="maintainance" onClick={this.onClick} active={(this.state.active === "maintainance")}>Maintenance</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/statistiques/" value="stat" onClick={this.onClick} active={(this.state.active === "stat")}>Statistiques</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {this.renderSwitch(this.state.page)}

      </div>
    );
  }
}

export default App;