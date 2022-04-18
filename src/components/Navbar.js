import React, { Component } from "react";
import Identicon from "identicon.js"; //user profile
// import { Container,Nav,NavDr } from "react-bootstrap";
import dcss from "../dcss.jpeg"; //logo

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <a
          className="navbar-brand ml-1 col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          <img
            src={dcss}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="DCSS logo"
          />
          &nbsp;DCSS
        </a>
        {/* <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap h5 d-none d-lg-block">
        <small className="text-secondary">
              <small id="account">{this.props.account}</small>
        </small>

        </li>
       </ul>   */}
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap h5 d-none d-lg-block ">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            {this.props.account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                style={{marginLeft:'30px'}}
                src={`data:image/png;base64,${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
                alt="DCSS account address"
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
       </nav>
    //   <Navbar bg="light" expand="lg">
    //   <Container fluid>
    //     <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: '100px' }}
    //         navbarScroll
    //       >
    //         <Nav.Link href="#action1">Home</Nav.Link>
    //         <Nav.Link href="#action2">Link</Nav.Link>
    //         <NavDropdown title="Link" id="navbarScrollingDropdown">
    //           <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action5">
    //             Something else here
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         <Nav.Link href="#" disabled>
    //           Link
    //         </Nav.Link>
    //       </Nav>
    //       <Form className="d-flex">
    //         <FormControl
    //           type="search"
    //           placeholder="Search"
    //           className="me-2"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success">Search</Button>
    //       </Form>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    );
  }
}

export default Navbar;