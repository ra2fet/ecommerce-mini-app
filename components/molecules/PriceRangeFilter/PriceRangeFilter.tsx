import React from 'react';
import { TextField, Box, Typography, Slider } from '@mui/material';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceRangeFilter  = ({ minPrice, maxPrice, onPriceChange }:PriceRangeFilterProps) => {
  const [values, setValues] = React.useState<number[]>([minPrice, maxPrice]);

  React.useEffect(() => {
    setValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValues(newValue as number[]);
  };

  const handleSliderChangeCommitted = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    onPriceChange((newValue as number[])[0], (newValue as number[])[1]);
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(event.target.value);
    if (!isNaN(newMin) && newMin <= values[1]) {
      setValues([newMin, values[1]]);
      onPriceChange(newMin, values[1]);
    }
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(event.target.value);
    if (!isNaN(newMax) && newMax >= values[0]) {
      setValues([values[0], newMax]);
      onPriceChange(values[0], newMax);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={values}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
        valueLabelDisplay="auto"
        min={0}
        max={1000}         />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <TextField
          label="Min"
          type="number"
          value={values[0]}
          onChange={handleMinInputChange}
          size="small"
          sx={{ width: '48%' }}
        />
        <TextField
          label="Max"
          type="number"
          value={values[1]}
          onChange={handleMaxInputChange}
          size="small"
          sx={{ width: '48%' }}
        />
      </Box>
    </Box>
  );
};

export default PriceRangeFilter;
