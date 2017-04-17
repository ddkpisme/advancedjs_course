This week, you'll update your application to display & modify a list of items of your choice (e.g. books, music albums, etc.), applying your knowledge of functions and modules.

create a dedicated JS module as shown in Ch.4 of the textbook, with:
a list of items, where each item has at least 3 fields (attributes). For this exercise, pick on attribute as a unique key (e.g. book title)
methods to find, add, & remove an item. Export these methods for use by other scripts.
Call this new module into your index.js script,
Update your server script with routes for /search, /add, & /delete. Each route should invoke the corresponding module method.
Users will request each route with parameters that identify a specific item in your list. For example:
http://localhost:3000/search?title=ship%20of%20fools (Links to an external site.) 

When the /search route is requested your application should display:
the requested item (e.g. ‘Searching for 'ship of fools’)
item details, if found in your list,
a not-found message if item is not in the array (e.g. ‘No records found’)
When the /add route is requested, your application should:
add the requested item to your list, if not found, and display the new total # of items. For example "[BOOK TITLE] added. N total books"
When the /delete route is requested, your application should:
remove the requested item from your list, if found, and display the new total # of items. For example "[BOOK TITLE] removed. N total books"
 

Note:

For simplicity, assume the key field in your list must have unique values. For example, if you have a book list, book titles are unique,
Items that you update or remove may be anywhere in your list, so you'll need their array index value in order to make changes. See the Array.find() method reference for examples,
When users add or update items, they should be able to enter values for all item properties. 
Since you're not storing the list to a database or to disk, updates will only persist while your server script is running,