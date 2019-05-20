import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { Alert, AlertType } from "../../core/models";
import { MensajesService } from "../../core/services";

@Component({
    selector: 'mensajes-alert',
    templateUrl: './mensaje.component.html',
    styleUrls: ['./mensaje.component.sass']
})
@Injectable()
export class MensajesComponent implements OnInit {
    @Output('eventoConfirmacion') eventoConfirmacion = new EventEmitter();
    mensaje: any;
    tipo: number;
    url: any;
    subscription: Subscription;

    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
        private _mensajeService: MensajesService
    ) {
        this.subscription = this._mensajeService.getMessage().subscribe(mensaje => { this.mensaje = mensaje; });
     }

    ngOnInit() {
        this._mensajeService.getMessage().subscribe(
            (alert: Alert) => {
                if (!alert) {
                    return;
                }else{
                    this.mensaje = alert.mensaje;
                    this.tipo = alert.tipo;
                    this.url = alert.urlLink;
                }
            }
        );
    }
    // remover alert
    removerMensaje(){
        this._mensajeService.clearMessage();
    }

    cssAlert(tipo: number){
        if (!alert) { return; }
        switch (tipo) {
            case AlertType.Exitoso:
                return 'alert alert-success';
            case AlertType.Cancelado:
                return 'alert alert-danger';
            case AlertType.Confirmar:
                return 'alert alert-success';

        }
    }

    obtenerTitulo(tipo: number){
        if (!alert) { return; }
        switch (tipo) {
            case AlertType.Exitoso:
             return 'Exitoso';
            case AlertType.Cancelado:
             return 'Cancelado';
            case AlertType.Confirmar:
             return 'Exitoso';
        }
    }

    redireccionamiento(tipoVista){
        for (var i in this.url) {
            let param = (this.url[i].param != undefined)?this.url[i].param:'';
            if (this.url[i].name != '') {
                if (this.url[i].tipo != undefined){
                    if (this.url[i].tipo == tipoVista) {
                        if (param != ''){
                            this._mensajeService.clearMessage();
                            this._router.navigate([this.url[i].name, param]);
                        }else{
                            this._mensajeService.clearMessage();
                            this._router.navigate([this.url[i].name]);
                        }
                    }
                }else{
                    this._mensajeService.clearMessage();
                    this._router.navigate([this.url[i].name]);
                }
            }else{
                this._mensajeService.clearMessage();
            }
        }
    }

    vistaAmbiente() {
        this._mensajeService.clearMessage();
        this._router.navigate([]);
    }

    recargarPagina() {
      location.reload();
    }
}
