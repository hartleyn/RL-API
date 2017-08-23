import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
	@Input()
	item: Item;

	@Input()
	createHandler: Function;
	@Input()
	updateHandler: Function;
	@Input()
	deleteHandler: Function;

	constructor(private item_service: ItemService) {}

	createItem(item: Item) {
		this.item_service.createItem(item).then((new_item: Item) => {
			this.createHandler(new_item);
		});
	}

	updateItem(item: Item): void {
		this.item_service.updateItem(item).then((updated_item: Item) => {
			this.updateItem(updated_item);
		})
	}

	updateItem(item: Item): void {
		this.item_service.deleteItem(item).then((deleted_item: Item) => {
			this.deleteItem(deleted_item);
		})
	}
}
