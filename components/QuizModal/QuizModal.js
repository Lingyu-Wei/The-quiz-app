import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import useFetch from 'use-http';

const QuizModal = () => {
  const [open, changeOpen] = useState(true);
  const {
    data = {},
  } = useFetch('/api/questions/count', {}, []);

  return (
    <Modal open={open} onClose={() => changeOpen(true)}>
      <Card
        style={{
          maxWidth: 600,
          margin: '10rem auto',
        }}
      >
        <CardContent>
          <Typography variant="h4">Welcome to the quiz</Typography>
          <Typography>There are {data.count} questions to answer.</Typography>
          <Typography>Press below to start the quiz</Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={() => changeOpen(false)}
          >
            Start the quiz
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default QuizModal;
