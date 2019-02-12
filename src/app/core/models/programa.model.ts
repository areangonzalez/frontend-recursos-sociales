export interface IPrograma {
  id: number,
  nombre: string
}

export interface IListaProgramas extends IPrograma {
  [index: number]: IPrograma
}
