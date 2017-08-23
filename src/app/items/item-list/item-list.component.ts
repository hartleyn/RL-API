import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
  providers: [ItemService]
})
export class ItemListComponent implements OnInit {

	items: Item[]
	selected_item: Item

	constructor(private item_service: ItemService) { }

	ngOnInit() {
		this.item_service
			.getItems()
			.then((items: Item[]) => {
				return items;
			});
	}

	private getIndexOfItem = (item_id: String) => {
	    return this.items.findIndex((item) => {
	    	return item._id === item_id;
	    });
  	}

  	selectItem() {
  		this.selected_item = item;
  	}

  	createNewItem() {
  		var item: Item = {
  			name: '';
  			class: '';
  			type: '';
  			color: '';
  			certification: '';
  		}

  		// By default, a newly-created item will have the selected state.
  		this.selectItem(item);
  	}

  	deleteItem = (item_id: String) => {
  		var idx = this.getIndexOfItem(item_id);
  		if (idx !== -1) {
  			this.contacts.splice(idx, 1);
  			this.selectItem(null);
  		}
  		return this.items;
  	}

  	addItem(item: Item) => {
  		this.items.push(item);
  		this.selectItem(item);
  		return this.items;
  	}

  	updateItem = (item: Item) => {
  		var idx = this.getIndexOfItem(item._id);
  		if (idx !== -1) {
  			this.contacts[idx] = item;
  			this.selectItem(item);
  		}
  		return this.items;
  	}
}
