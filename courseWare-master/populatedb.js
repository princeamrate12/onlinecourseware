#! /usr/bin/env node
/* © Mufaddal Kamri */

/*
console.log('This script populates some test products, users and bids to our database. Specified database as argument - e.g.: populatedb mongodb://mufaddalkamri4:asdfzxcv1234@ds253468.mlab.com:53468/online-auction-system');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return
}
*/

var async = require('async')
var Subject = require('./models/subject')
var Chapter = require('./models/chapter')
var Topic = require('./models/topic')


var mongoose = require('mongoose');
var mongoDB = 'mongodb://princeamrate12:Princecse2@ds117469.mlab.com:17469/online-course-ware';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var subjects = []
var chapters = []
var topics = []

function subjectCreate(subject_name, branch, sem, chapters, references, practicals, teacher_notes, previous_question_papers, cb) {
  var subjectDetail = {
    name: subject_name,
    branch: branch,
    sem: sem,
    chapters: chapters,
    references: references,
    practicals: practicals,
    teacher_notes: teacher_notes,
    previous_question_papers: previous_question_papers
  }

  var subject = new Subject(subjectDetail);

  subject.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Subject: ' + subject);
    subjects.push(subject)
    cb(null, subject)
  });
}

function chapterCreate(name, topics, cb) {
  var chapterDetail = {
    name: name,
    topics: topics
  }
  var chapter = new Chapter(chapterDetail);
  chapter.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Chapter: ' + chapter);
    chapters.push(chapter)
    cb(null, chapter)
  });
}


function topicCreate(name, notes, videos, summary, cb) {
  var topicdetail = {
    name: name,
    notes: notes,
    videos: videos,
    summary: summary
  }

  var topic = new Topic(topicdetail);
  topic.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Topic: ' + topic);
      cb(err, null)
      return
    }
    console.log('New Topic: ' + topic);
    topics.push(topic)
    cb(null, topic)
  });
}

function createTopics(cb) {
  async.series([
    function (callback) {
      topicCreate("Software Product and Process Characteristics",["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et purus egestas ipsum viverra laoreet. Fusce vulputate libero ipsum, nec ultricies enim iaculis et. Nam rutrum et sem ut accumsan. Integer in placerat elit. Donec commodo magna mi, eu suscipit tellus consectetur id. Quisque risus lacus, feugiat sit amet justo quis, consequat interdum diam. Curabitur accumsan aliquam augue, et ornare felis porttitor a. Pellentesque et dui rutrum, mattis tortor et, dignissim justo. Donec imperdiet elit eu tellus rhoncus suscipit. Cras ullamcorper libero sit amet consectetur dictum. Proin sit amet consectetur leo. Aenean rutrum nisi et sodales dignissim. Curabitur tortor nunc, consectetur id eros eget, pellentesque fringilla enim. Quisque odio augue, porta id auctor non, elementum sit amet mi. Donec laoreet nisi sapien, quis tincidunt risus tempus non. Phasellus vitae gravida purus. ", "Nullam ac lacinia tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi bibendum maximus ex, eget bibendum ligula ultrices non. Aliquam lacinia non sem non posuere. Donec facilisis augue a eros pretium, eget consectetur purus laoreet. Duis ullamcorper purus in porta pharetra. Proin quis magna sem. Nunc bibendum, nisi ac tempor pharetra, leo ligula malesuada libero, ut volutpat magna velit ut est. Sed convallis sem in lacus sagittis rutrum. In hac habitasse platea dictumst. Aenean egestas mi eu dolor porta tempus. ", "Morbi mauris enim, viverra ac orci eu, euismod sagittis lacus. Phasellus mi purus, facilisis eget commodo sit amet, efficitur id odio. Cras lorem magna, semper id massa sodales, imperdiet laoreet eros. Etiam a finibus purus, sed varius neque. Ut at metus sem. Nunc aliquet eget nibh in consequat. Nam eget pulvinar massa, at dapibus felis. Maecenas pharetra sit amet nisl a lacinia. Fusce at diam ut ligula egestas maximus. Nam efficitur augue ac scelerisque porta. ", "Duis sed nunc lectus. Curabitur nec massa vulputate, tincidunt ex et, gravida mi. Praesent suscipit hendrerit ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum risus eros, quis ultricies lectus gravida sit amet. Morbi diam nulla, dignissim sit amet consequat faucibus, ullamcorper nec augue. Phasellus sagittis purus a lacus dapibus euismod. Curabitur nec justo eget lectus feugiat sollicitudin dapibus nec urna. Maecenas consequat ex et orci consequat fermentum. Donec auctor vestibulum leo. Morbi ut odio ut odio faucibus rutrum non ut lacus. Pellentesque ullamcorper sapien sed turpis semper luctus. Nullam aliquet diam vitae arcu interdum porttitor. Etiam nec felis aliquam eros congue fringilla vitae ut ex. Duis cursus eros id nunc lobortis finibus. ", "Donec sit amet eros nibh. Etiam eu varius massa. Proin volutpat egestas sollicitudin. Praesent enim erat, interdum a fringilla vitae, maximus vel nibh. Mauris ac porttitor diam. Etiam ullamcorper tellus nec orci auctor, sed sagittis lorem bibendum. Etiam vehicula urna risus, sed consequat metus commodo at. Fusce id augue quis diam finibus mollis. "], ["D13bVQa0V4I"], ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et purus egestas ipsum viverra laoreet. Fusce vulputate libero ipsum, nec ultricies enim iaculis et. Nam rutrum et sem ut accumsan. Integer in placerat elit. Donec commodo magna mi, eu suscipit tellus consectetur id. Quisque risus lacus, feugiat sit amet justo quis, consequat interdum diam. Curabitur accumsan aliquam augue, et ornare felis porttitor a. Pellentesque et dui rutrum, mattis tortor et, dignissim justo. Donec imperdiet elit eu tellus rhoncus suscipit. Cras ullamcorper libero sit amet consectetur dictum. Proin sit amet consectetur leo. Aenean rutrum nisi et sodales dignissim. Curabitur tortor nunc, consectetur id eros eget, pellentesque fringilla enim. Quisque odio augue, porta id auctor non, elementum sit amet mi. Donec laoreet nisi sapien, quis tincidunt risus tempus non. Phasellus vitae gravida purus. ", "Nullam ac lacinia tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi bibendum maximus ex, eget bibendum ligula ultrices non. Aliquam lacinia non sem non posuere. Donec facilisis augue a eros pretium, eget consectetur purus laoreet. Duis ullamcorper purus in porta pharetra. Proin quis magna sem. Nunc bibendum, nisi ac tempor pharetra, leo ligula malesuada libero, ut volutpat magna velit ut est. Sed convallis sem in lacus sagittis rutrum. In hac habitasse platea dictumst. Aenean egestas mi eu dolor porta tempus. "], callback);
    },
    function (callback) {
      topicCreate("Software Process Models: Linear Sequential Model", ["Pellentesque ut dapibus augue. Ut sit amet elit bibendum, vestibulum elit vitae, pharetra lacus. Nam ac tellus dolor. Donec rutrum suscipit tortor, auctor auctor odio feugiat vitae. Nulla scelerisque quam sed lorem auctor volutpat. In quis aliquam augue. Vestibulum a nibh non tellus facilisis egestas a at leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam vitae laoreet justo.", "Proin nisi orci, dictum vitae odio vitae, ullamcorper tincidunt tortor. Pellentesque finibus ullamcorper eros, vitae tincidunt tortor iaculis a. Nulla at fermentum mi, in pellentesque massa. Maecenas ullamcorper ut est vitae mollis. Phasellus ac viverra nunc, sit amet scelerisque orci. Nulla venenatis ultrices ligula, at molestie augue tristique id. Pellentesque sit amet neque eros. Morbi ornare eget velit non dictum. Nunc dictum, enim vitae lobortis lacinia, magna lacus viverra magna, quis mollis metus lectus vel dolor. Proin eget metus tortor. Duis felis arcu, tempus ut tincidunt nec, pharetra in erat. Fusce tristique dui a lacus pulvinar, sed posuere nunc tempus. ", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sollicitudin est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin consequat sit amet risus et egestas. Nunc est ipsum, volutpat et consectetur id, auctor in libero. Aliquam ac sem cursus, rutrum erat sed, gravida justo. Morbi ut justo a diam placerat vulputate vitae sit amet nulla. Curabitur ultrices, magna vitae tristique porttitor, erat metus viverra lacus, ut volutpat enim lacus a mauris. Ut sollicitudin mi id nibh fermentum, eu tristique urna malesuada. Nullam est mauris, euismod id augue venenatis, tristique tincidunt lacus. Proin eget blandit velit. Nullam dignissim risus sit amet nisi auctor, ac hendrerit tortor accumsan. Ut sodales, sem quis egestas lobortis, urna arcu euismod leo, id vehicula sem mauris quis elit. ", "Donec id faucibus tellus, vel posuere urna. Donec porttitor mi est. Nulla ligula felis, dictum vel ante et, rhoncus condimentum turpis. Praesent auctor arcu lorem, eu lacinia metus posuere eget. Vivamus aliquam congue ligula, id euismod tellus ornare auctor. Aenean id ligula non diam rhoncus fermentum. Sed sit amet tellus vitae mauris gravida vehicula. Pellentesque finibus facilisis fermentum. ", "Etiam scelerisque turpis mauris, eget feugiat risus porttitor et. Duis a venenatis risus. Phasellus id faucibus sem, vitae luctus mauris. Vivamus sit amet ligula nisl. Proin mollis diam ut turpis egestas suscipit. Vivamus vel massa vulputate, posuere nibh non, efficitur quam. Sed varius sapien id efficitur luctus. Vivamus consequat ac diam nec posuere. Praesent rutrum risus consequat sollicitudin vulputate. Sed sit amet imperdiet orci. Nulla vel pretium lorem, at pellentesque ligula. Fusce ultricies nunc id felis egestas blandit. Donec sit amet augue eu lorem sodales fringilla sed quis lectus. In eu aliquam nibh. Aenean aliquam ipsum vitae mollis ornare. "], ["BRrBInDtcvk"], ["Pellentesque ut dapibus augue. Ut sit amet elit bibendum, vestibulum elit vitae, pharetra lacus. Nam ac tellus dolor. Donec rutrum suscipit tortor, auctor auctor odio feugiat vitae. Nulla scelerisque quam sed lorem auctor volutpat. In quis aliquam augue. Vestibulum a nibh non tellus facilisis egestas a at leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam vitae laoreet justo.", "Proin nisi orci, dictum vitae odio vitae, ullamcorper tincidunt tortor. Pellentesque finibus ullamcorper eros, vitae tincidunt tortor iaculis a. Nulla at fermentum mi, in pellentesque massa. Maecenas ullamcorper ut est vitae mollis. Phasellus ac viverra nunc, sit amet scelerisque orci. Nulla venenatis ultrices ligula, at molestie augue tristique id. Pellentesque sit amet neque eros. Morbi ornare eget velit non dictum. Nunc dictum, enim vitae lobortis lacinia, magna lacus viverra magna, quis mollis metus lectus vel dolor. Proin eget metus tortor. Duis felis arcu, tempus ut tincidunt nec, pharetra in erat. Fusce tristique dui a lacus pulvinar, sed posuere nunc tempus. ", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sollicitudin est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin consequat sit amet risus et egestas. Nunc est ipsum, volutpat et consectetur id, auctor in libero. Aliquam ac sem cursus, rutrum erat sed, gravida justo. Morbi ut justo a diam placerat vulputate vitae sit amet nulla. Curabitur ultrices, magna vitae tristique porttitor, erat metus viverra lacus, ut volutpat enim lacus a mauris. Ut sollicitudin mi id nibh fermentum, eu tristique urna malesuada. Nullam est mauris, euismod id augue venenatis, tristique tincidunt lacus. Proin eget blandit velit. Nullam dignissim risus sit amet nisi auctor, ac hendrerit tortor accumsan. Ut sodales, sem quis egestas lobortis, urna arcu euismod leo, id vehicula sem mauris quis elit. "], callback);
    }
  ],
    // optional callback
    cb);
}


function createChapters(cb) {
  async.series([
    function (callback) {
      chapterCreate("The Software Product and Software Process", [topics[0], topics[1]], callback);
    }
  ],
    // optional callback
    cb);
}


function createSubjects(cb) {
  async.series([
    function (callback) {
      subjectCreate("Software Engineering Project Management", "cse", 6, [chapters[0]], [{ name: 'Fundamentals of Software Engineering', url: 'https://storage.googleapis.com/ocw-content/fundamentals-of-software-engineering.pdf' }, { name: 'An Integrated Approach to Software Engineering', url: 'https://storage.googleapis.com/ocw-content/fundamentals-of-software-engineering.pdf' }], [{ name: 'Identifying the requirements from problem statements', url: 'https://storage.googleapis.com/ocw-content/sepm-experiment-1.docx' }, { name: 'Estimation of project metrics', url: 'https://storage.googleapis.com/ocw-content/sepm-experiment-1.docx' }], [{ name: 'Unit 1', url: 'https://storage.googleapis.com/ocw-content/sepm-teacher-notes-unit-1.pdf' }, { name: 'Unit 5 ', url: 'https://storage.googleapis.com/ocw-content/sepm-teacher-notes-unit-1.pdf' }], [{ name: '2016', url: 'https://storage.googleapis.com/ocw-content/sepm-previous-year-question-paper-2016.pdf' }], callback);
    }
  ],
    // Optional callback
    cb);
}



async.series([
  createTopics,
  createChapters,
  createSubjects
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log("sab dal gya");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });