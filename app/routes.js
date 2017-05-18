var mongoose = require('mongoose');
var AskDoc = require('./models/askdoc');
var Doc = require('./models/doc');
var Insurence = require('./models/insurence');
var Offer = require('./models/offer');
var Opinion = require('./models/opinion');
var Service = require('./models/service');
var Suggestion = require('./models/suggestion');
var User = require('./models/user');
var Gallary = require('./models/gallary');
var Dashborad = require('./models/dashboard');
var Days = require('./models/days');
var Book = require('./models/booking');
var Admin = require('./models/admin');
var Ourteam = require('./models/ourteam');


var jwt = require('jsonwebtoken');

module.exports = function (app) {
    //var api = express.Router();
    ////////////////error custom format
    function formatedError(err) {
        var count = 0;
        for (var errName in err.errors) {
            count++;
        }
        var replay = [];
        var result;
        var first;
        for (var i = 0; i < count; i++) {
            first = err.errors[Object.keys(err.errors)[i]];
            replay.push({ type: 'error', message: first.message });
        }
        result = { type: "error", errors: replay }
        return result;
    }
     app.get('/user-idregister/:name/:email/:loginway', function (req, res) {
        User.findOne({ name: req.params.name,email:req.params.email,loginway: req.params.loginway }, function (err,user) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (user) {
                    res.json({ code: 100, data: user });
                }
                else{
                    res.json({ code: 20, data:'not data avaliable' });
                }
            }
        });

    });
    
    
  
   app.get('/existname/:name', function (req, res) {
        User.findOne({ name: req.params.name}, function (err,user) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (user) {
                    res.json({ code: 100, data: user });
                }
                else{
                    res.json({ code: 20, data:'not data avaliable' });
                }
            }
        });

    });
  
  
  
 
   app.get('/client-services', function (req, res) {
        Service.find({}, function (err,services) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (services) {
                    res.json({ code: 100, data: services });
                }
                else{
                    res.json({ code: 20, data:'not data avaliable' });
                }
            }
        });

    });
    
    
  
 
  
       app.get('/confirmmobile/:mobileNo', function (req, res) {
        User.findOne({ mobileNo: req.params.mobileNo}, function (err,user) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (user) {
                    res.json({ code: 100, data: user });
                }
                else{
                    res.json({ code: 20, data:'not data avaliable' });
                }
            }
        });

    });

   

  
  
  
   app.get('/client-doc', function (req, res) {
        Doc.find({}, function (err, docs) {
            if (err)
                res.json(formatedError(err));
            else
                res.json({ code: 100, data: docs });
        });


    });
    
    
    
      app.post('/authenticate/user', function (req, res) {

        User.findOne({
            name: req.body.name
        }, function (err, user) {

            if (err) throw err;

            if (!user) {

                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    res.json({ success: true, data: user });
                }

            }

        });

    });
  
       
     app.post('/client-user', function (req, res) {
  
                    
                    var user = new User({
                     name: req.body.name,
                     email: req.body.email,
                     loginway: 'register',
                     mobileNo:req.body.mobileNo,
                     password:req.body.password
               });
            user.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(err);
                }
            }
            else {
                res.json({ code: 100, data: user });
            }
        });
                    
                    
                
         });
         
        
   
    
    
    
  
  
  
  
       app.get('/myanswers/:id', function (req, res) {
        AskDoc.find({answer_creator:req.params.id}, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        })
        .populate('question_creator')
           .populate('answer_creator');
    });
  
  
  
  
    
        app.put('/askdocdoc/:id', function (req, res) {
        AskDoc.findOne({ _id: req.params.id }, function (err, ask) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (ask) {

                    ask.answer = req.body.answer,
                    ask.answer_creator = req.body.answer_creator
                    ask.answered = true
                    ask.save(function (err) {
                        if (err)
                            res.json(formatedError(err));
                        else
                            res.json({ code: 100, data: ask });
                    })
                }
            }
        });

    });
    
    
    


    app.post('/authenticate/doc', function (req, res) {

        Doc.findOne({
        Email: req.body.Email
        }, function (err, user) {

            if (err) throw err;

            if (!user) {

                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.Password != req.body.Password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                         res.json({
                        success: true,
                        message: 'Enjoy your doc!',
                        data:user
                        
                    });
                }

            }

        });

    });
    
    
    
      app.get('/askdocdoc/:answer', function (req, res) {
        AskDoc.find({answered:req.params.answer}, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        })
        .populate('question_creator')
           .populate('answer_creator');
    });
    
    
      
     app.post('/booking', function (req, res) {
        var book = new Book({
            name:req.body.name,
            date: req.body.date,
            creator:req.body.creator,
            mobileNo:req.body.mobileNo,
            note:req.body.note,
            doc:req.body.doc,
            period:req.body.period
        });
        book.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: book });
            }
        });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   app.get('/user-id/:SocialId/:loginway', function (req, res) {
        User.findOne({ SocialId: req.params.SocialId, loginway: req.params.loginway }, function (err,user) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (user) {
                    res.json({ code: 100, data: user });
                }
                else{
                    res.json({ code: 20, data:'not data avaliable' });
                }
            }
        });

    });




      app.get('/client-dashboard', function (req, res) {
        Dashborad.find({}, function (err, images) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (images) {

                    res.json({ code: 100, data: images });
                }


            }

        });

    });



 app.post('/bookin', function (req, res) {
        Book.find({date:req.body.date}, function (err, books) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: books });
        }) .populate('creator')
           .populate('doc');
    });





 app.get('/client-askdoc/:creator', function (req, res) {
        AskDoc.find({question_creator:req.params.creator}, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        }) .populate('question_creator')
           .populate('answer_creator');


    });
   
   
   


 app.post('/askdoc', function (req, res) {
     var askdoc = new AskDoc({
         question: req.body.question,
         question_creator: req.body.question_creator

     });
     askdoc.save(function (err) {
         if (err)
             res.json(formatedError(err));
         else
             res.json({ code: 100, data: askdoc });
     });
        
        
        
 });
  




    app.post('/user', function (req, res) {
        if (req.body.SocialId != null) {
            User.findOne({ SocialId: req.body.SocialId, loginway: req.body.loginway }, function (err, user) {
                if (err) {
                    res.json(formatedError(err));
                }
                else {
                    if (user) {
                        console.log(user);
                        res.json({ type: 21, data: 'user here before ' });
                    }
                    else {
                        var user = new User({
                            name: req.body.name,
                            SocialId: req.body.SocialId,
                            email: req.body.email,
                            url: req.body.url,
                            loginway: req.body.loginway
                        });
                        user.save(function (err) {
                            if (err) {
                                res.json(formatedError(err));
                            }
                            else {
                                res.json({ type: 100, data: user });
                            }
                        });
                    }
                }
            })
        }
    });
    
    
    
   




    app.get('/client-offer', function (req, res) {
        Offer.find({}, function (err, offer) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (offer) {

                    res.json({ code: 100, data: offer });
                }
                else{
                    res.json({ code: 20, data:'not data avaliable' });
                }
                
            
            }

        });

    });

  app.get('/client-ourteam', function (req, res) {
        
        Ourteam.find({}, function (err, ourteam) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (ourteam) {

                    res.json({ code: 100, data: ourteam });
                }
                else{
                    res.json({ code: 20, data:'not data avaliable' });
                }
                
            
            }

        });

    });



  app.post('/client-suggestion', function (req, res) {
        var suggestion = new Suggestion({
            creator: req.body.creator,
            note: req.body.note
          
        });
        suggestion.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: suggestion });
            }
        });
    });







    
      app.get('/client-gallary', function (req, res) {
        Gallary.find({}, function (err, gallary) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (gallary) {

                    res.json({ code: 100, data: gallary });
                }


            }

        });

    });
    
    
    
    
    

    
    
    
    
       app.get('/client-insurence', function (req, res) {
        Insurence.find({}, function (err, insurence) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (insurence) {

                    res.json({ code: 100, data: insurence });
                }
            }

        });

    });
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    app.post('/setup', function (req, res) {

        // create a sample user
        var admin = new Admin({
            email: req.body.email,
            password: req.body.password
            
        });
        admin.save(function (err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });







    app.post('/authenticate', function (req, res) {

        Admin.findOne({
            email: req.body.email
        }, function (err, user) {

            if (err) throw err;

            if (!user) {

                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: 86400  // expires in 24 hours
                    });
                  

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });

    });
 
    app.use(function (req, res, next) {
        // work around to solve option issue !!!
        if (req.method.toLowerCase().indexOf('option') > -1)
            return res.status(200).send({ code: '100', message: 'Option escape' });

        // check header or url parameters or post parameters for token
        var token = req.headers['authentication'];
        console.log(token);
        // decode token 
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ code: '0', message: 'Failed to authenticate token.' });
                }
                else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        }
            // if there is no token
        else {
            // return an error
            return res.status(401).send({ code: '1', message: 'No token provided.' });
            //return res.json({ code: '1',  message: 'No token provided.' });
        }

    });
    
    
    
    
     app.get('/admin', function (req, res) {
        Admin.find({}, function (err, admin) {
            if (err) {
                res.json(formatedError(err));
            } else {
                if (admin) {
                    res.json({ code: 100, data: admin });
                }
                else {
                    res.json({ code: 21, message: 'no admins exist' });
                }
            }
        })
    });
    
    
    
   app.delete('/admin/:id', function (req, res) {
        Admin.findOne({ _id: req.params.id }, function (err, admin) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (admin) {
                    admin.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }
            }
        });

    });
      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ///////////////Test function
    app.get('/', function (req, res) {

        res.json({ type: 'success', data: 'API is working great' });
    });
    ////////////////users

    //// get all usres
    app.get('/user/:loginway', function (req, res) {
        User.find({loginway:req.params.loginway}, function (err, user) {
            if (err) {
                res.json(formatedError(err));
            } else {
                if (user) {
                    res.json({ code: 100, data: user });
                }
                else {
                    res.json({ code: 21, message: 'no users exist' });
                }
            }
        })
    });
    
    
    
      app.get('/user', function (req, res) {
        User.find({}, function (err, user) {
            if (err) {
                res.json(formatedError(err));
            } else {
                if (user) {
                    res.json({ code: 100, data: user });
                }
                else {
                    res.json({ code: 21, message: 'no users exist' });
                }
            }
        })
    });
    //doc....................................................
    // insert  new doc 
    app.post('/doc', function (req, res) {
        var Doctor = new Doc({
            Email: req.body.Email,
            Name: req.body.Name,
            Password: req.body.Password
         

        });
        Doctor.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });

                }
                else {
                    res.json(formatedError(err));
                }

            }
            else {
                res.json({ code: 100, data: Doctor });
            }
        });


    });
    //all doc 
    app.get('/doc', function (req, res) {
        Doc.find({}, function (err, docs) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: docs });
        });


    });
    ///one doc
    app.get('/doc/:id', function (req, res) {
        Doc.find({ _id: req.params.id }, function (err, docs) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: docs });
        });
    });
  app.delete('/doc/:id', function (req, res) {
        Doc.findOne({ _id: req.params.id }, function (err, doc) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (doc) {

                    doc.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    
    ////ask doc..............................................
  



    //all asks 
    app.get('/askdoc', function (req, res) {
        AskDoc.find({}, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        })


    });
   
  
    app.get('/askdoc/:answer', function (req, res) {
        AskDoc.find({answered:req.params.answer}, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        })
        .populate('question_creator')
           .populate('answer_creator');
    });
    
    ///// put 

    //delete
    app.delete('/askdoc/:id', function (req, res) {
        AskDoc.findOne({ _id: req.params.id }, function (err, ask) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (ask) {

                    ask.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    
    /////////////////////our team
      app.post('/ourteam', function (req, res) {
        var ourteam = new Ourteam({
            Name: req.body.Name,
            Desc: req.body.Desc,
            url:req.body.url
        });
        ourteam.save(function (err) {
            if (err)
                res.json(formatedError(err));
            else
                res.json({ code: 100, data: ourteam });
        })
    });
        app.delete('/ourteam/:id', function (req, res) {
        Ourteam.findOne({ _id: req.params.id }, function (err, member) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (member) {

                    member.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });

    
       app.get('/ourteam', function (req, res) {
        Ourteam.find({}, function (err, ourteam) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: ourteam });
        });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    ///////////////dashboard
      app.post('/dashboard', function (req, res) {
        var dashboard = new Dashborad({
            url: req.body.url
        });
        dashboard.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data:dashboard  });
            }
        });
    });
    ////  remove
    app.delete('/dashboard/:id', function (req, res) {
        Dashborad.findOne({ _id: req.params.id }, function (err, dashboard) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (dashboard) {

                    dashboard.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    ////get all 
    app.get('/dashboard', function (req, res) {
        Dashborad.find({}, function (err, dashboard) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (dashboard) {

                    res.json({ code: 100, data: dashboard });
                }


            }

        });

    });

    
    
    
    
    
    
    
    
    /////////////// gallary ....................................
    ///post
    app.post('/gallary', function (req, res) {
        var gallary = new Gallary({
            url: req.body.url
        });
        gallary.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data:gallary  });
            }
        });
    });
    ////  remove
    app.delete('/gallary/:id', function (req, res) {
        Gallary.findOne({ _id: req.params.id }, function (err, gallary) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (gallary) {

                    gallary.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    ////get all 
    app.get('/gallary', function (req, res) {
        Gallary.find({}, function (err, gallary) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (gallary) {

                    res.json({ code: 100, data: gallary });
                }


            }

        });

    });


    //////////insurence 
    app.post('/insurence', function (req, res) {
        var insurence = new Insurence({
            Name: req.body.Name,
            Desc: req.body.Desc,
            url: req.body.url
        });
        insurence.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: insurence });
            }
        });
    });
    
    
    ////  remove
    app.delete('/insurence/:id', function (req, res) {
        Insurence.findOne({ _id: req.params.id }, function (err, insurence) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (insurence) {

                    insurence.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    //edited insurence
    app.put('/insurence/:id', function (req, res) {
        Insurence.findOne({ _id: req.params.id }, function (err, insurence) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (insurence) {
                    insurence.Name = req.body.Name,
                    insurence.Desc = req.body.Desc,
                    insurence.PhotoUrl = req.body.PhotoUrl

                    insurence.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: insurence });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/insurence', function (req, res) {
        Insurence.find({}, function (err, insurence) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (insurence) {

                    res.json({ code: 100, data: insurence });
                }
            }

        });

    });
    //////services 
        app.post('/services', function (req, res) {
        var service = new Service({
            name: req.body.name,
            desc: req.body.desc,
            url : req.body.url
         
        });
        service.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: service });
            }
        });
    });
    
    
    
        app.get('/services', function (req, res) {
        Service.find({}, function (err, service) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (service) {

                    res.json({ code: 100, data: service });
                }
            }

        });

    });
    
        app.delete('/services/:id', function (req, res) {
        Service.findOne({ _id: req.params.id }, function (err, service) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (service) {

                    service.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });

    

    
    
    
    

    
    

    /////////offers
    //post offers
    app.post('/offer', function (req, res) {
        var offers = new Offer({
            Name: req.body.Name,
            PriceBefore: req.body.PriceBefore,
            PriceAfter: req.body.PriceAfter,
            Details:req.body.Details,
            url:req.body.url
        });
        offers.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: offers });
            }
        });
    });
    ////  remove
    app.delete('/offer/:id', function (req, res) {
        Offer.findOne({ _id: req.params.id }, function (err, offer) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (offer) {

                    offer.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    //edited offer
    app.put('/offer/:id', function (req, res) {
        Offer.findOne({ _id: req.params.id }, function (err, offer) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (offer) {

                    offer.Name = req.body.Name,
                       offer.Dep = req.body.Dep,
                       offer.PriceBefore = req.body.PriceBefore,
                       offer.PriceAfter = req.body.PriceAfter,
                       offer.ExpireDate = req.body.ExpireDate,
                       offer.status = req.body.status



                    offer.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: offer });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/offer', function (req, res) {
        Offer.find({}, function (err, offer) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (offer) {

                    res.json({ code: 100, data: offer });
                }
            }

        });

    });
    ////  GET OFFERS  NOT  EXPIRED  AND STATUS  ENABLE
    app.get('/rightoffer', function (req, res) {
        Offer.find({ status: 'Enable', ExpireDate: { $gt: Date.now() } }, function (err, offer) {
            if (err) {
                res.json(err)
            }
            else {
                if (offer) {

                    res.json({ code: 100, data: offer });
                }
            }

        });

    });

    ////////////////OPINION
    app.post('/opinion', function (req, res) {
        var opinion = new Opinion({
            Creator: req.body.Creator,
            text: req.body.text

        });
        opinion.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: opinion });
            }
        });
    });
    ////  remove
    app.delete('/opinion/:id', function (req, res) {
        Opinion.findOne({ _id: req.params.id }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    opinion.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    //edited offer
    app.put('/opinion/:id', function (req, res) {
        Opinion.findOne({ _id: req.params.id }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {


                    opinion.text = req.body.text,
                    opinion.status = req.body.status




                    opinion.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: opinion });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/opinion', function (req, res) {
        Opinion.find({}, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    res.json({ code: 100, data: opinion });
                }
            }

        });

    });
    ///////// get  all status true
    /////  problem  here  !!!!!!!!!!!!!!!! 
    app.get('/opinion_with_status', function (req, res) {

        Opinion.find({ status: true }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    res.json({ code: 100, data: opinion });
                }
            }

        });

    });

    ////////get all  status false
    app.get('/opinion_with_status_flase', function (req, res) {
        Opinion.find({ status: false }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    res.json({ code: 100, data: opinion });
                }
            }

        });

    });

    ////  rating
    app.post('/rating', function (req, res) {
        var rating = new Rating({
            creator: req.body.creator,
            rating: req.body.rating,
            depid: req.body.depid
        });
        rating.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: rating });
            }
        });
    });

    //edited offer
    app.put('/rating/:id', function (req, res) {
        Rating.findOne({ _id: req.params.id }, function (err, rate) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (rate) {
                    rate.rating = req.body.rating

                    rate.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: rate });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/rating', function (req, res) {
        Rating.find({}, function (err, rating) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (rating) {

                    res.json({ code: 100, data: rating });
                }
            }

        });

    });
    /////////// Suggestion
    app.post('/suggestion', function (req, res) {
        var suggestion = new Suggestion({
            creator: req.body.creator,
            note: req.body.note
          
        });
        suggestion.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: suggestion });
            }
        });
    });
    ////get all 
    app.get('/suggestion', function (req, res) {
        Suggestion.find({}, function (err, suggestion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (suggestion) {

                    res.json({ code: 100, data: suggestion });
                }
            }

        })
        .populate('creator');
;

    });
    /////////////////////////////////////////////////////days
    /////////// days
    app.post('/days', function (req, res) {
        var day = new Days({
            day: req.body.day,
            Time: [{
                from: req.body.from,
                to: req.body.to
            }],
            dep: req.body.dep
        });
        day.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: day });
            }
        });
    });
    ////get all 
    app.get('/days/:daystring', function (req, res) {
        Days.findOne({ day: req.params.daystring }, function (err, day) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (day) {

                    res.json({ code: 100, data: day });
                }
            }

        });

    });

    //////////get all days
    app.get('/days', function (req, res) {
        Days.find({}, function (err, day) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (day) {

                    res.json({ code: 100, data: day });
                }
            }

        });

    });

    //////update embaded doc
    app.put('/days/:_id/:id', function (req, res) {

        Days.findById(req.params._id, function (err, day) {
            if (err) {
                res.json(formatedError(err));
            }
            else {
                var time = day.Time.id(req.params.id);
                time.from = req.body.from,
                time.to = req.body.to;

                day.save(function (err) {
                    if (err) {
                        res.json(formatedError(err));
                    } else {
                        res.json({ code: 100, data: day });
                    }
                });
            }
        });
    });

    //////////////////////////////////////////////////////////booking
   
    
    ///// get 
    app.get('/booking/:date/:dep', function (req, res) {
        Book.find({ date: req.params.date, dep: req.params.dep }, function (err, books) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (books) {

                    res.json({ code: 100, data: books });
                }
            }

        });

    });
    ///////// remove 
    app.delete('/booking/:id', function (req, res) {
        Book.findOne({ _id: req.params.id }, function (err, book) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (book) {

                    book.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });

};

