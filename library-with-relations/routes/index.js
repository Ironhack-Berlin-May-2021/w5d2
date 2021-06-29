const router = require("express").Router();

/* GET home page */
// router.get("/:password", (req, res, next) => {
//   if (req.params.password === '123') {
//     res.send('access granted');
//   } else {
//     res.send('you are not allowed to do that');
//   }
//   // res.render("index");
// });

router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
