const router = require("express").Router();
// ../ to go up one folder
const Book = require('../models/Book');
const Author = require('../models/Author');

router.get('/books', (req, res, next) => {
	// get all the books	
	Book.find()
		.then(booksFromDB => {
			// render a view books
			// console.log(booksFromDB)
			res.render('books', { booksList: booksFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get('/books/add', (req, res, next) => {
	// we need to get all the authors and pass them into the view
	Author.find()
		.then(authorsFromDB => {
			console.log(authorsFromDB);
			res.render('bookForm', { authors: authorsFromDB });
		})
		.catch(err => {
			console.log(err);
		})
});

router.get('/books/:id', (req, res, next) => {
	console.log(req.params.id);
	const bookId = req.params.id;
	// get the book with the clicked id
	Book.findById(bookId)
		.populate('author')
		.then(bookFromDB => {
			console.log(bookFromDB);
			// render the details view
			res.render('bookDetails', { bookDetails: bookFromDB });
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/books', (req, res, next) => {
	// console.log(req.body);
	const { title, author, description, rating } = req.body;
	console.log(title, author, description, rating);
	Book.create({
		title: title,
		description: description,
		author: author,
		rating: rating
	})
		.then(createdBook => {
			console.log(`This book was just created: ${createdBook}`);
			// res.render('bookDetails', { bookDetails: createdBook });
			// this is how you redirect in express
			console.log(`/books/${createdBook._id}`);
			res.redirect(`/books/${createdBook._id}`);
		})
});

// this displays the edit form
router.get('/books/edit/:id', (req, res, next) => {
	// retrieve the book that should be edited	
	const bookId = req.params.id;
	Book.findById(bookId)
		.then(bookFromDB => {
			console.log(bookFromDB);
			// render a form with the book details
			res.render('bookEdit', { book: bookFromDB });
		})
});


router.post('/books/edit/:id', (req, res, next) => {
	const bookId = req.params.id;
	const { title, author, description, rating } = req.body;
	Book.findByIdAndUpdate(bookId, {
		title,
		author,
		description,
		rating
	})
		.then(() => {
			res.redirect(`/books/${bookId}`);
		})
		.catch(err => {
			console.log(err);
		})
});

router.get('/books/delete/:id', (req, res, next) => {
	const bookId = req.params.id;
	// delete this book	
	Book.findByIdAndDelete(bookId)
		.then(() => {
			// redirect to the books list
			res.redirect('/books');
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/books/:id/reviews', (req, res, next) => {
	const bookId = req.params.id;
	const { user, text } = req.body;
	Book.findByIdAndUpdate(bookId, { $push: { reviews: { user: user, text: text } } })
		.then(() => {
			res.redirect(`/books/${bookId}`);
		})
		.catch(err => {
			console.log(err);
		})
});


module.exports = router;