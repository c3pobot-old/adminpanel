import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import ButtonNav from 'components/buttonNav'
import Portrait from './portrait'
import Thumbnail from './thumbnail'

import useUnitList from 'components/useUnitList'
import useLocalStorage from 'components/useLocalStorage'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (<Box sx={{ p: 0 }}>{children}</Box>)}
    </div>
  );
}

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Units (opts={}) {

  const { discordId } = opts;
  const [ value, setValue ] = useLocalStorage('unitsHome', 0);
  const [ unitList, refreshUnits ] = useUnitList(opts);
  const [ unitNameKeys, setUnitNameKeys ] = useState(null)

  if(!discordId){
    localStorage.setItem('startUrl', window.location.href)
    ButtonNav('/discord/login')
  }


  useEffect(()=>{
    if(unitList?.length > 0) setUnitNameKeys(unitList.map(x=>x.nameKey))
  }, [unitList])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const unitOpts = {
    ...opts,
    unitList: unitList,
    unitNameKeys: unitNameKeys,
    refreshUnits: refreshUnits
  }
  if(!unitNameKeys || unitNameKeys?.length === 0) return(
    <Box>Getting units from server</Box>
  )
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Portrait" {...tabProps(0)} />
          <Tab label="Thumbnail" {...tabProps(1)} />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Portrait {...unitOpts}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Thumbnail {...unitOpts}/>
      </TabPanel>
    </Box>
  )
}
