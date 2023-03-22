import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  deleteMessage: undefined | string;
  productList: undefined | Product[];
  icon = faTrash;
  editIcon = faEdit;
  constructor(private list: ProductsService) {}
  ngOnInit() {
    this.plist();
  }
  deleteProduct(id: number) {
    this.list.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = 'Product is deleted';
        this.plist();
      }
      setTimeout(() => (this.deleteMessage = undefined), 3000);
    });
  }
  plist() {
    this.list.productList().subscribe((res) => {
      console.log(res, 'res');
      for (let i = 0; i < res.length; i++) {
        console.log(res[i], 'item');
      }
      this.productList = res;
    });
  }
}
