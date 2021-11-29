import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container, Form } from 'react-bootstrap';

  const Merci = () => {
  const { name: nameParams } = useParams();
  const [ name, setName ] = useState(nameParams);

  return (
    <Container className="text-center mt-5">
      <h2 className="mb-5">Merci {name} pour votre inscription</h2>

      <Form.Control type="text" placeholder="Entez le nom" value={ name } onChange={ (e) => { setName(e.target.value) } } />
    </Container>
  );
}

export default Merci;