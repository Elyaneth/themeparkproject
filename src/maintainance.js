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
import myData from './maintainance.json';

class maintainance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showItems: [],
      value: "Recherchez une date ici",
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

    myData.map((maintainanceDetail) => {
      if(maintainanceDetail.nextMaintainance.startsWith(this.state.value))
      {
        const element = 
        <ListGroup>
          <b>Result of your search</b>
        <ListGroupItem>id: {maintainanceDetail.id}</ListGroupItem>
        <ListGroupItem>date de la dernière maintenance: {maintainanceDetail.lastMaintainance}</ListGroupItem>
        <ListGroupItem>date de la prochaine maintenance: {maintainanceDetail.nextMaintainance}</ListGroupItem>
        <ListGroupItem>attraction: {maintainanceDetail.attraction}</ListGroupItem>
        <ListGroupItem>technicien: {maintainanceDetail.personnal}</ListGroupItem>
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
              <th>Ids des maintenances</th>
              <th>Date de la prochaine maintenance</th>
            </tr>
          </thead>
          <tbody>

            {myData.map((maintainanceDetail) => {
              return (
                <tr onClick={this.onClick.bind(this, maintainanceDetail.id)}>
                  <th scope="row" style={{width: 50 + '%'}}> {maintainanceDetail.id} </th>
                  <td style={{width: 50 + '%'}}> <b>{maintainanceDetail.nextMaintainance}</b> {this.state.showItems[maintainanceDetail.id] ? <div> Id: {maintainanceDetail.id}<br></br> date de la dernière maintenance: {maintainanceDetail.lastMaintainance} <br></br> date de la prochaine maintenance: {maintainanceDetail.nextMaintainance} <br></br> attraction: {maintainanceDetail.attraction} <br></br> employé: {maintainanceDetail.personnal} </div> : null} </td>
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

export default maintainance;
