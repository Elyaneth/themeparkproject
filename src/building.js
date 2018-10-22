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
import saveAs from 'file-saver';

class building extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showItems: [],
      value: "",
      searchResult: "",
      id: "",
      name: "",
      inst: "",

      adding: ""

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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
  handleInstChange(event) {
    this.setState({inst: event.target.value});
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
  
  handleAdd(event) {
    alert('Vous avez ajouté: ' + this.state.id +' '+ this.state.name +' '+ this.state.inst  );
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
      this.state.adding+=('"installationdate": ');
      this.state.adding+=(this.state.inst);
      this.state.adding+=('}');


    //alert(this.state.adding);

    const adder = ("[" + this.state.adding + "]");
  
    var blob = new Blob([adder], {type: "application/json"});
    saveAs(blob, "building.json");
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

      <br></br>
        <b> Ajouter un batiment </b>

        <Form onSubmit={this.handleAdd}>
        <FormGroup>
          <Label for="id">Id (veuillez ne pas utiliser un id déjà enregistré)</Label>
          <Input type="text" name="id" value={this.state.id} onChange={this.handleIdChange} placeholder="Id du batiment" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Nom</Label>
          <Input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder="Nom du batiment" />
        </FormGroup>
        <FormGroup>
          <Label for="installationdate">Date d'installation (veuillez utiliser le format dd/mm/yyyy)</Label>
          <Input type="text" name="installationdate"  value={this.state.inst} onChange={this.handleInstChange} placeholder="Date d'installation du batiment" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
            
      <br></br> 
            
      </div>
      </div>
    );
  }
}

export default building;
