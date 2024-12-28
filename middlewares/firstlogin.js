

function firstLogin(req, res, next) {
   if (req.cookies && req.cookies.user) {
      
       next();
   } else {
       res.redirect('/home?alert=firstLogin');
   }
}

module.exports= firstLogin;
