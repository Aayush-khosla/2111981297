import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, Grid, Box } from '@mui/material';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: '',
    availability: ''
  });

  useEffect(() => {
    // Fetch products from backend API
    axios.get('/api/products', { params: filters })
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField name="category" label="Category" value={filters.category} onChange={handleFilterChange} />
        <TextField name="company" label="Company" value={filters.company} onChange={handleFilterChange} />
        <TextField name="rating" label="Rating" value={filters.rating} onChange={handleFilterChange} />
        <TextField name="priceRange" label="Price Range" value={filters.priceRange} onChange={handleFilterChange} />
        <TextField name="availability" label="Availability" value={filters.availability} onChange={handleFilterChange} />
      </Box>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
