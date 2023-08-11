import React, { useState } from 'react';
import { Autocomplete, Button, TableCell, TextField, TableRow, Typography } from '@mui/material';

export default function UnitSearch({array = [], refreshUnits, addUnit}){
  const [ newValue, setValue ] = useState(null)

  function handleEvent(k){
    if(k.key === 'Enter') selectUnit();
  }
  function selectUnit(){
    if(addUnit && newValue){
      addUnit(newValue)
      setValue(null)
    }
  }
  return (


      <TableRow>
        <TableCell align="left" colSpan="4">
          <Typography><Autocomplete align="center" value={newValue} options={array} onKeyPress={(k)=>handleEvent(k)} onChange={(_, data) => setValue(data)} renderInput={(params)=><TextField {...params} label="Unit" variant="outlined"/>}/><Button variant="contained" onClick={selectUnit}>Add</Button><Button variant="contained" onClick={()=>refreshUnits(true)}>Refresh</Button></Typography>
        </TableCell>
      </TableRow>
  )
}
