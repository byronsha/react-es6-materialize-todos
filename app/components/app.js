import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';

const todos = [
{
  task: 'make React tutorial',
  deadline: '2016-11-30',
  isCompleted: false
},
{
  task: 'eat dinner',
  deadline: '2016-12-05',
  isCompleted: true
}
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos
    };
  }

  render() {
    return (
      <div className="row">
        <h2>My Todo List</h2>
        <CreateTodo
          todos={this.state.todos}
          createTask={this.createTask.bind(this)}
        />
        <TodosList
          todos={this.state.todos}
          toggleTask={this.toggleTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          deleteTask={this.deleteTask.bind(this)}
        />
      </div>
    );
  }

  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({ todos: this.state.todos });
  }

  createTask(task, deadline) {
    this.state.todos.push({
      task,
      deadline,
      isCompleted: false
    });
    this.setState({ todos: this.state.todos });
  }

  saveTask(oldTask, newTask, newDeadline) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);

    foundTodo.task = newTask;
    foundTodo.deadline = newDeadline;
    this.setState({ todos: this.state.todos });
  }

  deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos: this.state.todos });
  }
}
