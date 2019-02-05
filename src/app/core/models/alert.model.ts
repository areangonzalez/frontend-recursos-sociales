export class Alert {
  tipo: AlertType;
  mensaje: string;
  urlLink?: IUrl;
}

export enum AlertType {
  Exitoso,
  Cancelado,
  Confirmar
}

export interface IUrl {
  [index: number]: ITipoUrl
}

/**
* ITipoUrl interface usada para usar armar una url.
* name nombre de la url
* param parametros adicionales
* tipo indica a que tipo de pagina sera redireccionada
*/
export interface ITipoUrl {
  name: string,
  param?: string,
  tipo?: string
}
