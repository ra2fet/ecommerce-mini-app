import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const LoadingSkeleton = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 1 }} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoadingSkeleton;
