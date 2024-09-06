import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  imageUrls: string[] | null;
  createdAt: bigint;
}

function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await backend.getBlogPosts();
        setPosts(result);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Latest Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id.toString()}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(Number(post.createdAt) / 1000000).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.content.substring(0, 100)}...
                </Typography>
                <Link to={`/post/${post.id}`}>Read more</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
