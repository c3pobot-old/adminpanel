import { useEffect, useState } from 'react'

import ApiRequest from 'components/apiRequest'
import DB from 'components/db'

export default function useUnitList(opts={}){
  const { discordId, setSpinner } = opts
  const [ value, setValue ] = useState(null)
  async function getUnitList(force = false){
    let obj
    if(!force) obj = await DB.get('unitList')
    if(!obj){
      setSpinner(true)
      obj = await ApiRequest({method: 'mongo', dId: discordId, data: {method: 'get', collection: 'units', query: {}, projection: {_id: 0, baseId: 1, nameKey: 1, thumbnailName: 1, combatType: 1}}});
      setSpinner(false)
      if(obj?.length >= 0) DB.set('unitList', obj)
    }
    if(obj?.length >= 0) setValue(obj)
  }
  useEffect(()=>{
    if(!value || value?.length === 0) getUnitList(false)
  })
  return [ value, getUnitList ]
}
