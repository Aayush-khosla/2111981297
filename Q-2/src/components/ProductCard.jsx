import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image || 'https://via.placeholder.com/150'}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.company} - {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price} - Rating: {product.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discount: {product.discount}% - Availability: {product.availability}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
