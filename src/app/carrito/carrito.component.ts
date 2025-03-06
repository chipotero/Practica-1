import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { CommonModule } from '@angular/common';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito : any  [] = [];
  constructor(private carritoService: CarritoService){}
  ngOnInit(){
    this.carrito = this.carritoService.obtenerProducto();
  }
  generarXML(){
    this.carritoService.generarXML();
  }
  eliminarDelCarrito(elementoAEliminar: any){
    this.carritoService.eliminarDelCarrito(elementoAEliminar);
  }
}