import React, { useState } from 'react'
import { Button, Table, TableBody, TableCell, TextField, TableRow } from '@mui/material';

export default function PlainTextField({desc, onSubmit, action}){
  const [ value, setValue ] = useState('')
  function onChange(nameKey){
    setValue(nameKey)
  }
  function handleEvent(k){
    if(k.key === 'Enter') handleClick();
  }
  function handleClick (){
    if(value === '' || value === ""){
      onSubmit()
    }else{
      onSubmit(value)
    }
    setValue('')
  }
  return(
    <Table style={{padding: 0, margin: 0, border: 0}}>
      <TableBody>
        <TableRow>
          <TableCell><TextField onKeyPress={(k)=>handleEvent(k)} onChange={(e)=>onChange(e.currentTarget.value)} value={value} label={desc} variant="outlined" /></TableCell>
          <TableCell align="left"><Button variant="contained" onClick={handleClick}>{action}</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
