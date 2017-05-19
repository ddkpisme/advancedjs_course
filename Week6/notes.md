#Notes

* we should have a sitewide layout on the home page (master page)

* You need to implement book details onClick (using a get request)

	* You also need to implement other request functions based on what you type or click.






##Assignment Help


Skip To Content
Dashboard
DYLAN D PATTERSON
Account
Dashboard
Courses
Groups
Calendar
Inbox
Help


ITC 230 - 3208PagesTemplating
Spring 2017
Home
Modules
Pages
Announcements
Assignments
Discussions
Grades
People
Syllabus
Panopto Recordings
Google Drive
Office 365
View All Pages
Templating
Reading

Brown, Ch. 7 - Templating w/ Handlebars
Brown, Ch. 16 - Static files 
Topics

Templates overview
Handlebars
Views
Layouts
Partials
Variables
Programmatic logic
Escaping code
Previously, you learned basics of Node.js templating & express-handlebars. This module covers more advanced features of templating.

 

Context variables 

Variables are passed from Node to the Handlebars template in a context object that can contain any JavaScript objects.  

app.get(‘/’, function(req, res) { 
  res.render(‘home’, { name: ‘Dave’, children: [“amy”, “sue”, “fred”]  } ); 
});

Alternatively, you can use the response.locals object, which is passed to your rendering engine. Properties of the locals object will be 'global' in the render, so they can be referenced without prefix.

 

app.get(‘/’, function(req, res) { 
  res.locals.name = ‘Dave’;
  res.render(‘home’); 
});

Template Syntax

Handlebars uses {{ }} syntax to replace placeholders in HTML with variables. For example:

<p>Hello {{name}}</p>
A server-side Handlebars template can have comments that won’t appear in the resulting HTML.

{{! server-side comment }}
A template block can perform basic programmatic operations like loops and flow control. Block commands are prefaced with # and end with /.

{{! if..else block }}
{{#if name}}
 <h2>Hello {{name}}</h2>
{{else}}
 <h2>Please enter a name</h2>
{{/if}}
{{! for loop }}
<ul>
{{#each children}}
  {{! current context value corresponds to each child }}
  <li>{{.}} 
{{/each}}
</ul>
Context refers to the current item. You can reference the parent context with ../ syntax.


Partials 

Partials render a portion of a page and allow reusing a UI component on multiple pages.

Partials are usually stored in /views/partials sub-directory. 

You include a partial into a view like so:

{{> partial_name}}

Passing JS code

var my_data = { “name”:”david”, “age”:”23”}
app.get('/', function(req,res){
  res.type('text/html');
  res.locals.json_data = JSON.stringify(my_data);
  res.render('home' );
});

<script>
  {{#if json_data}}
    var my_data = {{{json_data}}}
  {{/if}}
</script>
 Exercises

Create a default layout for your application with header & footer elements
Implement a template comment that won’t appear in your final html
Create a view for your home page that can display all items in your list
Use #each to display info about each list item
Use #if to show some information conditionally
Pass a data array or dictionary to your html page for client-side execution
Create a view, and corresponding route, to edit details of a list item
Create a separate view for your about page
Create a partial template you can include into each view