import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow, Typography} from '@mui/material';

export default function DropZone ({ opts = {}, oldImg, newImg, handleFile}){
  const [ imgSrc, setImgSrc ] = useState(oldImg)
  useEffect(()=>{
    if(newImg){
      setImgSrc(newImg)
    }else{
      setImgSrc(oldImg)
    }
  }, [newImg, oldImg])
  const dragOver = (e) => {
    e.preventDefault();
  }
  const dragEnter = (e) => {
      e.preventDefault();
  }
  const dragLeave = (e) => {
      e.preventDefault();
  }
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files?.length === 1) {
      handleFile(files[0]);
    }
  }

  return (
    <Table>
    <TableBody onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop}>
      <TableRow><TableCell><Typography align="center">Drag & Drop new Image here</Typography></TableCell></TableRow>
      <TableRow><TableCell align="center"><img src={imgSrc} width="500px" alt=""/></TableCell></TableRow>
    </TableBody>
    </Table>
  )
}
