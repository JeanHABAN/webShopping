import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html'
})
export class CartComponent {
cart: Cart ={items:[]}

data : CartItem[] = [];
KEY ='pk_test_51NNO8iFp9Rlw3awYqCK7FU1hMLeQFf7RZ8n78JM1qMwezQ30oOiAepoZam1AHygreBXIy2A1n2MV3Xm0SlYbYumZ00CIDTkOJ2'
displayedCols : Array<string> = ['product',
                                'name', 
                                'price', 
                                'quantity',
                                'total', 
                                'action' 
                              ]

constructor(private cartService: CartService){}
private http = inject(HttpClient)
ngOnInit():void{
  
  this.cartService.cart.subscribe((_cart) => {
    this.cart = _cart;
    this.data = this.cart.items;
  })
}

getTotal(items: CartItem[]): number{
return this.cartService.getTotal(items)
}

onClearCart(): void{
  this.cartService.clearCart();
}

onRemoveFromCartById(item: CartItem): void{
this.cartService.removeFromCart(item)
}

onIncreaseQuantity(item:CartItem):void{
this.cartService.addToCart(item);
}

onDecreaseQuantity(item : CartItem):void{
this.cartService.decreaseQuantity(item)
}

onCheckout():void{
  this.http.post(`http://localhost:4242/checkout`, {
    items: this.cart.items
  }).subscribe(async(res:any) =>{
    let stripe = await loadStripe(this.KEY)
    stripe?.redirectToCheckout({
      sessionId: res.id
    })
  })
}
}
