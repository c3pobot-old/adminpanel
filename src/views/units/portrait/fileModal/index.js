//React
import React from 'react';
import { Modal, TableContainer } from '@mui/material';

import SelectFile from './selectFile'
//
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FileModal ({open, setOpen, handleFile}){
  function handleClose(){
    setOpen(false)
  }
  function handlePreviewClick (file){
    setOpen(false);
    handleFile(file)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <TableContainer sx={style}>
      <SelectFile desc="Select new image" action="preview" onSubmit={handlePreviewClick} />
    </TableContainer>
    </Modal>
  )
}
