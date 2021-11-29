import questionsFile from '../data/questions';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Inscription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    // simulate getting data
    setTimeout(() => {
      const getQuestions = questionsFile;
      let answerArray = [];

      if (getQuestions && getQuestions.questions) {
        setQuestions(getQuestions.questions);

        // Initialize answer object
        getQuestions.questions.forEach(question => {
          let answer = { };

          question.fields.forEach(field => {
            answer[field.name] = '';
          });

          answerArray.push(answer);
        });

        setAnsweredQuestions(answerArray);
        setIsLoading(false);
      }

      else {
        setIsLoading(false);
        setIsError(true);
      }
    }, 1000);
  }, [])

  const onInputChange = (e, index, name) => {
    const oldAnswers = answeredQuestions;
    oldAnswers[index][`${name}`] = e.target.value;
    setAnsweredQuestions([...oldAnswers]);
  }

  // Submit data
  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('https://enovode7uq1r.x.pipedream.net/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answeredQuestions.reduce((r, c) => Object.assign(r, c), {}))
    }).then((res) => {
      console.log(res);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error)
      setIsLoading(false);
      setIsError(true);
    })
  }

  return (
    <Container>
      { isLoading &&
        <div>
          loading
        </div>
      }

      { isError &&
        <div>
          Error
        </div>
      }

      { !isLoading && !isError &&
        <Form onSubmit={ submitForm }>
          <Card className="my-3 mx-5">
            <Card.Header className="text-center">
              <h4> Formulaire d'inscription </h4>
            </Card.Header>

            { questions && questions.map((question, questionIndex) => (
              <Card.Body key={ `question-${questionIndex}` }>
                <Card.Title className="mb-3">{ question.title }</Card.Title>

                { question.fields && question.fields.map((field, fieldIndex) => (
                  <Form.Group key={ `field-${fieldIndex}` } className="mb-3 mx-4">
                    <Form.Label>{ field.label }</Form.Label>

                    { field.type === "dropdown" && field.options && field.options.length > 0 &&
                      <Form.Select name={ field.name } value={ answeredQuestions[questionIndex][`${field.name}`] } onChange={ (e) => onInputChange(e, questionIndex, field.name) } placeholder={`Entrez ${field.label.toLowerCase()}`}>
                        { field.options.map((option, optionIndex) => (
                          <option key={ `option-${optionIndex}` }>{ option.label }</option>
                        )) }
                      </Form.Select>
                    }

                    { field.type !== "dropdown" && !field.options &&
                      <Form.Control type={ field.type } name={ field.name } value={ answeredQuestions[questionIndex][`${field.name}`] } onChange={ (e) => onInputChange(e, questionIndex, field.name) } placeholder={`Entrez ${field.label.toLowerCase()}`} />
                    }
                    <Form.Control.Feedback type="invalid">
                    bad
                  </Form.Control.Feedback>

                  </Form.Group>
                )) }
              </Card.Body>
            )) }

            <Card.Body>
              <Button variant="primary" type='submit'>Envoyer</Button>
            </Card.Body>
          </Card>
        </Form>
      }
    </Container>
  );
}

export default Inscription;