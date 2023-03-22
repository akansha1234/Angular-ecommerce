import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchResult: undefined | Product[];
  constructor(private route: ActivatedRoute, private search: ProductsService) {}
  ngOnInit() {
    let query = this.route.snapshot.paramMap.get('query');
    query &&
      this.search.searchProducts(query).subscribe((result) => {
        console.log(result, 'res');
        this.searchResult = result;
      });
  }
}
