import React, { Fragment, useEffect, useState } from 'react'

import { Button, TableBody, TableCell, TableRow, Typography} from '@mui/material';

import { AddGroup, DeleteGroup, UpdateGroup, UpdateGroupOrder, AddUnit, DeleteUnit, UpdateUnit, UpdateUnitOrder } from './functions'
import { getReqString } from '../apiCalls'
import AddUnitModal from '../addModal'
import GroupModal from './groupModal'
import PlainTextField from './plainTextField'
import GroupRows from './groupRows'
import UnitRows from './unitRows'
import useUnitList from 'components/useUnitList'
import UnitModal from '../units/unitModal'

export default function UnitGroups({opts={}, guideTemplate, setGuideTemplate, guideChanges, setGuideChanges}){

  const [ unitList, refreshUnits ] = useUnitList(opts);
  const [ unitNameKeys, setUnitNameKeys ] = useState(null)
  const [ showUnits, setShowUnits ] = useState(true)

  const [ openEditGroup, setOpenEditGroup ] = useState(false)
  const [ openEditUnit, setOpenEditUnit ] = useState(false)
  const [ openAddUnit, setOpenAddUnit ] = useState(false)

  const [ editGroup, setEditGroup ] = useState(null)
  const [ editUnit, setEditUnit ] = useState(null)

  const [ groupDefaults, setGroupDefaults ] = useState({rarity: 7, gp: 0, numUnits: 4, gear: {nameKey: 'G1', name: 'gear', value: 1}})

  useEffect(()=>{
    if(unitList?.length > 0) setUnitNameKeys(unitList.map(x=>x.nameKey))
  }, [unitList])

  function updateGroupOrder(list){
    UpdateGroupOrder(list, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function updateUnitOrder(id, list){
    UpdateUnitOrder(list, id, guideTemplate, setGuideTemplate, setGuideChanges)
  }


  function addGroup(name){
    AddGroup(opts, {...{id: name?.toLowerCase()?.trim()},...groupDefaults}, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  async function deleteGroup(id){
    DeleteGroup(id, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function modifyGroup(group){
    setEditGroup(group)
    setOpenEditGroup(true)
  }
  function saveGroup(req) {
    if(!editGroup && !req) return
    if(editGroup?.id){
      UpdateGroup({...editGroup,...req}, guideTemplate, setGuideTemplate, setGuideChanges)
    }else{
      setGroupDefaults(req)
    }
  }
  function setAddUnit(group){
    setEditGroup(group)
    setOpenAddUnit(true)
  }
  function addUnit(id, nameKey){
    AddUnit(opts, unitList.find(x=>x.nameKey === nameKey?.trim()), {rarity: editGroup?.rarity || groupDefaults.rarity, gear: editGroup?.gear|| groupDefaults.gear, gp: editGroup?.gp || groupDefaults.gp}, id, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function deleteUnit(id, unit){
    DeleteUnit(unit, id, guideTemplate, setGuideTemplate, setGuideChanges)
  }
  function modifyUnit(id, unit){
    setEditUnit({groupId: id, unit: unit})
    setOpenEditUnit(true)
  }
  async function saveUnit(req){
    if(!editUnit?.unit && !editUnit?.groupId && !req) return
    if(editUnit?.unit?.nameKey){
      UpdateUnit({...editUnit?.unit,...req}, editUnit?.groupId, guideTemplate, setGuideTemplate, setGuideChanges)
    }else{
      updateDefaults(editUnit.groupId, req)
    }
  }
  function updateDefaults(id, req){
    if(id === 'default'){
      setGroupDefaults(req)
    }else{
      updateGroupDefaults(id, req)
    }
  }
  function updateGroupDefaults(id, req){
    if(!guideTemplate?.groups) return
    let template = JSON.parse(JSON.stringify(guideTemplate))
    let groupIndex = template.groups.findIndex(x=>x.id === id)
    if(groupIndex >= 0){
      template.groups[groupIndex] = {...template.groups[groupIndex], req}
    }
  }
  return(
    <Fragment>
      <TableBody>
        <PlainTextField desc={'New Group'} onSubmit={addGroup} action={'Add'} />
        {openEditUnit && <UnitModal open={openEditUnit} setOpen={setOpenEditUnit} unit={editUnit?.unit} saveUnit={saveUnit} combatType={editUnit.combatType || 1} deleteUnit={deleteUnit}/>}
        {openAddUnit && unitNameKeys && <AddUnitModal open={openAddUnit} setOpen={setOpenAddUnit} list={unitNameKeys} refreshList={refreshUnits} addItem={addUnit} id={editGroup.id}/>}
        {openEditGroup && <GroupModal open={openEditGroup} setOpen={setOpenEditGroup} saveGroup={saveGroup} group={editGroup}/>}
        <TableRow>
          <TableCell width='25'>&nbsp;</TableCell>
          <TableCell><Typography>{'Group ('+(guideTemplate?.groups?.length || 0)+')'}</Typography></TableCell>
          <TableCell onClick={()=>modifyGroup(groupDefaults)}><Typography>{getReqString(groupDefaults)}</Typography></TableCell>
          <TableCell><Button variant="contained" onClick={()=>setShowUnits(showUnits ? false:true)}>{showUnits ? 'Hide':'Show'}</Button></TableCell>
        </TableRow>
      </TableBody>
      {!showUnits && <GroupRows opts={opts} groupList={guideTemplate.groups} updateGroupOrder={updateGroupOrder} modifyGroup={modifyGroup} deleteGroup={deleteGroup} getReqString={getReqString} addUnit={setAddUnit}/>}
      {showUnits && guideTemplate?.groups?.length > 0 && guideTemplate.groups.map((group, index)=>(
        <Fragment key={index}>
          <TableBody key={index}>
            <TableRow>
              <TableCell width='56'><Typography>&nbsp;</Typography></TableCell>
              <TableCell onClick={()=>setAddUnit(group)}><Typography>{group?.id+' ('+(group?.units?.length || 0)+')'}</Typography></TableCell>
              <TableCell onClick={()=>modifyGroup(group)}><Typography>{getReqString(group)}</Typography></TableCell>
              <TableCell><Button variant="contained" onClick={()=>deleteGroup(group.id)}>Delete</Button></TableCell>
            </TableRow>
          </TableBody>
          <UnitRows opts={opts} group={group} updateUnitOrder={updateUnitOrder} modifyUnit={modifyUnit} deleteUnit={deleteUnit} getReqString={getReqString}/>
        </Fragment>
      ))}
    </Fragment>
  )
}
