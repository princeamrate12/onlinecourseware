// subjects = [
//   { name: 'sepm', chapters: [{ name: '1' }, { name: '2' }] },
//   { name: 'iot', chapters: [{ name: '3' }, { name: '4' }] }
// ]
document.querySelector('#notesInput').setAttribute("value", "[]");
document.querySelector('#videosInput').setAttribute("value", "[]");
document.querySelector('#summaryInput').setAttribute("value", "[]");

var subjectSelect = document.querySelector('#subject');
var chapterSelect = document.querySelector('#chapter');

for(var i=0; i < subjects.length; i++){
  var option = document.createElement('option');
  option.setAttribute('value', subjects[i]._id);
  var subjectname = subjects[i].name;
  var textNode = document.createTextNode(subjectname);
  option.appendChild(textNode);
  subjectSelect.appendChild(option);
}

function changeSubjects(){
  var found = false; var i;
  for(i=0; i < subjects.length; i++){
    if(found !== true){
      if(subjects[i]._id === subjectSelect.value){
        found = true;
        break;
      }
    }
  }
  chapterSelect.innerHTML = "";
  for(var j=0; j < subjects[i].chapters.length; j++){
    var option = document.createElement('option');
    option.setAttribute('value', subjects[i].chapters[j]._id);
    var chaptername = subjects[i].chapters[j].name;
    var textNode = document.createTextNode(chaptername);
    option.appendChild(textNode);
    chapterSelect.appendChild(option);
  }
}

subjectSelect.addEventListener('change', changeSubjects, false);

var add = document.getElementById('add');

function addContent(){
  var contentType = document.getElementById('contentType');
  var content = document.getElementById('content');

  var div = document.createElement('div'); div.setAttribute('class', 'p-2 bg-light text-dark');
  var contentText = content.value
  var divText = document.createTextNode(contentText);
  div.appendChild(divText);
  var contentDiv = document.getElementById(contentType.value);

  contentDiv.appendChild(div);
  var inputId = contentType.value + 'Input';
  var input = document.getElementById(inputId);
  console.log(input);
  
  var data = [];
  data = JSON.parse(input.value);
  var comp = content.value
  data.push(comp);
  input.value = JSON.stringify(data);
  console.log(input.value);
}

add.addEventListener('click', addContent, false);