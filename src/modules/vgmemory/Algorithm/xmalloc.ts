//read only con el codigo que muestro en el UI
import type { header } from "@vgmemory/types/Header";

const NALLOC: number = 1024;
const SIZEOFHEADER: number = 16;
let SIMUMEMORY : number = 100000; //simulará el sbrk 
let freep: header | null = null;

const base: header = {
  s: {
    ptr: null,
    size: 0,
  },
  x: 0,
};
//solo colocar acciones q nostrar en UI donde se necesite
function main() {
    let x = 0;
    let unidad= 1024;
    let base: number;

    do{
        //indico la cantidad de bytes que estoy solicitando
        base = Math.round((Math.pow(2,x) + .5));
        
        x++;    
    }while(x <= 6);
}

function xmalloc(nbytes : number)  {
    let p : header | null; 
    let prevp : header |null;
    //muestro creación de estos campos

    let sizeofHeader : number = 16 // sizeof(Header) bytes
    let nunits  = Math.round(((nbytes + SIZEOFHEADER - 1)/ SIZEOFHEADER)  + 1)
    //muesto la cantidad de espacio en headers que necesito

    prevp = freep; 

    if(freep === null){
        base.s.size = 0;
        base.s.ptr = base;
        freep= base;
        prevp = base;
        //muestro flechas que apuntan
    }

    for(p = prevp?.s.ptr!; ; prevp = p, p = p.s.ptr!){
        if(p.s.size >= nunits){
            if(p.s.size === nunits){
                prevp!.s.ptr = p.s.ptr;
                //mostrar como cambia las felchas
            }
            else{
                p.s.size -= nunits;

                //estructuro lo que devuelvo
                p ={
                    s:{
                        ptr:null,
                        size:nunits
                    },
                    x: 0
                };
            }
            freep = prevp;
            //cambio de puntero

            //puntero que devuelve
            return p;
        }
        //llego a dar la vuelta
        if(p === freep){
            const more = morecore(nunits);
            if(!more) return null; //se acabo lo simulado
            p = more; //continuo
        }

    }
}

function morecore(nu: number){
    let up : header | null;
    if(nu < NALLOC) nu = NALLOC;
    let unitHeaders = nu*SIZEOFHEADER;
    if(unitHeaders < SIMUMEMORY)return null; //no hay memoria simulada
    SIMUMEMORY -= unitHeaders;  // reduce memoria simulada

    //se entrega la memoria y se castea
    up ={
        s:{
            ptr: null,
            size: nu
        },
        x:0
    }

    //se llama a xfree para ubicarlo en la lista
}   
