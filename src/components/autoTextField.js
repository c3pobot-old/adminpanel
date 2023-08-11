//react
import React, { useState } from 'react';
import { Autocomplete, Button, Table, TableBody, TableCell, TextField, TableRow } from '@mui/material';

export default function AutoTextField ({ array, desc, onSelect, onSubmit, action }){
  const [ newValue, setValue ] = useState(null)
  function handleSelect (){
    if(newValue && onSelect){
      onSelect(newValue)
      setValue(null)
    }
  }
  function handleEvent(k){
    if(k.key === 'Enter') handleSelect();
  }
  function handleSubmit(){
    if(onSubmit){
      onSubmit(newValue)
      setValue(null)
    }
  }
  return (
  <Table style={{padding: 0, margin: 0, border: 0}}>
    <TableBody>
    <TableRow>
      <TableCell align="center">
      <Autocomplete align="center" value={newValue} options={array} onKeyPress={(k)=>handleEvent(k)} onSelect={handleSelect} onChange={(_, data) => setValue(data)} renderInput={(params)=><TextField {...params} label={desc} variant="outlined"/>}/>
      </TableCell>
      {onSubmit && <TableCell align="left"><Button variant="contained" onClick={handleSubmit}>{action}</Button></TableCell>}
    </TableRow>
    </TableBody>
  </Table>
  )
}
