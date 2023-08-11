import React, { useEffect, useState } from "react"
import { Button, TableBody, TableCell, TableRow, Typography} from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function UnitRows({opts={}, unitList, updateUnitOrder, modifyUnit, deleteUnit, getReqString}){

  const [ units, setUnits ] = useState(unitList || []);

  useEffect(()=>{
    setUnits(unitList || [])
  }, [unitList])

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
      units,
      result.source.index,
      result.destination.index
    );
    setUnits(items)
    updateUnitOrder(items)
  }
  function Row ({unit, index}){
    return(
      <Draggable draggableId={index.toString()} index={index}>
        {(provided, snapshot) => (
            <TableRow  sx={snapshot.isDragging ? {bgcolor: "rowMain.bg"}:{}} ref={provided.innerRef} {...provided.draggableProps}>
              <TableCell {...provided.dragHandleProps}><ReorderIcon/></TableCell>
              <TableCell><Typography sx={snapshot.isDragging ? {color: "rowMain.text"}:{}}>{unit.nameKey}</Typography></TableCell>
              <TableCell onClick={()=>modifyUnit(unit)}><Typography>{getReqString(unit)}</Typography></TableCell>
              <TableCell><Button variant="contained" onClick={()=>deleteUnit(unit)}>Delete</Button></TableCell>
            </TableRow>
        )}
      </Draggable>
    )
  }
  if(units?.length === 0) return null
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot)=>(
          <TableBody {...provided.droppableProps} ref={provided.innerRef} >
            {units?.length > 0 && units?.map((unit, index)=>(
              <Row unit={unit} index={index} key={index} />
            ))}
            {units?.length > 0 && provided.placeholder}
          </TableBody>
        )}
      </Droppable>
    </DragDropContext>
  )
}
