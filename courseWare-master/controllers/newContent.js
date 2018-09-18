var Subject = require('../models/subject');
var Chapter = require('../models/chapter');
var Topic = require('../models/topic');
var async = require('async');

//HAndle GET for newsubject
exports.newSubjectGET = function (req, res, next){
    res.render('new-subject', {message: req.flash('message'), user: req.user, title: 'Course hub'});
}

function subjectCreate(req, res, next, subject_name, category, sub_category, references) {
    var subjectDetail = {
        name: subject_name,
        category: category,
        sub_category: sub_category,
        references: references
    }

    Subject.findOne({ 'name': subjectDetail.name }).exec(function (err, subject) {
        if (err) return next(err);
        if (subject) {
            var err = new Error('Subject already exist');
            return next(err);
        } else {
            var newSubject = new Subject(subjectDetail);
            newSubject.save(function (err) {
                if (err) {
                    return next(err);
                }
                console.log('New Subject: ' + subject);
                res.send("New Subject Created");
            });
        }
    });
}

//Handle POST for newsubject
exports.newSubjectPOST = function(req, res, next){
    subjectCreate(req, res, next, req.body.subjectName, req.body.branch, Number(req.body.semester), JSON.parse(req.body.references), JSON.parse(req.body.practicals), JSON.parse(req.body.teachernotes), JSON.parse(req.body.previousyearquestionpapers));
}

//HAndle GET for newsubject
exports.newChapterGET = function (req, res, next){
    Subject.find().select('name').exec(function(err, subjects){
        if(err) return next(err);
        if(subjects[0]){
            res.render('new-chapter', {message: req.flash('message'), user: req.user, title: 'Course hub', subjects: subjects});            
        } else {
            var err = new Error('No Subject Exist');
            return next(err);
        }
    });
}



function chapterCreate(req, res, next, subjectName, chapterNames) {
    var createChapters = [];

    for (var i = 0; i < chapterNames.length; i++) {
        createChapters.push((function (i, chapterName) {
            //We are returning the actual task function here with enclosed scope containing 'i'
            return function(callback){
                console.log(chapterName.name);
                var chapterDetail = {
                    name: chapterName.name
                }
                var chapter = new Chapter(chapterDetail);
                chapter.save(function (err, chapter) {
                    if (err) {
                        return next(err);
                    }
                    console.log('New Chapter: ' + chapter);
                    callback(null, chapter);
                });
            }
        })(i, chapterNames[i]));
    };


    var chapters = [];

    async.series(
        createChapters,
        function (err, results) {
            if (err) return next(err);
            chapters = results;
            console.log(chapters);
            Subject.findOne({ _id: subjectName }).exec(function (err, subject) {
                if (err) return next(err);
                if (subject) {
                    for(var i=0; i<subject.chapters.length; i++){
                        chapters.push(subject.chapters[i]);
                    }
                    var updateSubject = {
                        chapters: chapters
                    }
                    console.log(updateSubject);
                    Subject.findOneAndUpdate({ _id: subjectName }, updateSubject, { new: true }, function (err, subject) {
                        if (err) return next(err);
                        if (subject) {
                            res.send(subject);
                        } else {
                            res.send("chapters not added to subject");
                        }
                    });
                } else {
                    res.send('No such subject Found');
                }
            });
        });
}

//HAndle POST for newsubject
exports.newChapterPOST = function (req, res, next){
    var subject = req.body.subject;

    chapterCreate(req, res, next, subject, JSON.parse(req.body.chapters));
}

//Handle get for new topic
exports.newTopicGET = function(req, res, next){
    Subject.find().select('name chapters').populate({
        path: 'chapters',
        model: 'Chapter',
        select: 'name'
    }).exec(function(err, subjects){
        if(err) return next(err);
        if(subjects[0]){
            res.render('new-topic', {message: req.flash('message'), user: req.user, title: 'Course hub', subjects: JSON.stringify(subjects)})
        } else {
            var err = new Error('No subjects exist');
            return next(err);
        }
    });
}

function topicCreate(req, res, next, subject, chapter, topic, notes, videos, summary) {
    var topics = [];

    var topicdetail = {
        name: topic,
        notes: notes,
        videos: videos,
        summary: summary
      }
    
      var topic = new Topic(topicdetail);
      topic.save(function (err) {
        if (err) {
          console.log('ERROR CREATING Topic: ' + topic);
          return next(err);
        }
        console.log('New Topic: ' + topic);
        Chapter.findById(chapter).exec(function(err, chapter){
            if(err) return next(err);
            if(chapter){
                for(var i=0; i<chapter.topics.length; i++){
                    topics.push(chapter.topics[i]);
                }
                topics.push(topic);
                Chapter.findByIdAndUpdate(chapter._id, {topics: topics}, {new: true}, function(err, chapter){
                    if(err) return next(err);
                    if(chapter){
                        res.send(chapter);
                    }
                });
            } else {
                var err = new Error('Chapter not found');
                return next(err);
            }
        })
      });
}

//handle post for new topic
exports.newTopicPOST = function(req, res, next){
    topicCreate(req, res, next, req.body.subject, req.body.chapter, req.body.topic, JSON.parse(req.body.notes), JSON.parse(req.body.videos), JSON.parse(req.body.summary));
}