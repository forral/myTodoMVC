var util = {
	store: function (namespace, data) {
		if (arguments.length > 1) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		} else {
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		}
	}
};

var todoList = {
	todos: util.store('myTodoMVC'),

	addTodo: function(todo) {
		this.todos.push({
			todoText: todo,
			completed: false
		});
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	changeTodo: function(position, todo) {
		this.todos[position].todoText = todo;
		view.displayTodos();
	},
	toggleTodo: function(position) {
		this.todos[position].completed = !this.todos[position].completed;
		view.displayTodos();
	},
	toggleAll: function() {
		var numbOfTodos = this.todos.length;
		var numbOfCompletedTodos = 0;

		this.todos.forEach(function(todo) {
			if (todo.completed === true) {
				numbOfCompletedTodos++;
			}
		});

		this.todos.forEach(function(todo) {
			if (numbOfTodos === numbOfCompletedTodos) {
				todo.completed = false;
			} else {
				todo.completed = true;
			}
		});

		view.displayTodos();
	}
};

var handlers = {
	addTodo: function() {
		var inputEl = document.querySelector('input');
		var todoText = inputEl.value.trim();
		todoList.addTodo(todoText);
		inputEl.value = '';
		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleTodo: function(position) {
		todoList.toggleTodo(position);
		view.displayTodos();
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';
		var todoLi;

		todoList.todos.forEach(function(todo, position) {

			if (todo.completed === true) {
				todoLi = this.createTodoLi(todo.todoText, true, position);
			} else {
				todoLi = this.createTodoLi(todo.todoText, false, position);
			}

			todosUl.appendChild(todoLi);
		}, this);
		util.store('myTodoMVC', todoList.todos);
	},
	setUpEvents: function(){
		
		var inputEl = document.querySelector('input');
		var ENTER_KEY = 13;
		var ESCAPE_KEY = 27;
		var todoUl = document.querySelector('ul');

		inputEl.addEventListener('keyup', function(event) {
			if (event.keyCode === ENTER_KEY) {
				handlers.addTodo();
			}
		});

		todoUl.addEventListener('click', function(event){

			// delete button event
			if (event.target.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(event.target.parentElement.parentElement.id));
			}

			// checkbox event
			if(event.target.className === 'todoStatus') {
				handlers.toggleTodo(parseInt(event.target.parentElement.parentElement.id));
			}
		});

		todoUl.addEventListener('dblclick', function(event) {
			if (event.target.className === 'todoLabel') {
				// o div tem de receber a class de .edit
				event.target.parentElement.className = 'edit';

				// o input tem de ficar sem class
				var inputEl = event.target.parentElement.nextSibling;
				inputEl.className = 'editEl';
				inputEl.focus();
			}
		});

		todoUl.addEventListener('keyup', function(event) {
			if (event.target.className === 'editEl') {

				if (event.which === ENTER_KEY) {
					event.target.blur();
				}

				if (event.which === ESCAPE_KEY) {
					event.target.dataset.abort = 'true';
					event.target.blur();
				}
			}
		});

		todoUl.addEventListener('focusout', function(event) {
			if (event.target.className === 'editEl') {

				var inputEl = event.target;
				var val = event.target.value.trim();
				
				// if there is no value, delete todo.
				if (!val) {
					handlers.deleteTodo(parseInt(inputEl.parentElement.id));
				}

				if (inputEl.dataset.abort === 'true') {
					inputEl.value = todoList.todos[parseInt(inputEl.parentElement.id)].todoText;
					inputEl.dataset.abort = '';
				} else {
					// if there is a value update the .todoText.
					todoList.changeTodo(parseInt(inputEl.parentElement.id), val);
				}

				// o div tem de ficar sem classes
				event.target.previousSibling.className = '';
				// o input tem de receber a class de editEL edit
				event.target.className = 'editEl edit';
			}
		});
	},
	createTodoLi: function(todoText, status, position) {
		var liElement = document.createElement('li');
		liElement.id = position;

		var divElement = document.createElement('div');

		var checkboxElement = document.createElement('input');
		checkboxElement.type = 'checkbox';
		checkboxElement.className = 'todoStatus';
		checkboxElement.checked = status;

		var labelElement = document.createElement('label');
		labelElement.className = 'todoLabel';
		labelElement.textContent = todoText;
		if (status) {
			labelElement.className = 'completed';
		}

		var deleteButton = document.createElement('button');
		deleteButton.className = 'deleteButton';
		deleteButton.textContent = 'delete';

		var inputEl = document.createElement('input');
		inputEl.className = 'editEl edit';
		inputEl.value = todoText;
		
		divElement.appendChild(checkboxElement);
		divElement.appendChild(labelElement);
		divElement.appendChild(deleteButton);
		liElement.appendChild(divElement);
		liElement.appendChild(inputEl);

		return liElement
	}
};

view.setUpEvents();
view.displayTodos();