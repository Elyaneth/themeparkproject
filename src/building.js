import React from 'react';
import {
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
      value: "Recherchez un nom ici",
      searchResult: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    alert('Vous avez recherché: ' + this.state.value +'\n Si rien ne se passe, la recherche n as rien trouvée');
    event.preventDefault();

    myData.map((buildingDetail) => {
      if(buildingDetail.name.startsWith(this.state.value))
      {
        const element = 
        <ListGroup>
          <b>Result of your search</b>
        <ListGroupItem>id: {buildingDetail.id}</ListGroupItem>
        <ListGroupItem>nom: {buildingDetail.name}</ListGroupItem>
        <ListGroupItem>date d'installation: {buildingDetail.installationdate}</ListGroupItem>
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

      <div style={{marginRight: 10, marginLeft: 10 }}>
        <br></br>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="Search"><b> Recherche: </b></Label>
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
              <th>Ids des batiments</th>
              <th>Noms</th>
            </tr>
          </thead>
          <tbody>

            {myData.map((buildingDetail) => {
              return (
                <tr onClick={this.onClick.bind(this, buildingDetail.id)}>
                  <th scope="row" style={{width: 50 + '%'}}> {buildingDetail.id} </th>
                  <td style={{width: 50 + '%'}}> <b>{buildingDetail.name}</b> {this.state.showItems[buildingDetail.id] ? <div> Id: {buildingDetail.id}<br></br> Name: {buildingDetail.name} <br></br> Installation date: {buildingDetail.installationdate} </div> : null} </td>
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
