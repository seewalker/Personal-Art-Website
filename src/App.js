import React, { Component } from 'react';
import {Nav,NavItem,NavLink,Dropdown,DropdownItem,DropdownToggle,DropdownMenu,Jumbotron,Button} from 'reactstrap';
import {Card,CardImg,CardText,CardBody,CardTitle,CardColumns} from 'reactstrap';
import {Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import {albums} from './album_spec.js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//<Button color="danger">Danger!</Button>

class ModalCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle () {
        this.setState({
            modal : !this.state.modal
        });
    }
    // the img-fluid class is a bootstrap contribution that lets the image fit in the modal here.
    render () {
        return (
        <div>
          <Card onClick={this.toggle}>
            <CardImg src={this.props.image_src} />
            <CardBody>
                <CardTitle> {this.props.custom_title} </CardTitle>
                <CardText> {this.props.custom_text}.</CardText>
            </CardBody>
          </Card>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
              <ModalHeader toggle={this.toggle}>  {this.props.custom_title} </ModalHeader>
              <ModalBody>
              <img src={this.props.image_src} class="img-fluid"  />
              </ModalBody>
              <ModalFooter>
                <p> Footer </p>
              </ModalFooter>
          </Modal>
       </div>
       );
    }
}
function CustomCard(props) {
    return (
          <div>
          <Card onClick={() => console.log("cardclick")}>
            <CardImg src={props.image_src} />
            <CardBody>
                <CardTitle> {props.custom_title} </CardTitle>
                <CardText> {props.custom_text}.</CardText>
            </CardBody>
          </Card>
          </div>
           );
}

function album_extract(imgs) {
    let cards = [];
    for(let i = 0; i < imgs.length; ++i) {
        cards.push(<ModalCard custom_title={imgs[i]["title"]} image_src={imgs[i]["path"]} custom_text={imgs[i]["blurb"]} />);
    }
    return cards;
}

function AboutPage(props) {
    return (
    <div>
       <h2>About</h2>
    </div>
   );

}

function ContactPage(props) {
    return (
    <div>
       <h2>Contact</h2>
       <p> Instagram: </p>
       <p> Email: <a href="mailto:"> </a> </p>
    </div>
   );

}

function AlbumPage(props) {
    return (
      <div>
      <Jumbotron>
        <h1> {albums[props.album_key]["album_title"]} </h1>
        <p> {albums[props.album_key]["album_description"]} </p>
      </Jumbotron>
      <CardColumns>
      {album_extract(albums[props.album_key]["images"])}
      </CardColumns>
      </div>
  );
}

function Home() {
    return (
    <div>
       <h1>Rachael Newsome</h1>
       <CardColumns>
        {album_extract(albums["landing_page"])}
       </CardColumns>
    </div>
   );
}

function Routes( ) {
    return (
        <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/albums/paintings" render={(props) => <AlbumPage album_key="paintings" />} />
        <Route path="/albums/ceramics" render={(props) => <AlbumPage album_key="ceramics" />} />
        <Route path="/albums/installations" render={(props) => <AlbumPage album_key="installation" />} />
        </div>
    );
}

// the router thing here inserts itself at the top of all the pages.
// <NavItem> <NavLink tag={Link} to="/albums/paintings">Paintings</NavLink> </NavItem>
class App extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {dropdownOpen : false};
    }
    toggle() {
        console.log("beforehand state is");
        console.log(this.state);
        this.setState({dropdownOpen : !this.state.dropdownOpen});
    }
  render() {
    return (
      <div className="App">
        <Router>
        <div>
        <Nav pills>
            <NavItem> <NavLink tag={Link} to="/">Home</NavLink> </NavItem>
            <NavItem> <NavLink tag={Link} to="/about">About</NavLink> </NavItem>
            <NavItem> <NavLink tag={Link} to="/contact">Contact</NavLink> </NavItem>
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret> Albums </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag={Link} to="/albums/paintings">Paintings </DropdownItem>
                    <DropdownItem tag={Link} to="/albums/ceramics">Ceramics </DropdownItem>
                    <DropdownItem tag={Link} to="/albums/installations">Installations </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Nav>
        <Routes />
        <hr />
        </div>
        </Router>
        </div>
   );
}
}

export default App;
