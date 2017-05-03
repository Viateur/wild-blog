/*
This file define controller for Post, this class extend from Controller class.
With this extended class, this class obtain all methodd from parent class
*/
'use strict'
// Require parent class
let Controller = require('./Controller');
// Require model (schema) use with this controller
let Post = require('../models/post')

class PostsController extends Controller {


    constructor() {
        super(Post)
    }
    // find articles published
    findPublishedArticles(req, res, next) {
        this.model.find({
            published: true
        }, (err, documents) => {
            res.json(documents);
        });
    }

    // find article by Id if published
    findPublishedArticleById(req, res, next) {
        this.model.findById(req.params.id, (err, document) => {
            if (err)
                next(err);
            else {
                if (document.published) {
                      res.json(document);
                } else {
                  return res.status("403").send("Article not yet published")
                }
              }
        });
    }

}


module.exports = PostsController
