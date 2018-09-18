var Subject = require('../models/subject');
var Chapter = require('../models/chapter');
var Topic = require('../models/topic');
var async = require('async');


function titleCase(str){
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

function getBranchName(str){
    if (str == 'cse'){
        return 'Computer Science & Engineering';
    } else if (str == 'ece'){
        return 'Electrical & Electronics Engineering';
    } else if (str == 'mech'){
        return 'Mechanical Engineering';
    } else if (str == 'cve'){
        return 'Civil Engineering';
    } else if (str == 'che'){
        return 'Chemical Engineering';
    }
}

// Display all chapters detail on GET.
exports.all_chapter_details = function (req, res, next) {
    var branch = req.params.branch_name;
    var sem = req.params.sem;
    var subject = req.params.subject_name;
    
    Subject.findOne({ branch: branch, sem: sem, _id: subject }).populate({
        path: 'chapters',
        populate: {
            path: 'topics',
            model: 'Topic',
            select: 'name'
        }
    }).exec(function (err, subject) {
        if (err) return next(err);
        if (subject) {
        res.render('subject', {title: titleCase(subject.name), branchName: getBranchName(branch), branch: branch, sem: sem, subject: subject, user: req.user});
        } else {
            return next(err);
        }
    });
};

//redirect to particular chapter to its subject detail page or all chapters detail page
exports.particular_chapter_details = function(req, res, next){
    res.redirect('/'+req.params.branch_name+'/'+req.params.sem+'/'+req.params.subject_name+'/');
};

function getChapter(cb, chapter, next) {
    Chapter.findOne({ _id: chapter }).populate({
        path: 'topics',
        model: 'Topic',
        select: 'name'
    }).exec(function (err, chapter) {
        if (err) {
            return next(err);
        }
        cb(null, chapter);
    });
}

function getTopic(cb, topic, next){
    Topic.findOne({_id: topic}).exec(function(err, topic){
        if(err){
            return next(err);
        }
        cb(null, topic);
    })
}

// Display topic content on GET.
exports.topic_content = function (req, res, next) {
    var chapterURL = '/'+req.params.branch_name+'/'+req.params.sem+'/'+req.params.subject_name+'/'+req.params.chapter_name+'/';
    var chapter = req.params.chapter_name;
    var topic = req.params.topic_name;

    async.parallel(
        {
            chapter: function (cb){
                getChapter(cb, chapter, next);
            },
            topic: function(cb){
                getTopic(cb, topic, next);
            }
        },
        function(err, result){
            res.render('topic', {title: result.topic.name, chapterURL: chapterURL, chapter: result.chapter, topic: result.topic, user: req.user});
    });
}