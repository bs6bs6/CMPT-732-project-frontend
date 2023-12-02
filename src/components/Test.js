import React,{useState} from "react";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Test() {
  const defaultTheme = createTheme();
  const [sseMessages, setSseMessages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleSubmit = (event) => {
        setIsSubmitted(true); 
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {};

        for (const [key, value] of data.entries()) {
            formData[key] = value;
        }

        fetch('http://localhost:8080/getPrediction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            const requestId = data.requestId;
            console.log('Success:', data);
            console.log(requestId);
            establishSseConnection(requestId);
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
    };

    // 建立 SSE 连接
    const establishSseConnection = (requestId) => {
        const eventSource = new EventSource(`http://localhost:8080/getSSE?requestId=${requestId}`);

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setSseMessages(prevMessages => [...prevMessages, newMessage]);
            console.log(newMessage);
        };

        eventSource.onerror = (event) => {
          console.error('EventSource error:', event);
          console.log('EventSource readyState:', eventSource.readyState);
          // Close the current connection
          eventSource.close();
     
        };
    };


  return (
    <div>
       <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Predict Your Sentiment
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* "hour", "dayofweek", "online_age", "candidate", "language", "sentiment */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="0~23"
                  name="hour"
                  required
                  fullWidth
                  id="hour"
                  label="Hour"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dayofweek"
                  label="Dayofweek"
                  name="dayofweek"
                  autoComplete="1~7"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="online_age"
                  label="Online_age"
                  name="online_age"
                  autoComplete="online_age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="candidate"
                  label="Candidate"
                  type="candidate"
                  id="candidate"
                  autoComplete="biden/trump"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="language"
                  label="Language"
                  type="language"
                  id="language"
                  autoComplete="language"
                />
              </Grid>
            </Grid>
            <Button
              onClick={() => {}}
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitted}
              sx={{ mt: 3, mb: 2 }}
            >
              predict
            </Button>
            {sseMessages.map((msg, index) => (
                <div key={index}>{msg.prediction}</div>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  )
}