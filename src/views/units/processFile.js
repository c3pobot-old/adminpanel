import Resizer from "react-image-file-resizer";

export function ValidateFile(file){
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
  if (validTypes.indexOf(file.type) === -1) {
      return false;
  }
  return true;
}
function fetchArrayBuffer(url){
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then(res=>res.arrayBuffer())
    .then(file=>{
      let base64String = btoa(String.fromCharCode(...new Uint8Array(file)))
      resolve(`data:image/png;base64,${base64String}`)
    })
    .catch(e=>{
      console.log(e)
      reject()
    })
  })
}
function fetchBlob(url){
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then(res=>res.blob())
    .then(file=>{
      let blob = new Blob([file], { type: 'image/png'})
      resolve(blob)
    })
    .catch(e=>{
      console.log(e)
      reject()
    })
  })
}
export async function GetImageFromURL(url){
  let file = await fetchBlob(url)
  if(!file) return
  let meta = await GetMeta(URL.createObjectURL(file))
  let width = 1000
  if(meta?.width < 1000) width = +meta.width
  let img = await ResizeImg(file, width)
  return img
}
export function ResizeImg (img, width = 1000, height = 20000){

  return new Promise((resolve)=>{

    Resizer.imageFileResizer(
      img,
      1000,
      height,
      "PNG",
      100,
      0,
      (uri)=>{resolve(uri)},
      "base64"
    )
  })
}

export function GetMeta(url) {
  return new Promise((resolve)=>{
    try{
      var img = new Image();
      img.onload = function() {
          resolve( {width: this.width, height: this.height } );
      };
      img.src = url;
    }catch(e){
      console.error(e)
      resolve()
    }
  })
}
