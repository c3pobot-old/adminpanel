import DB from 'components/db'

export function AddFaction(opts={}, newFaction, factionDefaults = {}, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.id && !newFaction) return;
  const { setAlert } = opts;
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let faction = JSON.parse(JSON.stringify(newFaction))
  faction = {...faction,...factionDefaults}
  if(!template.factions) template.factions = []
  if(template.factions.filter(x=>x.baseId === faction.baseId).length > 0){
    setAlert({type: 'error', msg: faction.nameKey+' is already added to the guide'})
    return
  }
  template.factions.push(faction)
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}
export async function DeleteFaction(faction, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.factions) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  template.factions = template.factions.filter(x=>x.baseId !== faction?.baseId)
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}
export async function UpdateFaction(faction, ogTemplate = {}, setTemplate, setGuideChanges){
  if(!ogTemplate.factions && !faction) return
  console.log(faction)
  let template = JSON.parse(JSON.stringify(ogTemplate))
  let factionIndex = template.factions.findIndex(x=>x.baseId === faction?.baseId)
  if(factionIndex >= 0){
    template.factions[factionIndex] = JSON.parse(JSON.stringify(faction))
    DB.set('guide-'+template.id, template)
    setTemplate(template)
    setGuideChanges(true)
  }
}
export function UpdateFactionOrder(factions = [], ogTemplate, setTemplate, setGuideChanges){
  if(!ogTemplate.factions && factions.length === 0) return;
  let template = JSON.parse(JSON.stringify(ogTemplate))
  template.factions = factions
  DB.set('guide-'+template.id, template)
  setTemplate(template)
  setGuideChanges(true)
}
