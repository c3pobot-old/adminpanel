import ApiRequest from 'components/apiRequest'
export default async function UpdateUnit(opts = {}, thumbnailName, newImg, type){
  const { discordId, setAlert, setSpinner } = opts;
  let status = false
  if(newImg){
    setSpinner(true)
    let obj = await ApiRequest({method: 'image', dId: discordId, data: { cmd: 'save', thumbnailName: thumbnailName, img: newImg?.replace('data:image/png;base64,', ''), type: type } })
    if(obj?.status === 'ok') status = true
    setSpinner(false)
  }  
  if(status){
    setAlert({type: 'success', msg: 'Unit updated Successfully'})
  }else{
    setAlert({type: 'error', msg: 'Error updating unit'})
  }
  return status
}
