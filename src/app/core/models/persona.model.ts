
export class PersonaModel {
  id: number;
  nombre: string;
  apellido: string;
  nro_documento: string;
  fecha_nacimiento:string;
  telefono: string;
  celular: string;
  estado_civilid: number;
  sexoid: number;
  generoid: number;
  email: string;
  cuil: string;
  red_social: string;
  lugar: {
      barrio: string,
      calle: string,
      altura: string,
      piso: string,
      depto: string,
      escalera: string,
      localidadid: number
  };

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.nro_documento = '';
    this.fecha_nacimiento ='';
    this.telefono = '';
    this.celular = '';
    this.estado_civilid = 0;
    this.sexoid = 0;
    this.generoid = 0;
    this.email = '';
    this.cuil = '';
    this.red_social = '';
    this.lugar = {
        barrio:'',
        calle:'',
        altura:'',
        piso:'',
        depto:'',
        escalera:'',
        localidadid:0
    }
  }

    public deserealize(input: object) {
      let persona = new PersonaModel();
      for (const key in input) {
        for (const clave in persona) {
          if (key === 'contacto') {
            for (const k in input['contacto']) {
              if(clave === k){
                persona[clave] = input['contacto'][clave];
              }
            }
          }else if( clave === key) {
            persona[clave] = input[clave];
          }
        }
      }

      return persona;
    }


}
