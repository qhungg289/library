let myLibrary = [];
let storedLibrary = [];
let table = document.getElementById("table");
let tbody = document.getElementsByTagName("tbody");
let form = document.getElementById("the-form");
let trashBtn = document.getElementsByClassName("trashBtn");
let editBtn = document.getElementsByClassName("editBtn");
let readValue = document.getElementsByClassName("readValue");
let newBtn = document.getElementById("newBtn");
let cancelBtn = document.getElementById("cancel");
let modal = document.getElementById("modal");

window.onload = function () {
	storedLibrary = JSON.parse(localStorage.getItem("library"));
	if (storedLibrary !== null) {
		myLibrary = storedLibrary;
		showBooksInLibrary();
	}
};

newBtn.onclick = function () {
	modal.style.display = "flex";
};

cancelBtn.onclick = function () {
	modal.style.display = "none";
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

	return false;
};

class Book {
	constructor(_title, _author, _read) {
		this.title = _title;
		this.author = _author;
		this.read = _read;
	}
}

Object.prototype.changeReadStatus = function () {
	if (this.read == document.getElementById("not-yet").value) {
		this.read = document.getElementById("already").value;
	} else {
		this.read = document.getElementById("not-yet").value;
	}
};

function addBookToLibrary(title, author, read) {
	if (title == "" || author == "" || read == undefined) {
		alert("Enter a valid information before submit!");
	} else {
		const newBook = new Book(title, author, read);
		myLibrary.push(newBook);
		saveDataToLocalStorage(myLibrary);

		document.getElementById("title").value = null;
		document.getElementById("author").value = null;
		document.getElementById("not-yet").checked = false;
		document.getElementById("already").checked = true;

		showBooksInLibrary();
	}
}

function setDataAttribute() {
	for (let i = 0; i < tbody.length; i++) {
		[...tbody][i].setAttribute("data-index", `${i}`);
		[...trashBtn][i].setAttribute("data-index", `${i}`);
		[...editBtn][i].setAttribute("data-index", `${i}`);
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

function saveDataToLocalStorage(arr) {
	if (typeof Storage !== "undefined") {
		localStorage.setItem("library", JSON.stringify(arr));
	} else {
		alert("Web Storage is disabled.");
	}
}

function showBooksInLibrary() {
	for (let item of tbody) {
		item.innerHTML = "";
	}

	myLibrary.forEach((book) => {
		table.innerHTML += `
		<tbody>
			<tr>
				<td>${book.title}</td>
				<td>${book.author}</td>
				<td class="readValue">${book.read}</td>
				<td>
					<button title="Change read status" class="editBtn"><i class="fas fa-check"></i></i></button>
					<button title="Delete Book from library" class="trashBtn"><i class="fas fa-trash-alt"></i></button>
				</td>
			</tr>
		</tbody>
		`;
	});

	setDataAttribute();

	[...trashBtn].forEach((btn) => {
		btn.addEventListener("click", function () {
			removeBookObjectAndRow(btn.dataset.index);
			setDataAttribute();
			saveDataToLocalStorage(myLibrary);
		});
	});

	[...editBtn].forEach((btn) => {
		btn.addEventListener("click", function () {
			for (let i = 0; i < myLibrary.length; i++) {
				if (btn.dataset.index == i) {
					myLibrary[i].changeReadStatus();
					readValue[i].innerText = myLibrary[i].read;
				}
			}
			saveDataToLocalStorage(myLibrary);
		});
	});
}
