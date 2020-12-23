import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadConfig, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

const perm = [
  "3_crear", "3_ver", "3_baja", "3_acreditar",
  "5_crear", "5_ver", "5_baja", "5_acreditar",
  "4_crear", "4_ver", "4_baja", "4_acreditar",
  "2_crear", "2_ver", "2_baja", "2_acreditar",
  "1_crear", "1_ver", "1_baja", "1_acreditar",
  "6_crear", "6_ver", "6_baja", "6_acreditar"
]

@Component({
  selector: 'app-auto-completar',
  templateUrl: './auto-completar.component.html',
  styleUrls: ['./auto-completar.component.sass'],
  providers: [NgbTypeaheadConfig]
})
export class AutoCompletarComponent {
  @Input("permisos") public permisos: any;
  public model: any;

  @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

  constructor(config: NgbTypeaheadConfig) {
    // customize default values of typeaheads used by this component tree
    config.showHint = true;
  }

  /**
   * Busca las coincidencias dentro del listado
   */
  search = (text$: Observable<string>) => {
    console.log(text$);
    const debouncedText$ = text$.pipe(debounceTime(200),distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
      return merge(debouncedText$).pipe(
        map(term => term.length < 2 ? []
          : this.permisos.filter(v => v.toLowerCase().indexOf(term.toLocaleLowerCase()) > -1).splice(0, 10))
      );
  }
    /* search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200),distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;
      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
          map(term => (term.length < 2 ? []
             : this.permisos.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    } */

}
