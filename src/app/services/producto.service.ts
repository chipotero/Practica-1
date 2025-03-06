import { Injectable } from '@angular/core';
import { Producto }  from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    new Producto(1, "Laptop", 1200, 'assets/laptop.jpg'), 
    new Producto(2, "Cartera", 500, 'assets/cartera.jpg'),
    new Producto(3, "Lampara", 800, 'assets/lampara.jpg'),
  ]

  obtenerProductos():Producto[]{return this.productos;}

}
