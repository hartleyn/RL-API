var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var ITEMS_COLLECTION = "items";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var dist_dir = __dirname + "/dist/";
app.use(express.static(dist_dir));


// Create a database variable outside of the database connection 
// callback to reuse the conection in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
	if(err) {
		console.log(err);
		process.exit(1);
	}

	// Save databe object from the callback for reuse.
	db = database;
	console.log("Database connection ready.");

	// Initialize the app
	var server = app.listen(process.env.PORT || 8080, function() {
		var port = server.address().port;
		console.log("App is now running on port", port);
	});
})

// ITEMS API ROUTES BELOW

// Generic error handler used by all endpoints
function handleError(res, reason, message,code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}

/* "/api/items"
 *   GET: finds all items
 *   POST: creates a new item
 */

app.get("/api/items", function(req, res) {
	db.collection(ITEMS_COLLECTION).find({}).toArray(function(err, docs) {
		if (err) {
			handleError(res, err.message, "Failed to get items.");
		} else {
			res.status(200).json(docs);
		}
	});
});

app.post("/api/items", function(req, res) {
	var new_item = req.body;

	if (!req.body.name) {
		handleError(res, "Invalid user input.", "Must provide a name.", 400);
	}

	db.collection(ITEMS_COLLECTION).insertOne(new_item, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to create new item.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	}); 
});

/*  "/api/items/:id"
 *    GET: find item by id
 *    PUT: update item by id
 *    DELETE: deletes item by id
 */

app.get("/api/items/:id", function(req, res) {
	db.collection(ITEMS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to get item.");
		} else {
			res.status(200).json(doc);
		}
	});
});

app.put("/api/items/:id", function(req, res) {
	var update_doc = req.body;
	delete update_doc._id;

	db.collection(ITEMS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, update_doc, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to update item.");
		} else {
			update_doc._id = req.params.id;
			res.status(200).json(doc);
		}
	});
});

 app.delete("/api/items/:id", function(req, res) {
 	db.collection(ITEMS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
		if (err) {
			handleError(res, err.message, "Failed to delete item.");
		} else {
			res.status(200).json(doc);
		}
	});
 });

