import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
    <Box>
      <h1 style={{ color: "red", 
                   textAlign: "center", 
                   marginTop: "-50px" ,marginLeft:"-210px"}}>
        DCSS @2022
      </h1>
      <Container>
        <Row>
          <Column>
          <FooterLink href="https://facebook.com">
            <i class="fa-brands fa-facebook"></i>
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px"}}>
                  Facebook
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
          <FooterLink href="https://instagram.com">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "20px"}}>
                  Instagram
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
          <FooterLink href="https://twitter.com">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>    
            <FooterLink href="https://youtube.com">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
    </div>
  );
};
export default Footer;