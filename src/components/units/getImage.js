import ApiRequest from 'components/apiRequest'

export default async function getImage(opts = {}, type, iconKey){
  const { discordId, setSpinner } = opts
  setSpinner(true)
  let img = await ApiRequest({method: 'image', dId: discordId, data: {cmd: 'get', iconKey: iconKey, type: type }})
  setSpinner(false)
   if(img) return `data:image/png;base64,${img}`
}
