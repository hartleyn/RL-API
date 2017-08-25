import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {
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
			this.updateHandler(updated_item);
		});
	}

	deleteItem(item_id: String): void {
		this.item_service.deleteItem(item_id).then((deleted_item_id: String) => {
			this.deleteHandler(deleted_item_id);
		});
	}
}
