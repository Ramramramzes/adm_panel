export function tokenGenerate(length:number):string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i <length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      result += Math.floor(Math.random() * 10)
  }
  return result;
}

