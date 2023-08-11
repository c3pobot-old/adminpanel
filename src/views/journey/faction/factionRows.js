import React, { useEffect, useState } from "react"
import { Button, TableBody, TableCell, TableRow, Typography} from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function FactionRows({opts={}, factionList, updateFactionOrder, modifyFaction, deleteFaction, getReqString}){

  const [ factions, setFactions ] = useState(factionList || []);

  useEffect(()=>{
    setFactions(factionList || [])
  }, [factionList])

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      factions,
      result.source.index,
      result.destination.index
    );
    setFactions(items)
    updateFactionOrder(items)
  }
  function Row ({faction, index}){
    return(
      <Draggable draggableId={index.toString()} index={index}>
        {(provided, snapshot) => (
            <TableRow  sx={snapshot.isDragging ? {bgcolor: "rowMain.bg"}:{}} ref={provided.innerRef} {...provided.draggableProps}>
              <TableCell {...provided.dragHandleProps} width='25'><ReorderIcon/></TableCell>
              <TableCell><Typography sx={snapshot.isDragging ? {color: "rowMain.text"}:{}}>{faction?.nameKey}</Typography></TableCell>
              <TableCell onClick={()=>modifyFaction(faction)}><Typography>{getReqString(faction)+' / C'+faction?.combatType}</Typography></TableCell>
              <TableCell><Button variant="contained" onClick={()=>deleteFaction(faction)}>Delete</Button></TableCell>
            </TableRow>
        )}
      </Draggable>
    )
  }
  if(factions?.length === 0) return null
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot)=>(
          <TableBody {...provided.droppableProps} ref={provided.innerRef} >
            {factions?.length > 0 && factions?.map((faction, index)=>(
              <Row faction={faction} index={index} key={index} />
            ))}
            {factions?.length > 0 && provided.placeholder}
          </TableBody>
        )}
      </Droppable>
    </DragDropContext>
  )
}
