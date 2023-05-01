    // normal routes ===============================================================
    
        // show the home page (will also have our login links)
        app.get('/', function(req, res) {
            res.render('index.ejs');
        });
    
        // Different Screens =========================
        app.get('/dash', isLoggedIn, function(req, res) {
            db.collection('#').find().toArray((err, result) => {
              if (err) return console.log(err)
              res.render('dash.ejs', {
                
              })
            })
        });
        app.get('/calendar', isLoggedIn, function(req, res) {
            db.collection('#').find().toArray((err, result) => {
              if (err) return console.log(err)
              res.render('calendar.ejs', {
                
              })
            })
        });
        app.get('/watch', isLoggedIn, function(req, res) {
            db.collection('#').find().toArray((err, result) => {
              if (err) return console.log(err)
              res.render('watch.ejs', {
                
              })
            })
        });
        app.get('/profile', isLoggedIn, function(req, res) {
            db.collection('#').find().toArray((err, result) => {
              if (err) return console.log(err)
              res.render('profile.ejs', {
                
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
    
    // routes ===============================================================
    
        app.post('/#', (req, res) => {
          db.collection('#').save({}, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
            res.redirect('/profile')
          })
        })
    
        app.put('/#', (req, res) => {
          db.collection('#')
          .findOneAndUpdate({}, {
            $set: {
              
            }
          }, {
            sort: {_id: -1},
            upsert: false
          }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
          })
        })
    
        app.delete('/#', (req, res) => {
          db.collection('#').findOneAndDelete({}, (err, result) => {
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
                successRedirect : '/profile', // redirect to the secure profile section
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
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/signup', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));
 