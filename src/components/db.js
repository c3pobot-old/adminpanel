import Dexie from 'dexie';

export const db = new Dexie(process.env.REACT_APP_BOT_DB_NAME)

db.version(1).stores({
  data: 'id'
})
function set(key, data){
  return new Promise(function(resolve){
    db.data.put({id: key, value: data})
    .then(function(){
      resolve()
    })
    .catch(function(e){
      console.error(e)
      resolve()
    })
  })
}
function get(key){
  return new Promise(function(resolve){
    db.data.where({id: key}).first(function (data){
      resolve(data?.value)
    })
    .catch(e=>{
      console.error(e);
      resolve()
    })
  })
}
function getMany(key, query){
  return new Promise(function(resolve){
    if(key && query){
      let regEx = new RegExp(query)
      db.data.filter(function(item) { return regEx.test(item[key]); })
      .toArray()
      .then(function(result){
        resolve(result)
      })
      .catch(e=>{
        console.error(e);
        resolve()
      })
    }else{
      resolve()
    }
  })
}
function clear(){
  return new Promise(function(resolve){
    db.data.clear()
    .then(function (){
      resolve()
    })
    .catch(function(e){
      console.error(e);
      resolve()
    })
  })
}
function del(key){
  return new Promise(function(resolve){
    db.data.delete(key)
    .then(function(){
      resolve()
    })
    .catch(function(e){
      console.error(e);
      resolve()
    })
  })
}
const Functions = {
  get: get,
  getMany: getMany,
  set: set,
  clear: clear,
  del: del
}
export default Functions
