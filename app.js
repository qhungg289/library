let myLibrary = [];
let table = document.getElementById("table");
let tbody = document.getElementsByTagName("tbody");
let form = document.getElementById("the-form");
let trashBtn = document.getElementsByClassName("trashBtn");
let editBtn = document.getElementsByClassName("editBtn");
let readValue = document.getElementsByClassName("readValue");

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

function Book(title, author, read) {
	this.title = title;
	this.author = author;
	this.read = read;
}

Book.prototype.changeReadStatus = function () {
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
		document.getElementById("title").value = null;
		document.getElementById("author").value = null;
		document.getElementById("not-yet").checked = false;
		document.getElementById("already").checked = false;
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

function showBooksInLibrary() {
	let template;
	myLibrary.forEach((book) => {
		template = `
		<tbody>
			<tr>
				<td>${book.title}</td>
				<td>${book.author}</td>
				<td class="readValue">${book.read}</td>
				<td>
					<button title="Change read status" class="editBtn"><i class="fas fa-edit"></i></button>
					<button title="Delete Book from library" class="trashBtn"><i class="fas fa-trash-alt"></i></button>
				</td>
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
	[...editBtn].forEach((btn) => {
		btn.addEventListener("click", function () {
			for (let i = 0; i < myLibrary.length; i++) {
				if (btn.dataset.index == i) {
					myLibrary[i].changeReadStatus();
					readValue[i].innerText = myLibrary[i].read;
					console.table(myLibrary);
				}
			}
		});
	});
}
