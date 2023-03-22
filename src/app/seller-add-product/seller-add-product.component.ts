import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductsService) {}
  addSellerProduct(data: Product) {
    this.product.addProduct(data).subscribe((res) => {
      if (res) {
        this.addProductMessage = 'Product is successfully added';
        setTimeout(() => (this.addProductMessage = undefined), 3000);
      }
    });
  }
}
