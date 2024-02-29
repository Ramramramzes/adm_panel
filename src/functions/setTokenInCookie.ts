import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function setTokenInCookie (decoded:string,setReload:(el:number)=>void){
  axios.get(`http://localhost:3001/set-cookie?token=${decoded}`, {
    withCredentials: true,
  })
  .then(response => {
    console.log(response);
    setReload(2)
  })
  .catch(error => {
    console.log(error);
  })
}