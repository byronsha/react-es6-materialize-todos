import React from 'react';

export default class TodosListHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  renderError() {
    if (!this.state.error) { return null; }

    return <div style={{ color: 'red' }}>{this.state.error}</div>;
  }

  render() {
    return (
      <form className="col s12" onSubmit={this.handleCreate.bind(this)}>
        <div className="row">
          <div className="input-field col s12 m6">
            <i className="material-icons prefix">message</i>
            <input id="task_description" type="text" className="validate" ref="descriptionInput" />
            <label htmlFor="task_description">What do I need to do?</label>
            {this.renderError()}
          </div>
          <div className="input-field col s12 m5">
            <i className="material-icons prefix">today</i>
            <input id="task_deadline" type="date" ref="deadlineInput" />
            <label className="active" htmlFor="task_deadline">By when?</label>
          </div>
          <div className="input-field col s12 m1">
            <button className="btn-floating btn-small waves-effect waves-light green">
              <i className="material-icons">add</i>
            </button>
          </div>
        </div>
      </form>
    );
  }

  handleCreate(event) {
    event.preventDefault();

    const descriptionInput = this.refs.descriptionInput;
    const task = descriptionInput.value;
    const validateInput = this.validateInput(task);

    const deadlineInput = this.refs.deadlineInput;
    const deadline = deadlineInput.value;

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    this.setState({ error: null });
    this.props.createTask(task, deadline);
    this.refs.descriptionInput.value = '';
    this.refs.deadlineInput.value = '';
  }

  validateInput(task) {
    if (!task) {
      return 'Please enter a task.';
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return 'Task already exists.';
    } else {
      return null;
    }
  }
}
