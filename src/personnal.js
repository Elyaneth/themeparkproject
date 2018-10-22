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
import myData from './personnal.json';

class personnal extends React.Component {
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

    myData.map((personDetail) => {
      if(personDetail.name.startsWith(this.state.value))    
      {
        const element = 
        <ListGroup>
          <b>Result of your search</b>
        <ListGroupItem>id: {personDetail.id}</ListGroupItem>
        <ListGroupItem>nom: {personDetail.name}</ListGroupItem>
        <ListGroupItem>prénom: {personDetail.surname}</ListGroupItem>
        <ListGroupItem>age: {personDetail.age}</ListGroupItem>
        <ListGroupItem>fonction: {personDetail.function}</ListGroupItem>
        <ListGroupItem>salaire: {personDetail.salary}</ListGroupItem>
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
              <th>Ids des employés</th>
              <th>Noms</th>
            </tr>
          </thead>
          <tbody>

            {myData.map((personDetail) => {
              return (
                <tr onClick={this.onClick.bind(this, personDetail.id)}>
                  <th scope="row" style={{width: 50 + '%'}}> {personDetail.id} </th>
                  <td style={{width: 50 + '%'}}> <b>{personDetail.name}</b> {this.state.showItems[personDetail.id] ? <div> Id: {personDetail.id}<br></br> Name: {personDetail.name} <br></br>Surame: {personDetail.surname} <br></br>Age: {personDetail.age} <br></br> Fonction: {personDetail.function} <br></br> Salary: {personDetail.salary}  </div> : null} </td>
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

export default personnal;