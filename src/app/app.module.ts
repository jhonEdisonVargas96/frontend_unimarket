import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { RevisarProductosComponent } from './pagina/revisar-productos/revisar-productos.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    CrearProductoComponent,
    BusquedaComponent,
    DetalleProductoComponent,
    GestionProductosComponent,
    CarritoComponent,
    AlertaComponent,
    RevisarProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
