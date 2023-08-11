import ApiRequest from 'components/apiRequest'
import DB from 'components/db'

export default async function GetUnit(opts = {}, nameKey, type){
  const { discordId, setSpinner, setUnit, unitList } = opts
  setSpinner(true)
  const uInfo = unitList.find(x=>x.nameKey === nameKey?.trim())
  if(uInfo?.baseId && type){
    let obj = await DB.get(type+'-'+uInfo.baseId)
    if(!obj){
      let unit = await ApiRequest({method: 'image', dId: discordId, data: { cmd: 'get', baseId: uInfo.baseId, type: type } });
      if(unit?.img){
        obj = {...uInfo,...unit}
        await DB.set(type+'-'+uInfo.baseId, obj)
      }
    }
    if(obj) setUnit(obj)
  }
  setSpinner(false)
}
