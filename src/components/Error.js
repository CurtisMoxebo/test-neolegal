import { Container } from "react-bootstrap";

const Error = () => {
  return (
    <Container>
      <div className="jumbotron d-flex align-items-center min-vh-100">
        <div className="container text-center">
          <h2>404 - Page not found</h2>
        </div>
      </div>
    </Container>
  );
}

export default Error;