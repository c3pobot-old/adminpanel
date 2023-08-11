export default async function ApiRequest (opt = {}) {
  const obj = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "accept": "application/json"
    },
    body: JSON.stringify(opt)
  })
  .then(res=>{
    return res.text()
  })
  .then(data=>{
    if(data) return JSON.parse(data)
  })
  .catch(e=>console.error(e))
  return obj
}
