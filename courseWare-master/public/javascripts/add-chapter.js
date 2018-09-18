document.getElementById('chaptersInput').value = "[]";
var add = document.getElementById('add');

function addContent(){
  var name = document.getElementById('name');

  var div = document.createElement('div'); div.setAttribute('class', 'alert alert-dark');
  var nameAndUrl = 'name: ' + name.value;
  var divText = document.createTextNode(nameAndUrl);
  div.appendChild(divText);
  var contentDiv = document.getElementById('chapters');

  contentDiv.appendChild(div);
  var input = document.getElementById('chaptersInput');
  console.log(input);
  
  var data = [];
  data = JSON.parse(input.value);
  var content = {
    name: name.value,
  }
  data.push(content);
  input.value = JSON.stringify(data);
  console.log(input.value);
}

add.addEventListener('click', addContent, false);