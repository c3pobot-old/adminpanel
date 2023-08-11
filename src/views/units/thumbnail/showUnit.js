import React, { Fragment, useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableRow, Typography} from '@mui/material';

import GetImgFromGame from 'components/units/getImgFromGame'
import UpdateUnit from 'components/units/updateUnit'
import { GetImageFromURL, GetMeta, ResizeImg } from '../processFile'

export default function ShowUnit(opts = {}){
  const { setUnit, unit } = opts;
  const [ newImg, setNewImg ] = useState(null);
  const [ oldImg, setOldImg ] = useState()
  const [ imgSrc, setImgSrc ] = useState(oldImg)
  useEffect(()=>{
    if(newImg){
      setImgSrc(newImg)
    }else{
      setImgSrc(oldImg)
    }
  }, [newImg, oldImg])

  useEffect(()=>{
    setNewImg(null)
    if(unit.thumbnailName) getCurrentImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])

  async function getImgFromGame(){
    if(unit?.thumbnailName){
      let img = await GetImgFromGame(opts, unit.thumbnailName)
      if(img) setNewImg('data:image/png;base64,'+img)
    }
  }

  async function getCurrentImg(){
    let img = await GetImageFromURL('/thumbnail/'+unit.thumbnailName+'.png')
    if(img) setOldImg(img);

  }

  async function saveImage(){
    if(newImg && unit?.baseId){
      const tempUnit = JSON.parse(JSON.stringify(unit))
      const status = await UpdateUnit(opts, unit.thumbnailName, newImg, 'thumbnail')
      if(status){
        setNewImg(null)
        setUnit(null)
        setUnit(tempUnit)
      }
    }
  }
  return (
    <Fragment>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="center"><Button variant="contained" onClick={()=>getImgFromGame()}>Get From Game</Button></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={()=>saveImage()}>Save</Button></TableCell>
          </TableRow>
          <TableRow><TableCell colSpan="2"><Typography align="center">{unit.nameKey}</Typography></TableCell></TableRow>
          {unit?.thumbnailName && <TableRow><TableCell align="center" colSpan="2"><img src={ imgSrc } width="500px" alt=""/></TableCell></TableRow>}
        </TableBody>
      </Table>

    </Fragment>
  )
}
