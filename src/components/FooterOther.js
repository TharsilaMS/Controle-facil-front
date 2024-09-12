import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterOther = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Controle Fácil </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterOther;
