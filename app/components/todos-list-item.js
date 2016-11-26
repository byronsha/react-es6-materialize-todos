import React from 'react';

export default class TodosListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  renderTaskSection() {
    const { task, deadline, isCompleted } = this.props;

    const taskStyle = {
      textDecoration: isCompleted ? 'line-through' : 'none',
      color: isCompleted ? '#e57373' : '#4caf50',
      cursor: 'pointer'
    };

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <div className="input-field">
              <i className="material-icons prefix">mode_edit</i>
              <input id="edit_task_description" type="text" className="validate" defaultValue={task} ref="editDescriptionInput" />
              <label className="active" htmlFor="edit_task_description">Description</label>
            </div>
          </form>
        </td>
      );
    }

    return <td style={taskStyle} onClick={this.props.toggleTask.bind(this, task)}>{task}</td>;
  }

  renderDeadlineSection() {
    const { task, deadline, isCompleted } = this.props;

    const deadlineStyle = {
      textDecoration: isCompleted ? 'line-through' : 'none',
      color: isCompleted ? '#e57373' : '#4caf50',
      cursor: 'pointer'
    };

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <div className="input-field">
              <i className="material-icons prefix">today</i>
              <input id="edit_task_deadline" type="date" defaultValue={deadline} ref="editDeadlineInput" />
              <label className="active" htmlFor="edit_task_deadline">By when?</label>
            </div>
          </form>
        </td>
      );
    }

    return <td style={deadlineStyle} onClick={this.props.toggleTask.bind(this, task)}>{deadline}</td>;
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <a className="btn-floating btn-small green" onClick={this.onSaveClick.bind(this)}>
            <i className="large material-icons">done</i>
          </a>
          <span> </span>
          <a className="btn-floating btn-small red" onClick={this.onCancelClick.bind(this)}>
            <i className="large material-icons">replay</i>
          </a>
        </td>
      );
    }

    return (
      <td>
        <a className="btn-floating btn-small green" onClick={this.onEditClick.bind(this)}>
          <i className="large material-icons">mode_edit</i>
        </a>
        <span> </span>
        <a className="btn-floating btn-small red" onClick={this.props.deleteTask.bind(this, this.props.task)}>
          <i className="large material-icons">delete</i>
        </a>
      </td>
    );
  }

  render() {
    return (
      <tr>
        {this.renderTaskSection()}
        {this.renderDeadlineSection()}
        {this.renderActionsSection()}
      </tr>
    );
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onCancelClick() {
    this.setState({ isEditing: false });
  }

  onSaveClick(event) {
    event.preventDefault();

    const oldTask = this.props.task;
    const newTask = this.refs.editDescriptionInput.value;
    const newDeadline = this.refs.editDeadlineInput.value;
    this.props.saveTask(oldTask, newTask, newDeadline);
    this.setState({ isEditing: false });
  }
}
