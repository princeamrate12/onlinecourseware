var Subject = require('../models/subject');
var Chapter = require('../models/chapter');
var Topic = require('../models/topic');
var async = require('async');

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

//Display Root Home Page on GET 
exports.index = function (req, res, next) {
    res.render('index', {title: "Course Ware", message: req.flash('message'), user: req.user});
};

// Display sem wise subject list on GET.
exports.sem_wise_subjects = function (req, res, next) {
    var branch = req.params.branch_name;
    Subject.find({branch: branch}).select('name sem').exec(function(err, subjects){
        if(err) return next(err);
        if(!subjects[0]){
            return next(err);
        } else {
            res.render('sem-wise-subjects',{message: req.flash('message'), user: req.user, title: getBranchName(branch), branch: branch, subjects: subjects, user: req.user})
        }
    });
};

//Display particular sem subjects of a branch
exports.particular_sem_subjects = function(req, res, next){
    var branch = req.params.branch_name;
    var sem = req.params.sem;
    Subject.find({branch: branch, sem: sem}).select('name sem').exec(function(err, subjects){
        if(err) return next(err);
        if(!subjects[0]){
            return next(err);
        } else {
            res.render('particular-sem-subjects', {message: req.flash('message'), user: req.user, title: getBranchName(branch), branch: branch, sem: sem, subjects: subjects, user: req.user});
        }
    });
};