import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, of, timer } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import { LoaderService } from 'src/app/core/services';
import { LoaderState } from 'src/app/core/models';
import { debounce } from 'rxjs/operators';

@Component({
    selector: 'angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.sass']
})
export class LoaderComponent implements OnInit {

    show:boolean = false;

    private subscription: Subscription;

    constructor(
        private _activateRoute: ActivatedRoute,
        private _router: Router,
        private loaderService: LoaderService,
    ) { }

    ngOnInit() {
      const ROUTE_PARAM_LOADING: string = "loading";
      const ROUTE_DATA_LOADING: string = "loading";
      // subscribe to the NavigationEnd event
    //this._router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this._router.events.subscribe(event => {
      let currentRoute: ActivatedRoute = this._activateRoute.root;
      let childrenRoutes: ActivatedRoute[] = currentRoute.children;

      if (childrenRoutes.length == 1) {
        let route = childrenRoutes[0];
        let loading:boolean = false;

        if (route.outlet !== PRIMARY_OUTLET){
          return;
        }

        const hashData = (route.routeConfig && route.routeConfig.data && route.routeConfig.data.hasOwnProperty(ROUTE_DATA_LOADING));


        if(hashData){
          loading = route.routeConfig.data[ROUTE_DATA_LOADING];
        }

        if(loading) {
          this.loaderService.show();
        }

      }

    });

        this.subscription = this.loaderService.loaderState
        .pipe(debounce(() => timer(200)))
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
