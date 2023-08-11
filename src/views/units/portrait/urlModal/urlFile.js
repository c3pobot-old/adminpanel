//react
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TextField, TableRow } from '@mui/material';
//modules

export default function AutoTextField ({ desc, onSubmit, action }){
  const [ newValue, setValue ] = useState('')
  function onChange(nameKey){
    setValue(nameKey)
  }
  function handeClick(){
    onSubmit(newValue)
  }
  return (
  <Table style={{padding: 0, margin: 0, border: 0}}>
    <TableBody>
    <TableRow>
      <TableCell align="center"><TextField onChange={(e)=>onChange(e.currentTarget.value)} value={newValue} label={desc} variant="outlined" /></TableCell>

    </TableRow>
    {onSubmit && <TableRow><TableCell align="center"><Button variant="contained" onClick={handeClick}>{action}</Button></TableCell></TableRow>}
    </TableBody>
  </Table>
  )
}
