import React from "react";
import { useAdm } from "../hooks/useAdm";

interface IAdmins{
  name: string;
  pass: string;
  token: string;
}

export const findAdmContext = React.createContext<IAdmins[]>([])
//? Делаем функцию в которой оборачиваем всех children в findAdmContext
export function FindAdmProvider({children}:{children: React.ReactNode}){
  const adminsContext:IAdmins[] = useAdm();
  

  return( 
    <findAdmContext.Provider value={adminsContext}>
      {children}
    </findAdmContext.Provider>
  )
}



