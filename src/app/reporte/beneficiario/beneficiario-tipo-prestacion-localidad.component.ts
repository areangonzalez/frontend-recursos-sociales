import { ComponentRef, ComponentFactoryResolver, Input, ViewContainerRef, ViewChild, Component, OnInit } from "@angular/core";
import { ChartBeneficiarioTipoPrestacionLocalidadComponent } from '../chart'
import { MensajesService } from "src/app/core/services";
import { UtilService } from "src/app/core/utils";

@Component({
  selector: 'beneficiario-tipo-prestacion-localidad',
  templateUrl: './beneficiario-tipo-prestacion-localidad.component.html'
})
export class BeneficiarioTipoPrestacionLocalidadComponent implements OnInit {
  @Input('localidades') public localidades:any;
  @Input('tipoPrestacion') public tipoPrestacion:any;
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;

  index: number = 0;

  componentsReferences = [];

  public localidadId:any = '';
  public localidadSeleccionadas: any = [];
  public listaPrestacionColor:any = [];
  public colores: any = [];

  constructor(
    private CFR: ComponentFactoryResolver,
    private _mensajesServices: MensajesService,
    private _util: UtilService
  ) {}

  ngOnInit(){
    this.colores = this._util.generarColores();
    this.etiquetasTipoPrestacion();
  }


  /**
   * crea el componente instanciado los valores del mismo.
   */
  createComponent() {
    if (this.localidadId != '' && this.buscarLocalidadPorId(this.localidadId)){
      let componentFactory = this.CFR.resolveComponentFactory(ChartBeneficiarioTipoPrestacionLocalidadComponent);
      let componentRef: ComponentRef<ChartBeneficiarioTipoPrestacionLocalidadComponent> = this.VCR.createComponent(componentFactory);
      let currentComponent = componentRef.instance;
      currentComponent.selfRef = currentComponent;
      currentComponent.index = ++this.index;
      currentComponent.idCanvas = 'torta_tipo_prestacion_localidad_' + currentComponent.index.toString();
      currentComponent.localidadId = this.localidadId;
      // separo los colores del objeto y los agrego en un array simple
      let colores: any[] = [];
      this.listaPrestacionColor.forEach(el => {
        colores.push(el.color);
      });
      currentComponent.colorsGrafico = colores;
      // instancio la localidad seleccionada
      this.localidadSeleccionadas.push(this.localidadId);

      // prividing parent Component reference to get access to parent class methods
      currentComponent.compInteraction = this;

      // add reference for newly created component
      this.componentsReferences.push(componentRef);
    }else{ // miro el error y mando el mensaje adecuado para el cliente.
      if (!this.buscarLocalidadPorId(this.localidadId)){
        this._mensajesServices.cancelado('Ya se ha seleccionado este tipo de prestación.', [{name:''}]);
      }else{
        this._mensajesServices.cancelado('Por favor seleccione un tipo de prestación.', [{name:''}]);
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
    let component: ChartBeneficiarioTipoPrestacionLocalidadComponent = <ChartBeneficiarioTipoPrestacionLocalidadComponent>componentRef.instance;

    let vcrIndex: number = this.VCR.indexOf(componentRef)

    // removing component from container
    this.VCR.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  }

  private buscarLocalidadPorId(id:number) {
    let encontrada = false;
    for (let i = 0; i < this.localidadSeleccionadas.length; i++) {
      if (this.localidadSeleccionadas[i] == id){
        encontrada = true;
      }
    }
    return !encontrada;
  }
  /**
   *  genero un listado de colores para cada tipo prestacion
   */
  public etiquetasTipoPrestacion() {

    for (let i = 0; i < this.tipoPrestacion.length; i++) {
      this.listaPrestacionColor.push({'id': this.tipoPrestacion[i].id, 'nombre': this.tipoPrestacion[i].nombre, 'color': this.colores[i]});
    }

  }

}
