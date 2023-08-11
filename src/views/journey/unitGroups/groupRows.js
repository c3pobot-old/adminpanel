import React, { useEffect, useState } from "react"
import { Button, TableBody, TableCell, TableRow, Typography} from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function GroupRows({opts={}, groupList, updateGroupOrder, modifyGroup, deleteGroup, getReqString, addUnit}){

  const [ groups, setGroups ] = useState(groupList || []);

  useEffect(()=>{
    setGroups(groupList || [])
  }, [groupList])

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
      groups,
      result.source.index,
      result.destination.index
    );
    setGroups(items)
    updateGroupOrder(items)
  }
  function Row ({group, index}){
    return(
      <Draggable draggableId={index.toString()} index={index}>
        {(provided, snapshot) => (
            <TableRow  sx={snapshot.isDragging ? {bgcolor: "rowMain.bg"}:{}} ref={provided.innerRef} {...provided.draggableProps}>
              <TableCell {...provided.dragHandleProps} width='25'><ReorderIcon/></TableCell>
              <TableCell onClick={()=>addUnit(group)}><Typography sx={snapshot.isDragging ? {color: "rowMain.text"}:{}}>{group?.id+' ('+(group?.units?.length || 0)+')'}</Typography></TableCell>
              <TableCell onClick={()=>modifyGroup(group)}><Typography>{getReqString(group)}</Typography></TableCell>
              <TableCell><Button variant="contained" onClick={()=>deleteGroup(group.id)}>Delete</Button></TableCell>
            </TableRow>
        )}
      </Draggable>
    )
  }
  if(groups?.length === 0) return null
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot)=>(
          <TableBody {...provided.droppableProps} ref={provided.innerRef} >
            {groups?.length > 0 && groups?.map((group, index)=>(
              <Row group={group} index={index} key={index} />
            ))}
            {groups?.length > 0 && provided.placeholder}
          </TableBody>
        )}
      </Droppable>
    </DragDropContext>
  )
}
