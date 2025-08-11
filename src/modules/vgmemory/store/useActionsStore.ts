import { create } from "zustand";
import type { ActionsT } from "@vgmemory/types/actions";

type Action = {
  line:number,
  action:ActionsT
}

type ActionStore = {
  actions: Array<Action>,
  currentFile: string,
  currentLineAction: number,
  addAction: (action: ActionsT,line:number) => void
  nextLineAction: ()=>void
};
//cada que se añada una acción se añade la linea q s ejecut
const useActionStore = create<ActionStore>((set) => ({
  actions : [],
  currentFile: "",
  currentLineAction:-1,
  addAction : (action,line) =>{set((state) =>({actions: [...state.actions,{action,line}]}))},
  nextLineAction: ()=> {set((state) => ({currentLineAction: state.currentLineAction + 1}) )}
}));

export default useActionStore;
