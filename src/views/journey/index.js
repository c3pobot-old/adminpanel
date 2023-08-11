import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import ButtonNav from 'components/buttonNav'
import { getGuideTemplate, refreshGuideUnits, getStoredJourneyGuides, getJourneyGuides } from './apiCalls'
import useLocalStorage from 'components/useLocalStorage'
import EditGuide from './editGuide'
import GuideSearch from './guideSearch'
import AddGuide from './addGuide'

export default function JourneyGuide(opts = {}) {
  const { discordId } = opts;
  const [ guideUnits, setGuideUnits ] = useState(null)
  const [ guides, setGuides ] = useState([])
  const [ guideTemplate, setGuideTemplate ] = useLocalStorage('guideTemplate', null)

  useEffect(()=>{
    if(!guideUnits) updateGuideUnits()
    getGuidesFromDB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(()=>{
    if(!guideTemplate) getStoredGuides()
  },[guideTemplate])
  if(!discordId){
    localStorage.setItem('startUrl', window.location.href)
    ButtonNav('/discord/login')
  }
  async function getGuidesFromDB(){
    let res = await getJourneyGuides(opts)
    if(res?.length > 0) setGuides(res)
  }
  async function getStoredGuides(){
    let res = await getStoredJourneyGuides(opts)
    if(res?.length > 0) setGuides(res)
  }
  async function updateGuideUnits(force = false){
    let res = await refreshGuideUnits(opts, force)
    if(res?.length > 0) await setGuideUnits(res)
  }
  async function selectGuideTemplate(unit){
    let res = await getGuideTemplate(opts, unit)
    if(res) setGuideTemplate(res)
  }
  function selectGuide(nameKey){
    let unit = guideUnits?.find(x=>x.name === nameKey?.trim())
    if(unit) selectGuideTemplate(unit)
  }
  if(!guideUnits || guideUnits?.length === 0) return null
  if(guideTemplate) return (
    <EditGuide opts={opts} guideTemplate={guideTemplate} setGuideTemplate={setGuideTemplate}/>
  )
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <GuideSearch array={guideUnits?.map(x=>x.name)} refreshUnits={updateGuideUnits} selectGuide={selectGuide} />
          <AddGuide array={guideUnits} updateGuideUnits={updateGuideUnits} opts={opts} />
          {guideUnits?.length > 0 && guideUnits.map((unit, index)=>(
            <TableRow key={index}>
              <TableCell onClick={()=>selectGuideTemplate(unit)}><Typography>{unit.name}</Typography></TableCell>
              <TableCell colSpan="2">{guides.filter(x=>x === unit.value).length > 0 ? <CheckBoxIcon />:<Typography>&nbsp;</Typography>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
