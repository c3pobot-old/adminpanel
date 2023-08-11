//React
import React, { useState } from 'react';
import { Autocomplete, Button, Modal, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function EditModal ({open, setOpen, list = [], refreshList, addItem, desc, id}){

  const [ value, setValue ] = useState(null)

  function handleEvent(k){
    if(k.key === 'Enter') selectItem();
  }
  function selectItem(){
    if(addItem && addItem){
      addItem(id, value)
      setValue(null)
    }
  }
  function handleClose(){
    setOpen(false)
  }
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <TableContainer sx={style}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan="3">
            <Autocomplete align="center" value={value} options={list} onKeyPress={(k)=>handleEvent(k)} onChange={(_, data) => setValue(data)} renderInput={(params)=><TextField {...params} label={desc || 'Unit'} variant="outlined"/>}/>
            </TableCell>

          </TableRow>
          <TableRow>
          <TableCell align="center"><Button variant="contained" onClick={selectItem}>Add</Button></TableCell>
          <TableCell align="center"><Button variant="contained" onClick={()=>setOpen(false)}>Close</Button></TableCell>
          <TableCell align="center"><Button variant="contained" onClick={()=>refreshList(true)}>Refresh</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
    </Modal>
  )
}
