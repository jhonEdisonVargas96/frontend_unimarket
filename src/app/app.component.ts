import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unimarket';
  isLogged = false;
  email:string = "";

  constructor(private router:Router, private tokenService:TokenService, private sesionService:SesionService){ }

  ngOnInit(): void {
    const objeto = this;

    this.sesionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });

    this.actualizarSesion(this.tokenService.isLogged());
  }

  private actualizarSesion(estado: boolean){
    this.isLogged = estado;
    if (estado) {
      this.email = this.tokenService.getEmail();
    }else{
      this.email = "";
    }
  }
    

  public logout(){
    this.tokenService.logout();
  }


  public iraBusqueda(valor:string){
    if(valor){
    this.router.navigate(["/busqueda", valor]);
    }
  }
}
