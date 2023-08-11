import React, { Fragment, useEffect, useState } from 'react';

import ShowUnit from './showUnit'
import UnitSearch from 'components/autoTextField';

import useLocalStorage from 'components/useLocalStorage'
export default function Thumbnail(opts = {}){
  const { refreshUnits, unitList, unitNameKeys } = opts;
  const [ unit, setUnit ] = useState(null)
  const [ unitNameKey, setUnitNameKey ] = useLocalStorage('t-unitNameKey')

  useEffect(()=>{
    if(unitNameKey) updateUnit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNameKey])
  function getUnitList(){
    refreshUnits(true)
  }
  function updateUnit(){
    let uInfo = unitList?.find(x=>x.nameKey === unitNameKey?.trim())
    if(uInfo?.baseId) setUnit(uInfo)
  }
  if(!unitNameKeys || unitNameKeys?.length === 0) return null
  return (
    <Fragment>
    <UnitSearch array={unitNameKeys} desc="Unit" onSelect={setUnitNameKey} onSubmit={getUnitList} action="Refresh"  />
    {unit && <ShowUnit {...{...opts, unit: unit, setUnit: setUnit}}/>}
    </Fragment>
  )
}
