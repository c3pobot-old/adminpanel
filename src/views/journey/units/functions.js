import DB from 'components/db'
export function AddUnit(opts={}, newUnit, unitDefaults = {}, ogTemplate = {}, setTemplate, setGuideChanges){
  const { setAlert } = opts;
  if(!ogTemplate.id) return;
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let unit = JSON.parse(JSON.stringify(newUnit))
  unit = {...unit,...unitDefaults}
  if(!template.units) template.units = []
  if(template.units.filter(x=>x.baseId === unit.baseId).length > 0){
    setAlert({type: 'error', msg: unit.nameKey+' is already added to the guide'})
    return
  }
  template.units.push(unit)
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}

export function DeleteUnit(unit, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.units) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  template.units = template.units.filter(x=>x.baseId !== unit.baseId)
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}

export function UpdateUnit(unit, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.units) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let unitIndex = template.units.findIndex(x=>x.baseId === unit?.baseId)
  if(unitIndex >= 0){
    template.units[unitIndex] = JSON.parse(JSON.stringify(unit))
    DB.set('guide-'+template.id, template)
    setTemplate(template)
    setGuideChanges(true)
  }
}
export function UpdateUnitOrder(units = [], ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.units && units.length === 0) return;
  let template = JSON.parse(JSON.stringify(ogTemplate))
  template.units = units
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}
