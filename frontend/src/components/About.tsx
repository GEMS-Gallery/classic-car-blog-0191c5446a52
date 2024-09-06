import React from 'react';
import { Typography, Paper } from '@mui/material';

function About() {
  return (
    <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Classic Car Blog
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Classic Car Blog, your ultimate destination for all things related to vintage automobiles. Our passion for classic cars drives us to share fascinating stories, expert insights, and stunning imagery of these timeless machines.
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you're a seasoned collector, a restoration enthusiast, or simply an admirer of automotive history, our blog offers something for everyone. From in-depth articles on iconic models to practical tips on maintenance and preservation, we strive to be your go-to resource in the world of classic cars.
      </Typography>
      <Typography variant="body1">
        Join our community of classic car enthusiasts, share your thoughts, and embark on a journey through the golden ages of automotive design and engineering. Let's celebrate the beauty, innovation, and enduring legacy of classic cars together!
      </Typography>
    </Paper>
  );
}

export default About;
