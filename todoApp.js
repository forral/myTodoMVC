var todoList = {
	todos: [],

	displayTodos: function() {
		for(var i = 0; i < this.todos.length; i++) {
			if (this.todos[i].completed === false) {
				console.log('[ ] ' + this.todos[i].todoText);
			} else {
				console.log('[x] ' + this.todos[i].todoText);
			}
		}
	},
	addTodo: function(todo) {
		this.todos.push({
			todoText: todo,
			completed: false
		});
		this.displayTodos();
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
		this.displayTodos();
	},
	changeTodo: function(position, todo) {
		this.todos[position].todoText = todo;
		this.displayTodos();
	},
	toggleTodo: function(position) {
		this.todos[position].completed = !this.todos[position].completed;
		this.displayTodos();
	},
	toggleAll: function() {
		var numbOfTodos = this.todos.length;
		var numbOfCompletedTodos = 0;

		for (var i = 0; i < numbOfTodos; i++) {
			if (this.todos[i].completed === true) {
				numbOfCompletedTodos++;
			}
		}

		for (var i = 0; i < numbOfTodos; i++) {
			if (numbOfTodos === numbOfCompletedTodos) {
				this.todos[i].completed = false;
			} else {
				this.todos[i].completed = true;
			}
		}

		this.displayTodos();
	}
};

var handlers = {
	addTodo: function() {
		var inputEl = document.querySelector('input');
		var todoText = inputEl.value;
		todoList.addTodo(todoText);
		inputEl.value = '';
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';
		
		for(var i = 0; i < todoList.todos.length; i++) {
			var todoLi = document.createElement('li');
			todosUl.appendChild(todoLi);
		}
	}
};