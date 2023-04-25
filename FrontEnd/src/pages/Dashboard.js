//Solomon Hearn wrote this using chat GPT, usage 40% to help understanding the file and contents
import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Box, Typography, TextField, Button } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme();

function Dashboard() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [openAIResponse, setOpenAIResponse] = useState(null);

  useEffect(() => {
    // Your existing code to fetch user data
  }, []);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleOpenAISubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      setOpenAIResponse(data);
    } else {
      console.error('Unable to fetch OpenAI API response');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome, {user.username}!
          </Typography>
          <form onSubmit={handleOpenAISubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Enter your prompt"
              autoFocus
              value={prompt}
              onChange={handlePromptChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Get OpenAI Response
            </Button>
          </form>
          {openAIResponse && (
            <Box>
              <Typography component="h2" variant="h6">
                OpenAI API Response:
              </Typography>
              <Typography component="p" variant="body1">
                {openAIResponse.choices[0].text}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
