import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cartData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient) {}
  addProduct(data: Product) {
    return this.http.post(
      'https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products',
      data
    );
  }
  productList() {
    return this.http.get<Product[]>(
      'https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products'
    );
  }
  deleteProduct(id: number) {
    return this.http.delete(
      `https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products/${id}`
    );
  }
  getProduct(id: string) {
    return this.http.get<Product>(
      `https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products/${id}`
    );
  }
  updateProduct(product: Product) {
    return this.http.put(
      `https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<Product[]>(
      `https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products/?_limit=3`
    );
  }
  trendyProducts() {
    return this.http.get<Product[]>(
      `https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products/?_limit=8`
    );
  }
  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `https://angular663pugrxnjpk-szhz--3000.local-credentialless.webcontainer.io/products/?q=${query}`
    );
  }
  localAddToCart(data: Product) {
    let cart = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cart = JSON.parse(localCart);
      cart.push(data);
      localStorage.setItem('localCart', JSON.stringify(cart));
      this.cartData.emit(cart);
    }
  }
  removefromcart(productId: number) {
    let cart = localStorage.getItem('localCart');
    if (cart) {
      let items: Product[] = JSON.parse(cart);
      items = items.filter((item: Product) => item.id !== productId);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(data: cart) {
    return this.http.post(
      'https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/cart',
      data
    );
  }
  fetchCart(userId: number) {
    return this.http
      .get<Product[]>(
        `https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/cart?userId=${userId}`,
        {
          observe: 'response',
        }
      )
      .subscribe((res) => {
        if (res && res.body && res.body.length) {
          this.cartData.emit(res.body);
        }
      });
  }
  removeCartFromDb(cartId: number) {
    return this.http.delete(
      'https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/cart/' +
        cartId
    );
  }
  getCartData() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    return this.http.get<cart[]>(
      `https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/cart?userId=${userId}`
    );
  }
  orderProduct(data: order) {
    return this.http.post(
      'https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/order',
      data
    );
  }
  getOrder(userId: number) {
    return this.http.get<order[]>(
      `https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/order?userId=${userId}`
    );
  }
  removeOrders(cartId: number) {
    return this.http
      .delete(
        'https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/cart/' +
          cartId,
        {
          observe: 'response',
        }
      )
      .subscribe((res) => {
        if (res) {
          this.cartData.emit([]);
        }
      });
  }
  deleteOrder(orderId: number) {
    return this.http.delete(
      'https://angular663pugyhdlqd-bihv--3000.local-credentialless.webcontainer.io/order/' +
        orderId
    );
  }
}
