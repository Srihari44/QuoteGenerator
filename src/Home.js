import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Fade } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Quotable = (props) => {
  const [state, stateHandler] = useState({
    data: null
  });

  useEffect(() => {
    getNewQuote();
  }, []);

  const getNewQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      if (!response.ok) throw new Error(data);
      stateHandler({ data: data });
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      stateHandler({ data: { content: "Opps... Something went wrong" } });
    }
  };
  const showShareLink = () => {
    stateHandler({
      ...state,
      shareLink: window.location.href + "share/" + state.data._id
    });
  };

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
          <Button className="mr-5" variant="primary" onClick={showShareLink}>
            Share
          </Button>
          <Button variant="primary" onClick={getNewQuote}>
            New Quote
          </Button>
          <Fade in={state.shareLink ? true : false}>
            <div className="mt-3">
              <a href={state.shareLink}>{state.shareLink}</a>
            </div>
          </Fade>
        </Card.Footer>
      </Card>
    </Fade>
  );
};
export default withRouter(Quotable);
