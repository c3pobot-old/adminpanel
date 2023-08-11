import React, { useState } from 'react';
import { Autocomplete, Button, TableCell, TextField, TableRow, Typography } from '@mui/material';

export default function UnitSearch({array = [], refreshUnits, selectGuide}){
  const [ newValue, setValue ] = useState(null)

  function handleEvent(k){
    if(k.key === 'Enter') selectUnit();
  }
  function selectUnit(){
    if(selectGuide && newValue){
      selectGuide(newValue)
      setValue(null)
    }
  }
  return (
      <TableRow>
        <TableCell align="left">
          <Autocomplete align="center" value={newValue} options={array} onKeyPress={(k)=>handleEvent(k)} onChange={(_, data) => setValue(data)} renderInput={(params)=><TextField {...params} label="Guide Unit" variant="outlined"/>}/>
        </TableCell>
        <TableCell align="left">
          <Typography><Button variant="contained" onClick={selectUnit}>Select</Button></Typography>
        </TableCell>
        <TableCell align="left">
          <Typography><Button variant="contained" onClick={()=>refreshUnits(true)}>Refresh</Button></Typography>
        </TableCell>
      </TableRow>
  )
}
