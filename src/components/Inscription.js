import { questions } from '../data/questions';
import { Container, Card } from 'react-bootstrap';

console.log(questions.length);

const Inscription = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          Inscription
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Inscription;