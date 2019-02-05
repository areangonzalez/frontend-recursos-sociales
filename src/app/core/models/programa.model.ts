export interface IPrograma {
  id: number,
  nombre: string,
  isHovering: boolean
}

export interface IListaProgramas extends IPrograma {
  [index: number]: IPrograma
}
