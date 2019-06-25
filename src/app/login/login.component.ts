import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public logueado: boolean = false;
  public huboError: boolean = false;
  public mensaje: string = "";
  public returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthenticationService,
    private _fb: FormBuilder
  ){
    this.loginForm = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.isLogin();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
  }

  public ingresar() {

    this._auth.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
              this.huboError = true;
              this.mensaje = "Por favor verifique sus datos.";
            });
  }

  private isLogin(){
    if (localStorage.getItem('token-rrss') != null) {
       this.router.navigate(['/inicio']);
    }
  }

}
