export const mallocCode: string = `void *xmalloc (size_t nbytes) {
	Header  *p, *prevp;
	size_t nunits;

	nunits = (nbytes+sizeof(Header)-1)/sizeof(Header) + 1;

	if (( prevp = freep) == NULL ) { /* no free list yet */
		base.s.ptr = freep = prevp = & base; 
		base.s.size = 0;
	}

	for (p= prevp->s.ptr; ; prevp = p, p = p->s.ptr) {
		if (p->s.size >= nunits) {  /* big enough */
			if (p->s.size == nunits)  /* exactly */
				prevp->s.ptr = p->s.ptr;
			else {  /* allocate tail end */
				p->s.size -= nunits;
				p+= p->s.size;
				p->s.size = nunits;
			}
			freep = prevp; /* estrategia next-fit */
			return (void *)(p+1); 
		}
		/* Si ha dado toda la vuelta pide mas memoria y vuelve
		   a empezar */
		if (p == freep)
			if ((p = morecore(nunits)) == NULL)
				return NULL; 
	}
}`;
export const xfreeCode: string = `void xfree(void *ap) {
   Header *bp, *p;
   bp = (Header *)ap - 1;  /* point to block header */

   for (p= freep; !(bp > p && bp < p->s.ptr); p = p->s.ptr)
		if (p >= p->s.ptr && (bp > p || bp < p->s.ptr))
			break;  /* freed block at start or end of arena */ 


	/* Comprueba compactacion con hueco posterior */
   if (bp + bp->s.size == p->s.ptr) {  /* join to upper nbr */
	  bp->s.size += p->s.ptr->s.size;
	  bp->s.ptr = p->s.ptr->s.ptr;
   }else
		bp->s.ptr = p->s.ptr;

	/* Comprueba compactacion con hueco anterior */
   if (p + p->s.size == bp) {         /* join to lower nbr */
		p->s.size += bp->s.size;
		p->s.ptr = bp->s.ptr;
   } else
		p->s.ptr = bp;

   freep = p; /* estrategia next-fit */
}`;
export const morecoreCode: string = 
`static Header *morecore(size_t nu) {
   char *cp;
   Header *up;   
   if (nu < NALLOC)	
	   nu = NALLOC;
   cp= sbrk(nu * sizeof(Header));
   if (cp == (char *) -1) /* no space at all */
	   return NULL;
   up = (Header *) cp;
   up ->s.size = nu;
   xfree((void *)(up+1));
   return freep;
}`;
export const mainCode: string = 
`int main(void) {
  unsigned int x,unidad,base;
  unsigned int *pt;

  unidad=1024; 
  x=0;

  do {
    base=pow(2,x)+.5;
    if((pt=(unsigned int *)xmalloc(base*unidad))) 
       fprintf(stdout,"Se solicitaron %d bytes y estan ubicados en %p\n",base*unidad,pt);
    else
       fprintf(stderr,"No hay suficiente memoria\n");       
    x++; }
  while(x<=6);      
  exit(0);                  
}`;
