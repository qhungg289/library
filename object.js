let myLibrary = [];
let table = document.getElementById("table");
let modal = document.getElementById("modal");
let button = document.getElementById("button");
let closeBtn = document.getElementById("close");
let form = document.getElementById("the-form");

button.onclick = function () {
	modal.style.display = "block";
};

closeBtn.onclick = function () {
	modal.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

form.onsubmit = function () {
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

	modal.style.display = "none";
	return false;
};

function Book(title, author, read) {
	this.title = title;
	this.author = author;
	this.read = read;
}

function addBookToLibrary(title, author, read) {
	if (title == "" || author == "" || read == undefined) {
		alert("Enter a valid information before submit!");
	} else {
		const newBook = new Book(title, author, read);
		myLibrary.push(newBook);
		showBooksInLibrary();
	}
}

function showBooksInLibrary() {
	let template;
	myLibrary.forEach((book) => {
		template = `
			<tr>
				<td>${book.title}</td>
				<td>${book.author}</td>
				<td>${book.read}</td>
			</tr>
		`;
	});
	table.innerHTML += template;
}
