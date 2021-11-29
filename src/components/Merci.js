import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, Container, Form } from 'react-bootstrap';

  const Merci = () => {
  const { name: nameParams } = useParams();
  const [ name, setName ] = useState(nameParams);

  return (
    <Container className="mt-5">
      <Card className="my-3 mx-auto" style={{ width: '45rem' }}>
        <Card.Header className="text-center">
        <h2 >Merci {name} pour votre inscription</h2>
        </Card.Header>

        <Card.Body className="py-5 mx-5">
          <Form.Group>
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Entez le nom" value={ name } onChange={ (e) => { setName(e.target.value) } } />
          </Form.Group>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Merci;