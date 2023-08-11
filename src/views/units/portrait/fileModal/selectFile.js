//react
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
//modules

export default function SelectFile ({ desc, onSubmit, action }){
  const [selectedFile, setSelectedFile] = useState();

  function handleFile (event){
    setSelectedFile(event.target.files[0]);
  }
  return (
  <Table style={{padding: 0, margin: 0, border: 0}}>
    <TableBody>
    <TableRow>
      <TableCell align="center">
        <input type="file" name={desc} onChange={handleFile} />
      </TableCell>

    </TableRow>
    {onSubmit && <TableRow><TableCell align="center"><Button variant="contained" onClick={()=>onSubmit(selectedFile)}>{action}</Button></TableCell></TableRow>}
    </TableBody>
  </Table>
  )
}
