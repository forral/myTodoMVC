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
	deleteTodo: function(position){
		todoList.deleteTodo(position);
		view.displayTodos();
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		var todoTextWithCompletion;
		todosUl.innerHTML = '';

		todoList.todos.forEach(function(todo, position) {
			var todoLi = document.createElement('li');

			if (todo.completed === true) {
				todoTextWithCompletion = '[x] ' + todo.todoText + ' ';
			} else {
				todoTextWithCompletion = '[ ] ' + todo.todoText + ' ';
			}

			todoLi.textContent = todoTextWithCompletion;
			todoLi.id = position;
			todoLi.appendChild(this.createDeleteButton());
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

		// delete todo event
		var todoUl = document.querySelector('ul');
		todoUl.addEventListener('click', function(event){
			if (event.target.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(event.target.parentElement.id));
			}
		});
	},
	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	}
};

view.setUpEvents();













