import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Router, RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';


@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{
  public productos: Producto[] = [];
  constructor(private productoService: ProductoService, private carritoService: CarritoService, private router: Router) { }
  ngOnInit(): void {
      this.productos = this.productoService.obtenerProductos();
  }
  agregarACarrito(producto: any){
    this.carritoService.agregarProducto(producto);
  }

  irACarrito(){
    this.router.navigate(['/carrito']);
  }

}
