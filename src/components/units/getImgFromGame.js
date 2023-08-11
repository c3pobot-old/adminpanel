import ApiRequest from 'components/apiRequest'

export default async function GetImgFromGame(opts = {}, iconKey){
  const { discordId, setSpinner } = opts;
  setSpinner(true)
  let obj = await ApiRequest({method: 'getNewThumbnail', dId: discordId, data: {iconKey: iconKey}})
  setSpinner(false)
  return obj
}
