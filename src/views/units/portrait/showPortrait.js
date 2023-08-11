import React, { Fragment, useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableRow, Typography} from '@mui/material';

import GetImgFromGame from 'components/units/getImgFromGame'
import DropZone from './dropZone'
import FileModal from './fileModal'
import { GetImageFromURL, GetMeta, ResizeImg, ValidateFile } from '../processFile'
import UpdateUnit from 'components/units/updateUnit'
import URLModal from './urlModal'

export default function ShowPortrait(opts = {}){
  const { setSpinner, setUnit, unit } = opts;
  const [ openFileModal, setFileModal ] = useState(false);
  const [ openUrlModal, setUrlModal ] = useState(false);
  const [ newImg, setNewImg ] = useState(null);
  const [ oldImg, setOldImg ] = useState()
  useEffect(()=>{
    setNewImg(null)
    if(unit.thumbnailName) getCurrentImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])
  async function handleFile(file){
    setSpinner(true)
    if(ValidateFile(file)){
      const meta = await GetMeta(URL.createObjectURL(file))
      let width = 1000
      if(meta?.width < 1000) width = +meta.width
      file = await ResizeImg(file, width);
      setNewImg(file);
    }
    setSpinner(false)
  }
  async function handleUrl(url){
    if(!url) return
    let img = await GetImageFromURL(url)
    if(img) setNewImg(img);
  }
  async function getCurrentImg(){
    console.log(unit.thumbnailName)
    let img = await GetImageFromURL('/portrait/'+unit.thumbnailName+'.png')
    if(img) setOldImg(img);
  }
  async function getImgFromGame(){
    if(unit?.thumbnailName){
      let img = await GetImgFromGame(opts, unit.thumbnailName)
      if(img) setNewImg('data:image/png;base64,'+img)
    }
  }
  async function saveImage(){
    if(newImg && unit?.baseId){
      const tempUnit = JSON.parse(JSON.stringify(unit))
      const status = await UpdateUnit(opts, unit.thumbnailName, newImg, 'portrait')
      if(status){
        setNewImg(null)
        setUnit(null)
        setUnit(tempUnit)
      }
    }
  }
  return (
    <Fragment>
      {openFileModal && <FileModal open={openFileModal} setOpen={setFileModal} handleFile={handleFile} />}
      {openUrlModal && <URLModal open={openUrlModal} setOpen={setUrlModal} handleFile={handleUrl}/>}
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="center"><Button variant="contained" onClick={()=>getImgFromGame()}>Get From Game</Button></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={()=>setFileModal(true)}>File</Button></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={()=>setUrlModal(true)}>URL</Button></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={()=>saveImage()}>Save</Button></TableCell>
          </TableRow>
          <TableRow><TableCell colSpan="4"><Typography align="center">{unit.nameKey}</Typography></TableCell></TableRow>
        </TableBody>
      </Table>
      {unit.thumbnailName && <DropZone opts={opts} oldImg={oldImg} newImg={newImg} handleFile={handleFile}/>}
    </Fragment>
  )
}
