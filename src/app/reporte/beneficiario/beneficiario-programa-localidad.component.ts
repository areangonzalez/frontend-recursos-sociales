import { ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, Component } from "@angular/core";
import { ChartBeneficiarioProgramaLocalidadComponent } from '../chart'

@Component({
  selector: 'beneficiario-programa-localidad',
  templateUrl: './beneficiario-programa-localidad.component.html',
  //styleUrls: ['./parent.component.css']
})
export class BeneficiarioProgramaLocalidadComponent {

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;

  index: number = 0;

  componentsReferences = [];

  constructor(private CFR: ComponentFactoryResolver) {
  }

  createComponent() {

    let componentFactory = this.CFR.resolveComponentFactory(ChartBeneficiarioProgramaLocalidadComponent);
    let componentRef: ComponentRef<ChartBeneficiarioProgramaLocalidadComponent> = this.VCR.createComponent(componentFactory);
    let currentComponent = componentRef.instance;
    //console.log(componentRef);
    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.index;
    currentComponent.idCanvas = 'torta_' + currentComponent.index.toString();

    // prividing parent Component reference to get access to parent class methods
    currentComponent.compInteraction = this;

    // add reference for newly created component
    this.componentsReferences.push(componentRef);
  }

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

}
