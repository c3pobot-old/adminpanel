import React, { Fragment, useEffect, useState } from 'react'
import { Button, TableBody, TableCell, TableRow, Typography} from '@mui/material';

import AddFactionModal from '../addModal'
import FactionModal from './factionModal'
import FactionRows from './factionRows'
import { AddFaction, DeleteFaction, UpdateFaction, UpdateFactionOrder } from './functions'
import { getReqString, refreshFactionList } from '../apiCalls'

export default function GuideFaction({opts={}, guideTemplate, setGuideTemplate, guideChanges, setGuideChanges}){

  const [ factionList, setFactionList ] = useState(null)
  const [ factionNameKeys, setFactionNameKeys ] = useState(null)
  const [ showFactions, setShowFactions ] = useState(true)
  const [ guideFactions, setGuidFactions ] = useState(guideTemplate?.factions || [])

  const [ openEdit, setOpenEdit ] = useState(false)
  const [ openAdd, setOpenAdd ] = useState(false)

  const [ editFaction, setEditFaction ] = useState(null)

  const [ factionDefaults, setFactionDefaults ] = useState({rarity: 7, gp: 0, combatType: 1, numUnits: 5, gear: {nameKey: 'G1', name: 'gear', value: 1}})

  useEffect(()=>{
    if(!factionList) getFactionList(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(()=>{
    if(factionList?.length > 0) setFactionNameKeys(factionList.map(x=>x.nameKey))
  }, [factionList])
  useEffect(()=>{
    if(guideTemplate?.factions) setGuidFactions(guideTemplate.factions)
  }, [guideTemplate])

  async function getFactionList(force=false){
    let res = await refreshFactionList(opts, force)
    if(res) setFactionList(res)
  }
  function updateFactionOrder(list){
    UpdateFactionOrder(list, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  async function addFaction(id, nameKey){
    AddFaction(opts, factionList.find(x=>x.nameKey === nameKey?.trim()), factionDefaults, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function deleteFaction(faction){
    DeleteFaction(faction, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function saveFaction(req){
    if(!editFaction && req) return
    if(editFaction?.nameKey){
      UpdateFaction({...editFaction,...req}, guideTemplate, setGuideTemplate, setGuideChanges)
    }else{
      setFactionDefaults(req)
    }
  }
  function modifyFaction(faction){
    setEditFaction(faction)
    setOpenEdit(true)
  }
  return (
    <Fragment>
      <TableBody>
        {openEdit && <FactionModal open={openEdit} setOpen={setOpenEdit} faction={editFaction} saveFaction={saveFaction} deleteFaction={deleteFaction}/>}
        {openAdd && factionNameKeys && <AddFactionModal open={openAdd} setOpen={setOpenAdd} list={factionNameKeys} refreshList={setFactionList} addItem={addFaction} desc={'Faction'}/>}
        <TableRow>
          <TableCell width="56">&nbsp;</TableCell>
          <TableCell onClick={()=>setOpenAdd(true)}><Typography>{'Faction ('+guideTemplate?.factions?.length+')'}</Typography></TableCell>
          <TableCell onClick={()=>modifyFaction(factionDefaults)}><Typography>{getReqString(factionDefaults)+' / C'+factionDefaults?.combatType}</Typography></TableCell>
          <TableCell><Button variant="contained" onClick={()=>setShowFactions(showFactions ? false:true)}>{showFactions ? 'Hide':'Show'}</Button></TableCell>
        </TableRow>
      </TableBody>
      {showFactions && <FactionRows opts={opts} factionList={guideFactions} updateFactionOrder={updateFactionOrder} modifyFaction={modifyFaction} deleteFaction={deleteFaction} getReqString={getReqString}/>}
    </Fragment>
  )
}
