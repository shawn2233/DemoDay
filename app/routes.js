module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // APP SECTIONS =========================

    //homepage
    app.get('/dashboard', function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          console.log(req.user)
         res.render('dashb.ejs', {
        user : req.user
          })
        })
    });

    //newsfeed
    app.get('/newsfeed', isLoggedIn, function(req, res) {
      db.collection('messages').find().toArray((err, result) => {
        if (err) return console.log(err)

        let myMessages = result.filter(doc => doc.name === req.user.local.email)

        res.render('newsfeed.ejs', {
          user : req.user,
          messages: result,
          myMessages : myMessages,
          lastDoc : result[result.length -1]
        })
      })
  });

  //account section
    app.get('/account', function(req, res) {
      db.collection('messages').find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log(req.user)
       res.render('account-profile.ejs', {
        user : req.user
        })
      })
  });

  app.get('/notifications', function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      console.log(req.user)
     res.render('account-notifications.ejs', {
      user : req.user
      })
    })
});

app.get('/security', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('account-security.ejs', {
    user : req.user
    })
  })
});

//APP features
app.get('/watch', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('watch.ejs', {
    user : req.user
    })
  })
});
app.get('/cal', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('cal.ejs', {
    user : req.user
    })
  })
});

//party features
app.get('/create', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('create.ejs', {
    user : req.user
    })
  })
});
app.get('/join', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('join.ejs', {
    user : req.user
    })
  })
});
app.get('/select', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('select.ejs', {
    user : req.user
    })
  })
});

//User management
app.get('/add', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('userAdd.ejs', {
    user : req.user
    })
  })
});
app.get('/list', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('userList.ejs', {
    user : req.user
    })
  })
});
app.get('/friends', function(req, res) {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(req.user)
   res.render('friendList.ejs', {
    user : req.user
    })
  })
});







    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// newsfeed routes ===============================================================


    app.post('/addMessages', (req, res) => {
      db.collection('messages').save({name: req.body.name, msg: req.body.msg,thumbUp:""}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/newsfeed')
      })
    })
    
    app.put('/messages/thumbDown', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:"-reposted"
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
