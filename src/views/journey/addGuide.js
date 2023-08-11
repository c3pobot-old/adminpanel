import React, { useState } from 'react'
import { Button, TableCell, TextField, TableRow, Typography } from '@mui/material';
import ApiRequest from 'components/apiRequest'

async function updateGuides(guide = {}, opts = {}){
  const { setAlert, setSpinner, discordId } = opts;
  if(!guide.value && !guide.name) return
  setSpinner(true)
  let res = await ApiRequest({method: 'addGuide', dId: discordId, data: guide})
  setSpinner(false)
  if(res?.status){
    setAlert({type: 'success', msg: 'Guide added for '+guide.name})
    return 1
  }else{
    setAlert({type: 'error', msg: 'Error adding guide for '+guide.name})
    return 0
  }

}
export default function AddGuide({opts = {}, array=[], updateGuideUnits}){
  const [ value, setValue ] = useState('')
  const { setAlert } = opts;
  function onChange(nameKey){
    setValue(nameKey)
  }
  function handleEvent(k){
    if(k.key === 'Enter') addGuide();
  }
  async function addGuide(){
    if(!value || value === '') return
    let baseId = value.toUpperCase().trim().replace(/ /g, '')
    if(array.filter(x=>x.value === baseId).length > 0){
      setAlert({type: 'error', msg: 'Guide for '+value+' already exists'})
      setValue('')
      return
    }
    let res = await updateGuides({name: value, value: baseId, descKey: value}, opts)
    setValue('')
    if(res) updateGuideUnits(true)
  }
  return (
    <TableRow>
      <TableCell>
        <TextField onKeyPress={(k)=>handleEvent(k)} onChange={(e)=>onChange(e.currentTarget.value)} value={value} label="New Guide" variant="outlined" />
      </TableCell>
      <TableCell align="left" colSpan="2">
        <Typography><Button variant="contained" onClick={addGuide}>Add</Button></Typography>
      </TableCell>
    </TableRow>
  )
}
