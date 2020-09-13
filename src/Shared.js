import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Fade } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Quotable = (props) => {
  const [state, stateHandler] = useState({
    data: null
  });

  useEffect(() => {
    getSharedQuote();
  }, []);

  const getSharedQuote = async () => {
    try {
      const response = await fetch(
        `https://api.quotable.io/quotes/${props.match.params.id}`
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data);
      stateHandler({ data });
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      stateHandler({ data: { content: "Opps... Something went wrong" } });
    }
  };

  const { data } = state;
  if (!data)
    return (
      <div className="App">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  return (
    <div className="App">
      <Fade in={state.data ? true : false} appear>
        <Card style={{ width: "90%", maxWidth: "40rem" }}>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>{data.content}</p>
              {data.author && (
                <footer className="blockquote-footer">
                  <cite title="Source Title">{data.author}</cite>
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
    </div>
  );
};

export default withRouter(Quotable);
