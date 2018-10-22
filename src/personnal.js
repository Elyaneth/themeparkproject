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
import saveAs from 'file-saver';

class personnal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showItems: [],
      value: "",
      searchResult: "",
      id: "",
      name: "",
      surname: "",
      age: "",
      function: "",
      price: "",

      adding: ""

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleFunctionChange = this.handleFunctionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleIdChange(event) {
    this.setState({id: event.target.value});
  }
  
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSurnameChange(event) {
    this.setState({surname: event.target.value});
  }

  handleAgeChange(event) {
    this.setState({age: event.target.value});
  }

  handleFunctionChange(event) {
    this.setState({function: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
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

  handleAdd(event) {
    alert('Vous avez ajouté: ' + this.state.id +' '+ this.state.name +' '+ this.state.surname +' '+ this.state.age +' '+ this.state.function +' '+ this.state.price +' '  );
    event.preventDefault();

    this.state.adding = "";

    {myData.map((add) => {
      this.state.adding += ('{');
      this.state.adding+=('"id": ');
      this.state.adding+=(add.id);
      this.state.adding+=(',');
      this.state.adding+=('"name": ');
      this.state.adding+=(add.name);
      this.state.adding+=(',');
      this.state.adding+=('"surname": ');
      this.state.adding+=(add.name);
      this.state.adding+=(',');
      this.state.adding+=('"age": ');
      this.state.adding+=(add.name);
      this.state.adding+=(',');
      this.state.adding+=('"function": ');
      this.state.adding+=(add.name);
      this.state.adding+=(',');
      this.state.adding+=('"salary": ');
      this.state.adding+=(add.price);
      this.state.adding+=(',');
      this.state.adding+=('},');
    })}

    //add the new thing
    this.state.adding += ('{');
      this.state.adding+=('"id": ');
      this.state.adding+=(this.state.id);
      this.state.adding+=(',');
      this.state.adding+=('"name": ');
      this.state.adding+=(this.state.name);
      this.state.adding+=(',');
      this.state.adding+=('"surname": ');
      this.state.adding+=(this.state.surname);
      this.state.adding+=(',');
      this.state.adding+=('"age": ');
      this.state.adding+=(this.state.age);
      this.state.adding+=(',');
      this.state.adding+=('"function": ');
      this.state.adding+=(this.state.function);
      this.state.adding+=(',');
      this.state.adding+=('"salary": ');
      this.state.adding+=(this.state.price);
      this.state.adding+=('}');


    //alert(this.state.adding);

    const adder = ("[" + this.state.adding + "]");
  
    var blob = new Blob([adder], {type: "application/json"});
    saveAs(blob, "personnel.json");
  }

  
  render() {
    return (
      <div>

      <div style={{marginRight: 10, marginLeft: 10 }}>
        <br></br>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="Search"><b> Recherche: </b></Label>
            <Input type="text" name="Search" id="search" value={this.state.value} onChange={this.handleChange} placeholder="Recherchez un nom ici"/>
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
                  <td style={{width: 50 + '%'}}> <b>{personDetail.name}</b> {this.state.showItems[personDetail.id] ? <div> Id: {personDetail.id}<br></br> Nom: {personDetail.name} <br></br>Prénom: {personDetail.surname} <br></br>Age: {personDetail.age} <br></br> Fonction: {personDetail.function} <br></br> Salaire: {personDetail.salary}  </div> : null} </td>
                </tr>
              )
            })}

          </tbody>
        </Table>

        <br></br>
        <b> Ajouter un employé </b>

        <Form onSubmit={this.handleAdd}>
        <FormGroup>
          <Label for="id">Id (veuillez ne pas utiliser un id déjà enregistré)</Label>
          <Input type="text" name="id" value={this.state.id} onChange={this.handleIdChange} placeholder="Id de l'employé" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Nom</Label>
          <Input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder="Nom de l'employé" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Prénom</Label>
          <Input type="text" name="surname" value={this.state.surname} onChange={this.handleSurnameChange} placeholder="Nom de l'employé" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Age</Label>
          <Input type="text" name="age" value={this.state.age} onChange={this.handleAgeChange} placeholder="Nom de l'employé" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Fonction</Label>
          <Input type="text" name="fonction" value={this.state.function} onChange={this.handleFunctionChange} placeholder="Nom de l'employé" />
        </FormGroup>
        <FormGroup>
          <Label for="price">Salaire </Label>
          <Input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} placeholder="Salaire de l'employé" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
            
      <br></br>  
      </div>
      </div>
    );
  }
}

export default personnal;