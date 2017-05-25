//Defining our array as books

var books = [
{title: "dune", author:"frank herbert", pubdate:1969},
{title: "it", author:"steven king", pubdate:1975},
{title: "moby dick", author:"herman melville", pubdate:1869}
];

//here we are defining a function and the function is called get, and we are using the arrow syntax to define that function
exports.get = (title) => {
    return books.find((item) => {
    	return item.title == title;
    });
}

//Get all Books
exports.all = () => {
    return books;
}

//Create a Delete function in the module 


exports.del = (title) => {
	var newBooks = books.filter((item) => {
		return item.title !== title;	
	})
	books = newBooks;
	var newLength = books.length;
	return newLength;
	
}

//Create add function

exports.ad = (newBook) => {
	if (!(this.get(newBook.title))) {
	books.push(newBook);
	var length2 = books.length;
}
	return length2;
}

//We are going to export our functions
/*
module.exports = {
	get,
	books,
	del,
	ad,
	all
}
*/