// eslint practice file for ITC 230
let names = ['sara','joe','dave','ann']
let newArray = names.map( (item) => {
 return item.toUpperCase();
 //x = 2;
});
//Why won't this stop erroring 
//Witnessed another student with this exact same code running eslint fine 
document.write(newArray);