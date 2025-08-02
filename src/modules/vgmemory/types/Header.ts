export interface header {
  s: {
    ptr: header | null
    size: number;
  };
  x: number
  dir: number,
}
