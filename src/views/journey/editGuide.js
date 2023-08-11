import React from 'react'
import { Button, TableContainer, TableBody, TableRow, TableCell, Table, Typography } from '@mui/material';

import GuideUnits from './units'
import GuideFactions from './faction'
import GuideGroups from './unitGroups'
import useLocalStorage from 'components/useLocalStorage'

import { getGuideTemplate, removeGuide, saveGuideToMongo } from './apiCalls'

export default function EditGuide({opts={}, setGuideTemplate, guideTemplate}){
    const { setAlert } = opts;
    const [ guideChanges, setGuideChanges ] = useLocalStorage('guideChanges', false)
    async function goBack(){
      if(guideChanges){
        setAlert({type: 'error', msg: 'Please save or discard changes to the template first'})
      }else{
        await removeGuide(opts, guideTemplate?.id)
        setGuideTemplate(null)
      }
    }
    async function refreshGuide(){
      let res = await getGuideTemplate(opts, {id: guideTemplate.id, name: guideTemplate.name}, true)
      if(res?.id){
        setAlert({type: 'success', msg: ''+guideTemplate.name+' have been updated from mongo'})
        setGuideChanges(false)
        setGuideTemplate(res)
      }
    }
    async function saveChanges(){
      let res = await saveGuideToMongo(opts, guideTemplate)
      if(res?.id){
        setGuideChanges(false)
        setGuideTemplate(res)
      }
    }
    async function discardChanges(){
      if(!guideTemplate?.id) return
      let res = await getGuideTemplate(opts, {id: guideTemplate.id, name: guideTemplate.name}, true)
      if(res?.id){
        setAlert({type: 'success', msg: 'changes to '+guideTemplate.name+' have been discarded'})
        setGuideChanges(false)
        setGuideTemplate(res)
      }
    }
    return (
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><Typography>{guideTemplate?.name+' Journey Guide Requirements'}</Typography></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableBody>
          <TableRow>
            <TableCell width="56">&nbsp;</TableCell>
            <TableCell textalign="center"><Button variant="contained" onClick={goBack}>Go Back</Button></TableCell>
            <TableCell textalign="center">{guideChanges && <Button variant="contained" onClick={discardChanges}>Discard</Button>}</TableCell>
            <TableCell textalign="center">{guideChanges ? <Button variant="contained" onClick={saveChanges}>Save</Button>:<Button variant="contained" onClick={refreshGuide}>Refresh</Button>}</TableCell>
          </TableRow>
          </TableBody>
          <GuideUnits opts={opts} guideTemplate={guideTemplate} setGuideTemplate={setGuideTemplate} guideChanges={guideChanges} setGuideChanges={setGuideChanges}/>
          <GuideFactions opts={opts} guideTemplate={guideTemplate} setGuideTemplate={setGuideTemplate} guideChanges={guideChanges} setGuideChanges={setGuideChanges}/>
          <GuideGroups opts={opts} guideTemplate={guideTemplate} setGuideTemplate={setGuideTemplate} guideChanges={guideChanges} setGuideChanges={setGuideChanges}/>
        </Table>
      </TableContainer>
    )
}
