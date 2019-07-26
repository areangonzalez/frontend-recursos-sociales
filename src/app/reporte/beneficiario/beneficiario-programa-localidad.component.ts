import { ComponentRef, ComponentFactoryResolver, Input, ViewContainerRef, ViewChild, Component } from "@angular/core";
import { ChartBeneficiarioProgramaLocalidadComponent } from '../chart'
import { MensajesService } from "src/app/core/services";

@Component({
  selector: 'beneficiario-programa-localidad',
  templateUrl: './beneficiario-programa-localidad.component.html',
  //styleUrls: ['./parent.component.css']
})
export class BeneficiarioProgramaLocalidadComponent {
  @Input('localidades') public localidades:any;
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;

  index: number = 0;

  componentsReferences = [];

  public localidadId:any = '';
  public localidadSeleccionadas: any = [];

  constructor(
    private CFR: ComponentFactoryResolver,
    private _mensajesServices: MensajesService,
  ) {}
  /**
   * crea el componente instanciado los valores del mismo.
   */
  createComponent() {
    if (this.localidadId != '' && this.buscarLocalidadPorId(this.localidadId)){
      let componentFactory = this.CFR.resolveComponentFactory(ChartBeneficiarioProgramaLocalidadComponent);
      let componentRef: ComponentRef<ChartBeneficiarioProgramaLocalidadComponent> = this.VCR.createComponent(componentFactory);
      let currentComponent = componentRef.instance;
      //console.log(componentRef);
      currentComponent.selfRef = currentComponent;
      currentComponent.index = ++this.index;
      currentComponent.idCanvas = 'torta_programa_localidad_' + currentComponent.index.toString();
      currentComponent.localidadId = this.localidadId;

      this.localidadSeleccionadas.push(this.localidadId);

      // prividing parent Component reference to get access to parent class methods
      currentComponent.compInteraction = this;

      // add reference for newly created component
      this.componentsReferences.push(componentRef);
    }else{
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

}
