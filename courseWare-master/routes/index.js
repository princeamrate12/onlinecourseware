var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

var sub_selection  = require('../controllers/sub_selection');
var content = require('../controllers/content');
var newContent = require('../controllers/newContent');

module.exports = function (passport) {

    /* GET home page. with course creator login */
    router.get('/', sub_selection.index);

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/newcourse',
        failureRedirect: '/',
        failureFlash: true
    }));

    // /* GET Registration Page */
    // router.get('/signup', function (req, res) {
    //     res.render('register', { message: req.flash('message') });
    // });

    // /* Handle Registration POST */
    // router.post('/signup', passport.authenticate('signup', {
    //     successRedirect: '/newcourse',
    //     failureRedirect: '/signup',
    //     failureFlash: true
    // }));

    /* GET New Course Create */
    router.get('/newcourse', isAuthenticated, function (req, res) {
        res.render('new-course', { user: req.user });
    });

    //GET newsubject 
    router.get('/newcourse/newsubject/', isAuthenticated, newContent.newSubjectGET);

    //POST newsubject
    router.post('/newcourse/newsubject/', isAuthenticated, newContent.newSubjectPOST);

    //GET newchapter
    router.get('/newcourse/newchapter/', isAuthenticated, newContent.newChapterGET);

    //POST newchapter
    router.post('/newcourse/newchapter/', isAuthenticated, newContent.newChapterPOST);

    //GET newtopic
    router.get('/newcourse/newtopic/', isAuthenticated, newContent.newTopicGET);

    //POST newtopic
    router.post('/newcourse/newtopic/', isAuthenticated, newContent.newTopicPOST);

    /* Handle Logout */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    // GET sem wise subjects
    router.get('/:branch_name/', sub_selection.sem_wise_subjects);

    //GET particular sem subjects
    router.get('/:branch_name/:sem/', sub_selection.particular_sem_subjects)

    // GET all chapter details along with subject details
    router.get('/:branch_name/:sem/:subject_name/', content.all_chapter_details);

    //GET redirect on subject details or all chapters detail page
    router.get('/:branch_name/:sem/:subject_name/:chapter_name/', content.particular_chapter_details);

    // GET topic content .
    router.get('/:branch_name/:sem/:subject_name/:chapter_name/:topic_name/', content.topic_content);

    return router;
}
