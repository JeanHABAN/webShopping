import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl:'./products-header.component.html',
})
export class ProductsHeaderComponent {
  @Output() colCountChange = new EventEmitter<number>()
  @Output() itemsCountChange = new EventEmitter<number>()
  @Output() sortChange = new EventEmitter<string>()
  sort ='desc';
  showItemsCount =12;

  ngOnInit(){}

  onSortUpdated(newSort: string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  
  onItemsUpdated(count: number):void{
    this.showItemsCount = count;
    this.itemsCountChange.emit(count)
  }

  onColumnCountUpdated(colNUms: number):void{
    this.colCountChange.emit(colNUms);
  }

}
