import DB from 'components/db'

export function AddGroup(opts={}, newGroup = {}, ogTemplate = {}, setTemplate, setGuideChanges){
  const { setAlert } = opts;
  if(!ogTemplate.id || !newGroup.id) return;
  let template = JSON.parse(JSON.stringify(ogTemplate))
  if(!template.groups) template.groups = []
  if(template.groups.filter(x=>x.id === newGroup.id).length > 0){
    setAlert({type: 'error', msg: newGroup.id+' is already added to the guide'})
    return
  }
  delete newGroup.combatType
  newGroup.units = []
  template.groups.push(newGroup)
  template.change = {type: 'groupChange'}
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}
export function DeleteGroup(groupId, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.groups || ogTemplate.groups.length === 0) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  if(template){
    template.groups = template.groups.filter(x=>x.id !== groupId)
    DB.set('guide-'+template.id, template)
    setTemplate(template)
    setGuideChanges(true)
  }
}
export function UpdateGroup(group, ogTemplate={}, setTemplate, setGuideChanges){
  if(!group?.id && !ogTemplate.groups) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let groupIndex = template.groups.findIndex(x=>x.id === group.id)
  if(groupIndex >= 0){
    template.groups[groupIndex] = JSON.parse(JSON.stringify(group))
    DB.set('guide-'+template.id, template)
    setTemplate(template)
    setGuideChanges(true)
  }
}
export function UpdateGroupOrder(groups = [], ogTemplate = {}, setTemplate, setGuideChanges){
  if(groups.length === 0 || !ogTemplate.groups) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  template.groups = groups
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}
export function AddUnit(opts = {}, newUnit, groupDefaults, groupId, ogTemplate={}, setTemplate, setGuideChanges){
  if(!ogTemplate.groups || !newUnit) return
  let unit = JSON.parse(JSON.stringify(newUnit))
  unit = {...unit,...groupDefaults}
  const { setAlert } = opts;
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let groupIndex = template.groups.findIndex(x=>x.id === groupId)
  if(groupIndex >= 0){
    if(template.groups[groupIndex].units.filter(x=>x.baseId === unit.baseId).length > 0){
      setAlert({type: 'error', msg: unit.nameKey+' is already in group '+template.groups[groupIndex].id})
      return
    }
    delete unit.numUnits
    template.groups[groupIndex].units.push(unit)
    DB.set('guide-'+template.id, template)
    setTemplate(template)
    setGuideChanges(true)
  }
}
export function DeleteUnit(unit, groupId, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!unit) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let groupIndex = template.groups.findIndex(x=>x.id === groupId)
  if(groupIndex >= 0){
    template.groups[groupIndex].units = template.groups[groupIndex].units.filter(x=>x.baseId !== unit.baseId)
    DB.set('guide-'+template.id, template)
    setTemplate(template)
    setGuideChanges(true)
  }
}
export function UpdateUnit(unit, groupId, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.groups) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let groupIndex = template.groups.findIndex(x=>x.id === groupId)
  if(groupIndex >= 0){
    let unitIndex = template.groups[groupIndex].units?.findIndex(x=>x.baseId === unit.baseId)
    if(unitIndex >= 0){
      template.groups[groupIndex].units[unitIndex] = JSON.parse(JSON.stringify(unit))
      DB.set('guide-'+template.id, template)
      setTemplate(template)
      setGuideChanges(true)
    }
  }
}
export function UpdateUnitOrder(units = [], groupId, ogTemplate = {}, setTemplate, setGuideChanges){
  if(units.length === 0 || !ogTemplate.groups) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let groupIndex = template.groups.findIndex(x=>x.id === groupId)
  if(groupIndex >= 0){
    template.groups[groupIndex].units = units
    DB.set('guide-'+template.id, template)
    setTemplate(template)
    setGuideChanges(true)
  }
}
