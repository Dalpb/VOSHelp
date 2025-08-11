interface MemoryContent {
  dir: number; //unique
  content: string;
}

interface VariableContent extends MemoryContent {
  name: string;
}

interface HeaderContent extends VariableContent {
  size: number;
}

type CreateVariableI =
  | {
      type: "create memory";
      content: MemoryContent;
    }
  | {
      type: "create variable";
      content: VariableContent;
    }
  | {
      type: "create header";
      content: HeaderContent;
    };

type UpdateVariableI =
  | {
      type: "update memory";
      content: Partial<MemoryContent>;
    }
  | {
      type: "update variable";
      content: Partial<VariableContent>;
    }
  | {
      type: "update header";
      content: Partial<HeaderContent>;
    };

interface DeleteVariableI {
  type: "delete variable";
  content: {
    dir: number;
  };
}

//añadir transform

interface PointVariableI {
  type: "pointing";
  content: {
    dirVar: number; //variable que apunta
    dirRef: number; // varaible id que es apuntado
  };
}

interface changeFileI{
  type:"changeFile",
  content:{
    name:string
  }
}

export type ActionsT =
  | CreateVariableI
  | UpdateVariableI
  | DeleteVariableI
  | PointVariableI
  | changeFileI;
