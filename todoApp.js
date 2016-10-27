var todoList = {
	todos: [],

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
	},
	setUpEvents: function(){
		// input event
		var inputEl = document.querySelector('input');
		var ENTER_KEY = 13;
		inputEl.addEventListener('keyup', function(event) {
			if (event.keyCode === ENTER_KEY) {
				handlers.addTodo();
			}
		});

		var todoUl = document.querySelector('ul');
		todoUl.addEventListener('click', function(event){

			// delete button event
			if (event.target.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(event.target.parentElement.id));
			}

			// checkbox event
			if(event.target.className === 'todoStatus') {
				handlers.toggleTodo(parseInt(event.target.parentElement.id));
			}
		});

	},
	createTodoLi: function(todoText, status, position) {
		var liElement = document.createElement('li');
		liElement.id = position;

		var inputElement = document.createElement('input');
		inputElement.type = 'checkbox';
		inputElement.className = 'todoStatus';
		inputElement.checked = status;

		var labelElement = document.createElement('label');
		labelElement.textContent = todoText;
		if (status) {
			labelElement.className = 'completed';
		}

		var deleteButton = document.createElement('button');
		deleteButton.className = 'deleteButton';
		deleteButton.textContent = 'delete';

		liElement.appendChild(inputElement);
		liElement.appendChild(labelElement);
		liElement.appendChild(deleteButton);

		return liElement
	}
};

view.setUpEvents();













