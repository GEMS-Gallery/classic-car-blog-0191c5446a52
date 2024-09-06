import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const urls = imageUrls.split('\n').filter(url => url.trim() !== '');
      const result = await backend.createBlogPost(title, content, urls.length > 0 ? urls : null);
      if ('ok' in result) {
        navigate(`/post/${result.ok}`);
      } else {
        console.error('Error creating blog post:', result.err);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Blog Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={6}
          required
        />
        <TextField
          label="Image URLs (one per line)"
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
