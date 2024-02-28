import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function setTokenInCookie (decoded:string){
  axios.get(`http://localhost:3001/set-cookie?token=${decoded}`, {
    withCredentials: true,
  })
  .then(response => {
    return (response);
  })
  .catch(error => {
    return (error);
  })
}

export default setTokenInCookie