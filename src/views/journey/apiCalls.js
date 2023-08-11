import ApiRequest from 'components/apiRequest'
import DB from 'components/db'

export async function refreshGuideUnits(opts={}, force = false){
  const { discordId, setSpinner } = opts;
  let res
  if(!force) res = await DB.get('guideUnits')
  if(!res){
    setSpinner(true)
    let obj = await ApiRequest({method: 'mongo', dId: discordId, data: {method: 'get', collection: 'autoComplete', query: {_id: 'journey'}}})
    if(obj[0]?.data){
      await DB.set('guideUnits', obj[0].data)
      res = obj[0].data
    }
    setSpinner(false)
  }
  return res
}
export async function getJourneyGuides(opts={}){
  const { discordId, setSpinner } = opts;
  let res = []
  setSpinner(true)
  let guides = await ApiRequest({method: 'mongo', dId: discordId, data: {method: 'get', collection: 'guideTemplates', query: {}, projection: {_id: 0, TTL: 0}}})
  if(guides?.length > 0){
    for(let i in guides){
      res.push(guides[i].id)
      let exists = await DB.get('guide-'+guides[i].id)
      if(!exists) DB.set('guide-'+guides[i].id, guides[i])
    }
  }
  setSpinner(false)
  return res
}
export async function getStoredJourneyGuides(opts={}){
  const { setSpinner } = opts;
  setSpinner(true)
  let guides = await DB.getMany('id', 'guide-')
  setSpinner(false)
  return guides.map(x=>x?.id?.split('-')[1])
}
export async function getGuideTemplate(opts={}, unit={}, force=false){
  const { discordId, setSpinner } = opts;
  let id = unit.id
  if(!id && unit.value) id = unit.value
  if(!id) return
  let res
  if(!force) res = await DB.get('guide-'+id)
  if(!res){
    setSpinner(true)
    let obj = await ApiRequest({method: 'mongo', dId: discordId, data: {method: 'get', collection: 'guideTemplates', query: {_id: id}}})
    if(obj?.length) res = obj[0]
    if(!res) res = {id: id, name: unit.name, factions: [], units: [], groups: [], descKey: unit.descKey}
    if(res) await DB.set('guide-'+id, res)
    setSpinner(false)
  }
  return res
}

export async function saveGuideTemplate(opts={}, template = {}){
  if(!template.id) return
  DB.set('guide-'+template.id, template)
}
export async function saveGuideToMongo(opts={}, ogTemplate = {}){
  const { setSpinner, discordId, setAlert } = opts;
  if(!ogTemplate.id) return
  let template = JSON.parse(JSON.stringify(ogTemplate))
  if(!template) return
  setSpinner(true)
  delete template.change
  delete template._id
  let res = await ApiRequest({method: 'mongo', dId: discordId, data: {method: 'set', collection: 'guideTemplates', query: {_id: template.id}, payload: template}})
  setSpinner(false)
  if(res === true){
    setAlert({type: 'success', msg: template.name+' saved to mongo...'})
    DB.set('guide-'+template.id, template)
    return template
  }else{
    setAlert({type: 'error', msg: 'Error saving '+template.name+' to mongo...'})
  }
}


export async function refreshFactionList(opts={}, force=false){
  const { setSpinner, discordId } = opts;
  let res
  if(!force) res = await DB.get('factionList')

  if(!res){
    setSpinner(true)
    res = await ApiRequest({method: 'mongo', dId: discordId, data: {method: 'get', collection: 'factions', query: {}, projection: {_id: 0, baseId: 1, nameKey: 1, units: 1}}});
    if(res?.length > 0) DB.set('factionList', res)
    setSpinner(false)
  }
  return res
}

export function getReqString(obj = {}){
  let str = '', count = 0
  if(obj.rarity > 1){
    str += obj.rarity+'*'
    count++
  }
  if(obj.gear?.value > 1 && obj.combatType !== 2){
    if(count > 0) str += ' / '
    str += obj.gear.nameKey
    count++
  }
  if(obj?.gp > 0){
    if(count > 0) str += ' / '
    str += (obj.gp / 1000).toFixed(1)+'K'
    count++
  }
  if(obj.numUnits){
    if(count > 0) str += ' / '
    str += '#'+obj.numUnits
    count++
  }
  return str
}
export async function removeGuide(opts, id){
  const { discordId, setSpinner } = opts;
  setSpinner(true)
  await DB.del('guide-'+id)
  let guide = await ApiRequest({method: 'mongo', dId: discordId, data: {method: 'get', collection: 'guideTemplates', query: {_id: id}, projection: {_id: 0, TTL: 0}}})
  if(guide[0]?.id){
    await DB.set('guide-'+guide[0].id, guide[0])
  }
  setSpinner(false)
}
