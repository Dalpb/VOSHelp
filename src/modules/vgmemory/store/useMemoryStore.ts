//esta cosa me almacena las memorias creadas
import {create} from "zustand"
import Memory from "@vgmemory/canvas/memory"
type MemoryStore ={
    memoryMap: Map<number,Memory>,
    setMemory: (mem:Memory) => void
}

const useMemoryStore = create<MemoryStore>((set)=>({
    memoryMap: new Map<number,Memory>(),
    setMemory: (mem) =>
    set((state) => {
      const newMap = new Map(state.memoryMap);
      newMap.set(mem.getDirection(), mem);
      return { memoryMap: newMap };
    }),
}))

export default useMemoryStore;