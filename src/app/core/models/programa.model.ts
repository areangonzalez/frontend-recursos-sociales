export interface IPrograma {
  id: number,
  nombre: string,
  isHovering: boolean
}

export interface IListaProgramas extends IPrograma {
  [index: number]: IPrograma
}

export interface IProgramaId {
  id:number
}
