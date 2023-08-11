import ButtonNav from 'components/buttonNav'
export default function Home(opts={}) {
  const { discordId } = opts;
  if(!discordId){
    localStorage.setItem('startUrl', window.location.href)
    ButtonNav('/discord/login')
  }
  return (
    <div>Comming Soon (tm)</div>
  )
}
