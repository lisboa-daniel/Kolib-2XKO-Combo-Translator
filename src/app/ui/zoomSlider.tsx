import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0.5,
    label: 'Small',
  },
  {
    value: 1,
    label: 'Medium',
  },
  {
    value: 2,
    label: 'Big',
  },

];

function valuetext(value: number) {
  return `${value}`;
}

interface ZoomSliderProps{
  value : number;
  setValue : (n : number) => void;
}

export default function ZoomSlider({value, setValue} : ZoomSliderProps) {

  function handleChange(event: Event, value: number | number[], activeThumb: number): void {
    setValue(value as number);
  }

  return (
    <Box  sx={{ width: 200 }}>
      <Slider
        aria-label="Zoom slider"
        defaultValue={value}
        value={value}
        max={4}
        min={0.5}
        getAriaValueText={valuetext}
        step={0.5}
        onChange={handleChange}
        valueLabelDisplay={'auto'}
        
        
      />
    </Box>
  );
}
