import React from 'react';
import {
  Form,
  FormGroup,
  Label, 
  Input, 
  Button,
  ListGroup, 
  ListGroupItem,
  Table,
  Alert
} from 'reactstrap';
import myData from './maintainance.json';
import saveAs from 'file-saver';

class maintainance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showItems: [],
      value: "",
      searchResult: "",
      id: "",
      last: "",
      next: "",
      att: "",
      emp: "",

      adding: "",
      

      i: 0,
      j:0

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
    this.handleNextChange = this.handleNextChange.bind(this);
    this.handleAttChange = this.handleAttChange.bind(this);
    this.handleEmpChange = this.handleEmpChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleIdChange(event) {
    this.setState({id: event.target.value});
  }
  
  handleLastChange(event) {
    this.setState({name: event.target.value});
  }

  handleNextChange(event) {
    this.setState({name: event.target.value});
  }

  handleAttChange(event) {
    this.setState({name: event.target.value});
  }

  handleEmpChange(event) {
    this.setState({name: event.target.value});
  }
  
  handleSubmit(event) {
    alert('Vous avez recherché: ' + this.state.value );
    event.preventDefault();

    myData.map((maintainanceDetail) => {
      this.state.i ++;
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
      else { this.state.j++;}
    })  
    
    if (this.state.i == this.state.j)
    {
      alert('Désolé, la recherche sur: ' + this.state.value + " n'as pas trouvé d'élements correspondant" );
    }   
  }

  onClick(index) {
    let showItems = this.state.showItems.slice();
    showItems[index] = !showItems[index];
    this.setState({ showItems });
  }
  
  handleAdd(event) {
    alert('Vous avez ajouté: ' + this.state.id +' '+ this.state.name +' '+ this.state.price +' '+ this.state.inst  );
    event.preventDefault();


    this.state.adding = "";

    {myData.map((add) => {
      this.state.adding += ('{');
      this.state.adding+=('"id": ');
      this.state.adding+=(add.id);
      this.state.adding+=(',');
      this.state.adding+=('"lastMaintainance": ');
      this.state.adding+=(add.last);
      this.state.adding+=(',');
      this.state.adding+=('"nextMaintainance": ');
      this.state.adding+=(add.next);
      this.state.adding+=(',');
      this.state.adding+=('"attraction": ');
      this.state.adding+=(add.att);
      this.state.adding+=(',');
      this.state.adding+=('"personnal": ');
      this.state.adding+=(add.emp);
      this.state.adding+=('},');
    })}

    //add the new thing
    this.state.adding += ('{');
    this.state.adding+=('"id": ');
      this.state.adding+=(this.state.id);
      this.state.adding+=(',');
      this.state.adding+=('"lastMaintainance": ');
      this.state.adding+=(this.state.last);
      this.state.adding+=(',');
      this.state.adding+=('"nextMaintainance": ');
      this.state.adding+=(this.state.next);
      this.state.adding+=(',');
      this.state.adding+=('"attraction": ');
      this.state.adding+=(this.state.att);
      this.state.adding+=(',');
      this.state.adding+=('"personnal": ');
      this.state.adding+=(this.state.emp);
      this.state.adding+=('}');


    //alert(this.state.adding);

    const adder = ("[" + this.state.adding + "]");
  
    var blob = new Blob([adder], {type: "application/json"});
    saveAs(blob, "maintainance.json");
  }

  render() {
    return (
      <div>

      <div style={{marginRight: 10, marginLeft: 10 }}>
        <br></br>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Alert color="primary"> Recherche: </Alert>
            <Input type="text" name="Search" id="search" value={this.state.value} onChange={this.handleChange} placeholder="Recherchez un nom ici"/>
            </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>

        <br></br>

        <div> {this.state.searchResult} </div>

        <br></br>

        <Alert color="primary"> Informations: </Alert>
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

      <br></br>
      <Alert color="primary"> Ajouter une maintenance: </Alert>

        <Form onSubmit={this.handleAdd}>
        <FormGroup>
          <Label for="id">Id (veuillez ne pas utiliser un id déjà enregistré)</Label>
          <Input type="text" name="id" value={this.state.id} onChange={this.handleIdChange} placeholder="Id de la maintenance" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Dernière maintenance (veuillez utiliser le format dd/mm/yyyy)</Label>
          <Input type="text" name="last" value={this.state.last} onChange={this.handleLastChange} placeholder="Date de la dernière maintenance" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Prochaine maintenance (veuillez utiliser le format dd/mm/yyyy)</Label>
          <Input type="text" name="next" value={this.state.next} onChange={this.handleNextChange} placeholder="Date de la prochaine maintenance" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Attraction</Label>
          <Input type="text" name="attraction" value={this.state.att} onChange={this.handleAttChange} placeholder="Nom de l'attraction" />
        </FormGroup>
        <FormGroup>
          <Label for="name">Employé</Label>
          <Input type="text" name="employee" value={this.state.emp} onChange={this.handleEmpChange} placeholder="Nom de l'employé" />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
            
      <br></br>  

      </div>
      </div>
    );
  }
}

export default maintainance;
