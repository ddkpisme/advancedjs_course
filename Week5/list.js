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

//Get all Books
let all = () => {
    return books;
}

//Create a Delete function in the module 


let del = (title) => {
	var newBooks = books.filter((item) => {
		return item.title !== title;	
	})
	books = newBooks;
	var newLength = books.length;
	return newLength;
	
}

//Create add function

let ad = (title) => {
	if (title != 'dune' && title != 'it' && title != 'moby dick') {
	var addBooks = books.push((item) => {
		return item.title;
	})
	var length2 = books.length;
	return length2;
}
else {
	console.log("Something Went Wrong adding books!");
}
}

//We are going to export our functions

module.exports = {
	get,
	books,
	del,
	ad,
	all
}
