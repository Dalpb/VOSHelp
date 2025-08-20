//read only con el codigo que muestro en el UI
//SOLO PARA BESTFIT
import type { header } from "@vgmemory/types/Header";
import useActionStore from "@vgmemory/store/useActionsStore";
import { createActionChangeFile, createActionPointing, createActionVariable } from "@vgmemory/utils/actionsUtils";
const state = useActionStore.getState();
export const DIR_BASE:number = 10; //direccion de memoria supuestas 
export const DIR_FREEP:number = 20;
export const DIR_NULL:number = 0;
export const DIR_P:number = 30;
export const DIR_PREVP: number=40;
export const DIR_UP:number=50;
export const DIR_CP:number=60;
export const DIR_BP: number=70;
export const DIR_P2:number=80;

const NALLOC: number = 1024;
const SIZEOFHEADER: number = 16;
let SIMUMEMORY: number = 100000; //simulará el sbrk
let freep: header | null = null;
let nextfreeAdress = 100; //esta cosa para simular las dire de emmoria
const base: header = {
  s: {
    ptr: null,
    size: 0,
  },
  x: 0,
  dir: 1,
};
//solo colocar acciones q nostrar en UI donde se necesite
/*export function xrun(unidadv: number) {
if(unidadv <= 0)return;
  let x = 0;
  let unidad = unidadv;
  let base: number;

  do {
    //indico la cantidad de bytes que estoy solicitando
    base = Math.floor(Math.pow(2, x) + 0.5);
    xmalloc(base*unidad);
    x++;
  } while (x <= 6);
}*/

export function xruntest() {
  const action = createActionChangeFile("malloc.c");
  state.addAction(action,10);
  xmalloc(1024);
}

function xmalloc(nbytes: number) {

  let p: header | null;
  let prevp: header | null;
  //muestro creación de estos campos
  let action = createActionVariable(DIR_P,"0x000","p");
  state.addAction(action,2);
  action = createActionVariable(DIR_PREVP,"0x000","prevp");
  state.addAction(action,2);


  let nunits = Math.floor((nbytes + SIZEOFHEADER - 1) / SIZEOFHEADER + 1);
  //muesto la cantidad de espacio en headers que necesito

  prevp = freep;
  action =  createActionPointing(DIR_P,DIR_PREVP);

  if (freep === null) {
    base.s.size = 0;
    base.s.ptr = base;
    freep = base;
    prevp = base;
    //muestro flechas que apuntan
  }

  for (p = prevp?.s.ptr!; ; prevp = p, p = p.s.ptr!) {
    if (p.s.size >= nunits) {
      if (p.s.size === nunits) {
        prevp!.s.ptr = p.s.ptr;
        //mostrar como cambia las felchas
      } else {
        p.s.size -= nunits;

        //estructuro lo que devuelvo
        p = {
          s: {
            ptr: null,
            size: nunits,
          },
          x: 0,
          dir: nextfreeAdress,
        };
        nextfreeAdress += nunits;
      }
      freep = prevp;
      //cambio de puntero

      //puntero que devuelve
      return p;
    }
    //llego a dar la vuelta
    if (p.dir === freep.dir) {
      const more = morecore(nunits);
      if (!more) return null; //se acabo lo simulado
      p = more; //continuo
    }
  }
}

function morecore(nu: number) {
  let up: header | null;
  if (nu < NALLOC) nu = NALLOC;
  let unitHeaders = nu * SIZEOFHEADER;
  if (unitHeaders < SIMUMEMORY) return null; //no hay memoria simulada
  SIMUMEMORY -= unitHeaders; // reduce memoria simulada

  //se entrega la memoria y se castea
  up = {
    dir: nextfreeAdress,
    s: {
      ptr: null,
      size: nu, //despues de up hay varios campos de memoria
    },
    x: 0,
  };
  nextfreeAdress += nu;
  //se llama a xfree para ubicarlo en la lista
  xfree({ ...up });
  return freep;
}

function xfree(ap: header): void {
  let bp: header | null;
  let p: header | null;
  //muestro la creación de estas variables

  bp = ap;
  p = freep;

  //ubicamos donde posicionarlo
  while (p && p.s.ptr && !(bp.dir > p.dir && bp.dir < p.s.ptr.dir)) {
    if (p.dir >= p.s.ptr.dir && (bp.dir > p.dir || bp.dir < p.s.ptr.dir)) break;
    p = p.s.ptr; //paso al siguiente
  }

  if (bp.dir + bp.s.size === p?.s.ptr?.dir) {
    bp.s.size += p.s.ptr.s.size;
    bp.s.ptr = p.s.ptr!.s.ptr;
  } else {
    bp.s.ptr = p!.s.ptr;
  }

  if (p!.dir + p!.s.size === bp.dir) {
    p!.s.size += bp.s.size;
    p!.s.ptr = bp.s.ptr;
  } else {
    p!.s.ptr = bp;
  }

  freep = p;
}
