import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Small',
  },
  {
    value: 30,
    label: 'Medium',
  },
  {
    value: 60,
    label: 'Big',
  },

];

function valuetext(value: number) {
  return `${value}`;
}

interface ZoomSliderProps{

}

export default function ZoomSlider() {
  return (
    <Box  sx={{ width: 250 }}>
      <Slider
        aria-label="Restricted values"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        className='text-green-500'
      />
    </Box>
  );
}
