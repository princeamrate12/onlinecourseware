var add = document.getElementById('add');

function addContent(){
  var contentType = document.getElementById('contentType');
  var name = document.getElementById('name');
  var url = document.getElementById('url');

  var div = document.createElement('div'); div.setAttribute('class', 'alert alert-dark');
  var nameAndUrl = 'name: ' + name.value + ' url: ' + url.value;
  var divText = document.createTextNode(nameAndUrl);
  div.appendChild(divText);
  var contentDiv = document.getElementById(contentType.value);

  contentDiv.appendChild(div);
  var inputId = contentType.value + 'Input';
  var input = document.getElementById(inputId);
  console.log(input);
  
  var data = [];
  data = JSON.parse(input.value);
  var content = {
    name: name.value,
    url: url.value
  }
  data.push(content);
  input.value = JSON.stringify(data);
  console.log(input.value);
}

add.addEventListener('click', addContent, false);