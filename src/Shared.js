import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Fade } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Quotable = (props) => {
  const [state, stateHandler] = useState({
    data: null
  });

  useEffect(() => {
    fetch(`https://api.quotable.io/quotes/${props.match.params.id}`)
      .then((data) => data.json())
      .then((response) => stateHandler({ data: response }))
      .catch((error) =>
        stateHandler({
          data: { content: `Opps... Something went wrong because ${error}` }
        })
      );
  }, [props.match.params.id]);

  if (!state.data)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  return (
    <Fade in={state.data ? true : false} appear>
      <Card style={{ width: "90%", maxWidth: "40rem" }}>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{state.data.content}</p>
            {state.data.author && (
              <footer className="blockquote-footer">
                <cite title="Source Title">{state.data.author}</cite>
              </footer>
            )}
          </blockquote>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={() => props.history.push("/")}>
            New Quote
          </Button>
        </Card.Footer>
      </Card>
    </Fade>
  );
};

export default withRouter(Quotable);
