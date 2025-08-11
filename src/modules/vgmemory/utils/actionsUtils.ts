import type { ActionsT } from "@vgmemory/types/actions";

export function createActionChangeFile(fileName: string): ActionsT {
  let action: ActionsT = {
    type: "changeFile",
    content: {
      name: fileName,
    },
  };
  return action;
}
export function createActionPointing(dirVar: number, dirRef: number) : ActionsT {
  let action: ActionsT = {
    type: "pointing",
    content: {
      dirRef: dirRef,
      dirVar: dirVar,
    },
  };
  return action;
}
export function createActionDelete(dir: number) : ActionsT {
  let action: ActionsT = {
    type: "delete variable",
    content: {
      dir: dir,
    },
  };
  return action;
}
export function createActionMemory(dir: number, content: string) : ActionsT{
  let action: ActionsT = {
    type: "create memory",
    content: {
      content: content,
      dir: dir,
    },
  };
  return action;
}
export function createActionVariable(
  dir: number,
  content: string,
  name: string
) : ActionsT {
  let action: ActionsT = {
    type: "create variable",
    content: {
      content: content,
      dir: dir,
      name: name,
    },
  };
  return action;
}
export function createActionHeader(
  dir: number,
  content: string,
  name: string,
  size: number
) : ActionsT
  {
  let action: ActionsT = {
    type: "create header",
    content: {
      content: content,
      dir: dir,
      name: name,
      size: size,
    },
  };
  return action;
}
