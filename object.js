let myLibrary = [];

document.getElementById("the-form").onsubmit = function () {
	let readStatus;
	if (document.getElementById("not-yet").checked) {
		readStatus = document.getElementById("not-yet").value;
	} else if (document.getElementById("already").checked) {
		readStatus = document.getElementById("already").value;
	}

	addBookToLibrary(
		document.getElementById("title").value,
		document.getElementById("author").value,
		readStatus
	);

	document.getElementById("title").value = null;
	document.getElementById("author").value = null;
	document.getElementById("not-yet").checked = false;
	document.getElementById("already").checked = false;
	return false;
};

function Book(title, author, read) {
	this.title = title;
	this.author = author;
	this.read = read;
}

function addBookToLibrary(title, author, read) {
	if (title == "" || author == "" || read == undefined) {
		alert("Enter a valid value before submit!");
	} else {
		const newBook = new Book(title, author, read);
		myLibrary.push(newBook);
	}
}

function showBooksInLibrary() {
	myLibrary.forEach((book) => console.log(book));
}
