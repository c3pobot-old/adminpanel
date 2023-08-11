import React, { useState } from 'react'
import { Autocomplete, Button, Table, TableBody, TableCell, TextField, TableRow } from '@mui/material';

export default function FactionSearch({array = [], refreshFaction, addFaction}){
  const [ newValue, setValue ] = useState(null)

  function handleEvent(k){
    if(k.key === 'Enter') selectFaction();
  }
  function selectFaction(){
    if(addFaction && newValue){
      addFaction(newValue)
      setValue(null)
    }
  }
  if(!array) return null
  return (
    <Table style={{padding: 0, margin: 0, border: 0}}>
      <TableBody>
      <TableRow>
        <TableCell align="center">
        <Autocomplete align="center" value={newValue} options={array} onKeyPress={(k)=>handleEvent(k)} onChange={(_, data) => setValue(data)} renderInput={(params)=><TextField {...params} label="Faction" variant="outlined"/>}/>
        </TableCell>
        <TableCell align="left"><Button variant="contained" onClick={selectFaction}>Add</Button></TableCell>
        <TableCell align="left"><Button variant="contained" onClick={()=>refreshFaction(true)}>Refresh</Button></TableCell>
      </TableRow>
      </TableBody>
    </Table>
  )
}
