import { ComponentRef, ComponentFactoryResolver, Input, ViewContainerRef, ViewChild, Component, OnInit } from "@angular/core";
import { ChartBeneficiarioProgramaLocalidadComponent } from '../chart'
import { MensajesService } from "src/app/core/services";

@Component({
  selector: 'beneficiario-programa-localidad',
  templateUrl: './beneficiario-programa-localidad.component.html',
})
export class BeneficiarioProgramaLocalidadComponent implements OnInit {
  @Input('localidades') public localidades:any;
  @Input('programas') public programas:any;
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;

  index: number = 0;

  componentsReferences = [];

  public localidadId:any = '';
  public localidadSeleccionadas: any = [];
  public programaColor:any = [];

  constructor(
    private CFR: ComponentFactoryResolver,
    private _mensajesServices: MensajesService,
  ) {}

  ngOnInit(){
    this.etiquetasProgramas();
  }


  /**
   * crea el componente instanciado los valores del mismo.
   */
  createComponent() {
    if (this.localidadId != '' && this.buscarLocalidadPorId(this.localidadId)){
      let componentFactory = this.CFR.resolveComponentFactory(ChartBeneficiarioProgramaLocalidadComponent);
      let componentRef: ComponentRef<ChartBeneficiarioProgramaLocalidadComponent> = this.VCR.createComponent(componentFactory);
      let currentComponent = componentRef.instance;
      currentComponent.selfRef = currentComponent;
      currentComponent.index = ++this.index;
      currentComponent.idCanvas = 'torta_programa_localidad_' + currentComponent.index.toString();
      currentComponent.localidadId = this.localidadId;
      currentComponent.localidadNombre = this.obtenerNombreLocalidad(this.localidadId);
      currentComponent.colorsGrafico = this.programaColor;
      // instancio la localidad seleccionada
      this.localidadSeleccionadas.push(this.localidadId);

      // prividing parent Component reference to get access to parent class methods
      currentComponent.compInteraction = this;

      // add reference for newly created component
      this.componentsReferences.push(componentRef);
    }else{ // miro el error y mando el mensaje adecuado para el cliente.
      if (!this.buscarLocalidadPorId(this.localidadId)){
        this._mensajesServices.cancelado('Ya se ha seleccionado esta localidad.', [{name:''}]);
      }else{
        this._mensajesServices.cancelado('Por favor seleccione una localidad.', [{name:''}]);
      }
    }
  }
  /**
   * Remuevo el componente creado mediante el id instanciado
   * @param index identificador del componente
   */
  remove(index: number) {
    if (this.VCR.length < 1)
      return;

    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    let component: ChartBeneficiarioProgramaLocalidadComponent = <ChartBeneficiarioProgramaLocalidadComponent>componentRef.instance;

    let vcrIndex: number = this.VCR.indexOf(componentRef)
    console.log("vcr index: ",vcrIndex);
    // removing component from container
    this.VCR.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
    // borro localidad seleccionada
    this.localidadSeleccionadas.splice(vcrIndex, 1);
  }

  private buscarLocalidadPorId(id:number) {
    let encontrada = false;
    for (let i = 0; i < this.localidadSeleccionadas.length; i++) {
      if (parseInt(this.localidadSeleccionadas[i]) == id){
        encontrada = true;
      }
    }
    return !encontrada;
  }
  /**
   *  genero un listado de colores para cada programa
   */
  public etiquetasProgramas() {
    for (let i = 0; i < this.programas.length; i++) {
      this.programaColor.push({'nombre': this.programas[i].nombre, 'color': this.programas[i].nombre});
    }
  }

  private obtenerNombreLocalidad(idLocalidad:number) {
    for (let i = 0; i < this.localidades.length; i++) {
      if (this.localidades[i].id == idLocalidad) {
        return this.localidades[i].nombre;
      }
    }
    return "N/A";
  }

}
