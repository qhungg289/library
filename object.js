let myLibrary = [];
let table = document.getElementById("table");
let tbody = document.getElementsByTagName("tbody");
let form = document.getElementById("the-form");
let trashBtn = document.getElementsByClassName("trashBtn");

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

function setDataAttribute() {
	for (let i = 0; i < tbody.length; i++) {
		[...tbody][i].setAttribute("data-index", `${i}`);
		[...trashBtn][i].setAttribute("data-index", `${i}`);
	}
}

function removeBookObjectAndRow(index) {
	for (let i = 0; i < tbody.length; i++) {
		if (index == tbody[i].dataset.index) {
			tbody[i].remove();
			myLibrary.splice(index, 1);
		}
	}
}

function showBooksInLibrary() {
	let template;
	myLibrary.forEach((book) => {
		template = `
		<tbody>
			<tr>
				<td>${book.title}</td>
				<td>${book.author}</td>
				<td>${book.read}</td>
				<td><button class="trashBtn"><i class="fas fa-trash-alt"></i></button></td>
			</tr>
		</tbody>
		`;
	});
	table.innerHTML += template;
	setDataAttribute();
	[...trashBtn].forEach((btn) => {
		btn.addEventListener("click", function () {
			removeBookObjectAndRow(btn.dataset.index);
			setDataAttribute();
		});
	});
}
