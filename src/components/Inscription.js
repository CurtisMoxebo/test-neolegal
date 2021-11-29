import questionsFile from '../data/questions';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Inscription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

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
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
    }

    else {
      setIsLoading(true);
      const formResult = answeredQuestions.reduce((r, c) => Object.assign(r, c), {});

      fetch('https://enovode7uq1r.x.pipedream.net/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formResult)
      }).then((res) => {
        if (res.status === 200) {
          history.push(`/merci/${ formResult.first_name ? formResult.first_name : '' }`)
        }
      }).catch((error) => {
        console.log(error)
        setIsLoading(false);
        setIsError(true);
      })
    }
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
        <Form noValidate validated={validated} onSubmit={ submitForm }>
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
                      <Form.Select name={ field.name } value={ answeredQuestions[questionIndex][`${field.name}`] } onChange={ (e) => onInputChange(e, questionIndex, field.name) } placeholder={`Entrez ${field.label.toLowerCase()}`} required>
                        <option></option>
                        { field.options.map((option, optionIndex) => (
                          <option key={ `option-${optionIndex}` }>{ option.label }</option>
                        )) }
                      </Form.Select>
                    }

                    { field.type !== "dropdown" && !field.options &&
                      <Form.Control aria-describedby="inputGroupPrepend" type={ field.type } name={ field.name } value={ answeredQuestions[questionIndex][`${field.name}`] } onChange={ (e) => onInputChange(e, questionIndex, field.name) } placeholder={`Entrez ${field.label.toLowerCase()}`} required />
                    }
                    <Form.Control.Feedback type="invalid">{ field.label } est vide</Form.Control.Feedback>

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