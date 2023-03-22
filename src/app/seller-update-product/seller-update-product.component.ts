import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  productData: undefined | Product;
  updateProductMessage: undefined | string;
  constructor(
    private route: ActivatedRoute,
    private product: ProductsService,
    private routeBack: Router
  ) {}
  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((res) => {
        console.log(res);
        this.productData = res;
      });
  }
  updateSellerProduct(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((res) => {
      if (res) {
        console.log(res, 'update');
        this.updateProductMessage = 'Product is updated successfully';
        setTimeout(() => {
          this.updateProductMessage = undefined;
          this.routeBack.navigate(['seller-home']);
        }, 1000);
      }
    });
  }
}
