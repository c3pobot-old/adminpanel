import React, { Fragment, useEffect, useState } from 'react'
import { Button, TableBody, TableCell, TableRow, Typography} from '@mui/material';

import UnitRows from './unitRows'
import UnitModal from './unitModal'
import AddUnitModal from '../addModal'
import useUnitList from 'components/useUnitList'
import { AddUnit, DeleteUnit, UpdateUnit, UpdateUnitOrder } from './functions'
import { getReqString } from '../apiCalls'

export default function GuideUnits({opts={}, guideTemplate, setGuideTemplate, guideChanges, setGuideChanges}) {

  const [ unitList, refreshUnits ] = useUnitList(opts);
  const [ unitNameKeys, setUnitNameKeys ] = useState(null)
  const [ showUnits, setShowUnits ] = useState(true)
  const [ guideUnits, setGuideUnits ] = useState(guideTemplate?.units || [])

  const [ openEdit, setOpenEdit ] = useState(false)
  const [ openAdd, setOpenAdd ] = useState(false)

  const [ editUnit, setEditUnit ] = useState(null)

  const [ unitDefaults, setUnitDefaults ] = useState({rarity: 7, gp: 0, gear: {nameKey: 'G1', name: 'gear', value: 1}})

  useEffect(()=>{
    if(unitList?.length > 0) setUnitNameKeys(unitList.map(x=>x.nameKey))
  }, [unitList])
  useEffect(()=>{
    if(guideTemplate?.units) setGuideUnits(guideTemplate.units)
  }, [guideTemplate])

  function updateUnitOrder(list){
    UpdateUnitOrder(list, guideTemplate, setGuideTemplate, setGuideChanges)
  }
   function addUnit(id, nameKey){
    AddUnit(opts, unitList.find(x=>x.nameKey === nameKey?.trim()), unitDefaults, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function deleteUnit(unit){
    DeleteUnit(unit, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function modifyUnit(unit){
    setEditUnit(unit)
    setOpenEdit(true)
  }
  function saveUnit(req){
    if(!editUnit && !req) return
    if(editUnit?.nameKey){
      UpdateUnit({...editUnit,...req}, guideTemplate, setGuideTemplate, setGuideChanges)
    }else{
      setUnitDefaults(req)
    }
  }

  if(!guideTemplate) return null
  if(!unitNameKeys || unitNameKeys?.length === 0) return(
    <TableBody><TableRow><TableCell><Typography>Getting units from server</Typography></TableCell></TableRow></TableBody>
  )
  return (
    <Fragment>
        <TableBody>
          {openEdit && <UnitModal open={openEdit} setOpen={setOpenEdit} unit={editUnit} saveUnit={saveUnit} combatType={editUnit.combatType || 1} deleteUnit={deleteUnit}/>}
          {openAdd && unitNameKeys && <AddUnitModal open={openAdd} setOpen={setOpenAdd} list={unitNameKeys} refreshList={refreshUnits} addItem={addUnit} />}
          <TableRow>
            <TableCell width="56">&nbsp;</TableCell>
            <TableCell onClick={()=>setOpenAdd(true)}><Typography>{'Unit ('+guideTemplate?.units?.length+')'}</Typography></TableCell>
            <TableCell onClick={()=>modifyUnit(unitDefaults)}><Typography>{getReqString(unitDefaults)}</Typography></TableCell>
            <TableCell><Button variant="contained" onClick={()=>setShowUnits(showUnits ? false:true)}>{showUnits ? 'Hide':'Show'}</Button></TableCell>
          </TableRow>
        </TableBody>
        {showUnits && <UnitRows opts={opts} unitList={guideUnits} updateUnitOrder={updateUnitOrder} modifyUnit={modifyUnit} deleteUnit={deleteUnit} getReqString={getReqString}/>}
    </Fragment>
  )
}
