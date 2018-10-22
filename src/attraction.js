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
import myData from './attraction.json';
import saveAs from 'file-saver';

class attraction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showItems: [],
      value: "",
      searchResult: "",
      id: "",
      name: "",
      price: "",
      inst: "",

      adding: ""

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleInstChange = this.handleInstChange.bind(this);

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

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleInstChange(event) {
    this.setState({inst: event.target.value});
  }
  
  handleSubmit(event) {
    alert('Vous avez recherché: ' + this.state.value +'\n Si rien ne se passe, la recherche n as rien trouvée');
    event.preventDefault();

    myData.map((attractionDetail) => {
      if(attractionDetail.name.startsWith(this.state.value))
      {
        const element = 
        <ListGroup>
          <b>Result of your search</b>
        <ListGroupItem>id: {attractionDetail.id}</ListGroupItem>
        <ListGroupItem>nom: {attractionDetail.name}</ListGroupItem>
        <ListGroupItem>prix: {attractionDetail.price}</ListGroupItem>
        <ListGroupItem>date d'installation: {attractionDetail.installationdate}</ListGroupItem>
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
    alert('Vous avez ajouté: ' + this.state.id +' '+ this.state.name +' '+ this.state.price +' '+ this.state.inst  );
    event.preventDefault();

    const str = JSON.stringify({ id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      installationdate: this.state.inst  
    });

    this.state.adding = "";

    {myData.map((add) => {
      this.state.adding += ('{');
      this.state.adding+=('"id": ');
      this.state.adding+=(add.id);
      this.state.adding+=(',');
      this.state.adding+=('"name": ');
      this.state.adding+=(add.name);
      this.state.adding+=(',');
      this.state.adding+=('"price": ');
      this.state.adding+=(add.price);
      this.state.adding+=(',');
      this.state.adding+=('"installationdate": ');
      this.state.adding+=(add.installationdate);
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
      this.state.adding+=('"price": ');
      this.state.adding+=(this.state.price);
      this.state.adding+=(',');
      this.state.adding+=('"installationdate": ');
      this.state.adding+=(this.state.inst);
      this.state.adding+=('}');


    //alert(this.state.adding);

    const adder = ("[" + this.state.adding + "]");
  
    var blob = new Blob([adder], {type: "application/json"});
    saveAs(blob, "attraction.json");
  }
  
  render() {
    return (

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
              <th>Ids des attractions</th>
              <th>Noms</th>
            </tr>
          </thead>
          <tbody>

            {myData.map((attractionDetail) => {
              return (
                <tr onClick={this.onClick.bind(this, attractionDetail.id)}>
                  <th scope="row" style={{width: 50 + '%'}}> {attractionDetail.id} </th>
                  <td style={{width: 50 + '%'}}> <b>{attractionDetail.name}</b> {this.state.showItems[attractionDetail.id] ? <div> Id: {attractionDetail.id}<br></br> Name: {attractionDetail.name} <br></br> Entry price: {attractionDetail.price} <br></br> Installation date: {attractionDetail.installationdate} </div> : null} </td>
                </tr>
              )
            })}

          </tbody>
        </Table>

        <br></br>
        <b> Ajouter une attraction </b>

        <Form onSubmit={this.handleAdd}>
        <FormGroup>
          <Label for="id">Id (veuillez ne pas utiliser un id déjà enregistré)</Label>
          <Input type="text" name="id" value={this.state.id} onChange={this.handleIdChange} placeholder="Id de l'attraction" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Nom</Label>
          <Input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder="Nom de l'attraction" />
        </FormGroup>
        <FormGroup>
          <Label for="price">Prix </Label>
          <Input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} placeholder="Prix de l'attraction" />
        </FormGroup>
        <FormGroup>
          <Label for="installationdate">Date d'installation (veuillez utiliser le format dd/mm/yyyy)</Label>
          <Input type="text" name="installationdate"  value={this.state.inst} onChange={this.handleInstChange} placeholder="Date d'installation de l'attraction" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
            
      <br></br>      
      </div>

    );
  }
}

export default attraction;