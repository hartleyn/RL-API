import { Injectable } from '@angular/core';
import { Item } from './item';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService {
	private items_URL = '/api/items';

	constructor(private http: Http) {}

	// get("/api/contacts")
	getItems(): Promise<void | Item[]> {
		return this.http.get(this.items_URL)
				   .toPromise()
				   .then(response => response.json() as Item[])
				   .catch(this.handleError);
	}

	// post("/api/items")
	createItem(new_item: Item): Promise<void | Item> {
		return this.http.post(this.items_URL, new_item)
				   .toPromise()
				   .then(response => response.json() as Item)
				   .catch(this.handleError);
	}

	// delete("/api/items/:id")
	deleteItem(del_item_id: String): Promise<void | String> {
		return this.http.delete(this.items_URL + '/' + del_item_id)
				   .toPromise()
				   .then(response => response.json() as String)
				   .catch(this.handleError)
	}

	// put("/api/contacts/:id")
	updateItem(put_item: Item): Promise<void | Item> {
		var put_URL = this.items_URL + '/' + put_item._id;
		return this.http.put(put_URL, put_item)
				   .toPromise()
				   .then(response => response.json() as Item)
				   .catch(this.handleError);
	}

	private handleError(error: any) {
		let err_msg = (error.message) ? error.message :
		error.status ? '${error.status} - ${error.statustext}' : 'Server error';
		console.log(err_msg);
	}
}
