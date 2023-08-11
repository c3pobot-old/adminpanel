//React
import React from 'react';
import { Modal, TableContainer } from '@mui/material';

import URLFile from './urlFile'
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

export default function UrlModal ({open, setOpen, handleFile}){
  function handleClose(){
    setOpen(false)
  }
  function handlePreviewClick (url){
    setOpen(false);
    handleFile(url)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <TableContainer sx={style}>
      <URLFile desc="URL to image" action="preview" onSubmit={handlePreviewClick} />
    </TableContainer>
    </Modal>
  )
}
