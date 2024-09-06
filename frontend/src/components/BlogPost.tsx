import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { backend } from '../../declarations/backend';

interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  imageUrls: string[] | null;
  createdAt: bigint;
}

interface Comment {
  id: bigint;
  postId: bigint;
  author: string;
  content: string;
  createdAt: bigint;
}

function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ author: '', content: '' });

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        const postResult = await backend.getBlogPost(BigInt(id!));
        if ('ok' in postResult) {
          setPost(postResult.ok);
          const commentsResult = await backend.getComments(BigInt(id!));
          setComments(commentsResult);
        } else {
          console.error('Error fetching blog post:', postResult.err);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await backend.addComment(BigInt(id!), newComment.author, newComment.content);
      if ('ok' in result) {
        const updatedComments = await backend.getComments(BigInt(id!));
        setComments(updatedComments);
        setNewComment({ author: '', content: '' });
      } else {
        console.error('Error adding comment:', result.err);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {new Date(Number(post.createdAt) / 1000000).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      {post.imageUrls && (
        <div>
          {post.imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          ))}
        </div>
      )}
      <Typography variant="h5" component="h2" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id.toString()}>
            <ListItemText
              primary={comment.author}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {comment.content}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    {new Date(Number(comment.createdAt) / 1000000).toLocaleString()}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleCommentSubmit}>
        <TextField
          label="Your Name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Your Comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Comment
        </Button>
      </form>
    </div>
  );
}

export default BlogPost;
