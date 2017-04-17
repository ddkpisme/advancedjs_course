//Defining our array as books

var books = [
{title: "dune", author:"frank herbert", pubdate:1969},
{title: "it", author:"steven king", pubdate:1975},
{title: "moby dick", author:"herman melville", pubdate:1869}
];

//here we are defining a function and the function is called get, and we are using the arrow syntax to define that function
let get = (title) => {
    return books.find((item) => {
    	return item.title == title;
    });
}

//We are going to export our functions

module.exports = {
	get,
	books
}

//All the stuff that didn't work!

//Splice the array


//let index = books[0,1,2];



/*for(var count = 0; count <= books.length; count++){
	if (books[0]) {
		/*var rmv = function(books) {
			delete books[0];
			return count;
		};*/
	/*	var rmv = books.splice(0, 1);
		console.log(books);
	}
	else if (books[1]) {
		var rmv2 = books.splice(1,1);
	}
	else if (books[2]) {
		var rmv3 = books.splice(2,1);
	}
	else {
		return false
	}	

}
*/

/*
for(var i = books.length - 1; i >= 0; i--) {
    if(books[0] === "dune") {
       var rmv = books.splice(i, 1);
       var c1 = 0;
       var count = c1 < i;
       var cc = count++;
    }
}
*/


/*
var newSet = new Set([books]);

for(var count = 0; count < books.length; count++){
newSet.forEach(function(point){ 
	if(point.title === 'dune') {
		let rmv = newSet.delete(point);
	}
	
});
}

*/



//console.log(get("it"));


//let b1 = books[0]
//let b2 = books[1]
//let b3 = books[2]


// we acan use a for loop for this assignment
//console.log(books[0].title);
