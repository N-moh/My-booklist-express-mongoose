const createError = require("http-errors")
const  ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const {Book} = require('./models/books')


exports.index = async function (req, res){
    Book.find()
        .then( books => res.send(books))
   
}


exports.create =async function (req, res, next){
    if (!req.body.title){
        return(next(createError(400,"title is required")))
    }
    if (!req.body.author){
        return(next(createError(400,"author is required")))
    }
    if (!req.body.url){
        return(next(createError(400,"url is required")))
    }
    if (!req.body.bookStatus){
        return(next(createError(400,"bookStatus is required")))
    }
    const book= new Book({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        bookStatus: req.body.bookStatus
    })
    book.save()
    .then( () => res.send({result:true}) )
    }

    exports.show = async function (req, res, next){
        Book.findOne({ _id: ObjectId( req.params.id)})
    .then( (bookItem)=> {
        if(!bookItem){
            return (next(createError(404,"no book with that id")))
            }
            res.send(bookItem);

      })

      }

    exports.byTitle = async function(req,res){
    
        res.send(await Book.find({title:req.params.title}));
      };

    exports.byAuthor = async function(req,res){
        
            res.send(await Book.find({author:req.params.author}));
          };

    exports.update = async function (req,res,next){
        
        Book.findOne({ _id: ObjectId( req.params.id)})
        .then( (bookItem)=> {
        if(!bookItem){
            return (next(createError(404,"no book with that id")))
            }
           
            bookItem.title = req.body.title
            bookItem.author = req.body.author
            bookItem.url = req.body.url,
            bookItem.bookStatus = req.body.bookStatus
            bookItem.save()
            .then (() => res.send({result:true}))

            })
           }
        
    exports.delete = function (req,res,next) {
        Book.deleteOne({ _id: ObjectId(req.params.id)})
        .then( (r) =>{
            if(r.deletedCount){
                return res.send({result:true});
            }
            return (next(createError(404,"no book with that id")))
    
        })
        .catch( (err)  => console.log(err))
        
    }
        