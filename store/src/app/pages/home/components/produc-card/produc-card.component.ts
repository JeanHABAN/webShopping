import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-produc-card',
  templateUrl:'./product-card.component.html' 
})
export class ProducCardComponent {
@Input() fullWidth = false;
@Output() addToCart = new EventEmitter();
@Input() product : Product | undefined;

onAddToCart(): void{
this.addToCart.emit(this.product)
}
}
