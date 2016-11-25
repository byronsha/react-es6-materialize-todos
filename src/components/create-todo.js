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
            <input id="icon_prefix" type="text" className="validate" ref="createInput" />
            <label htmlFor="icon_prefix">What do I need to do?</label>
            {this.renderError()}
          </div>
        </div>
      </form>
    );
  }

  handleCreate(event) {
    event.preventDefault();

    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    this.setState({ error: null });
    this.props.createTask(task);
    this.refs.createInput.value = '';
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
