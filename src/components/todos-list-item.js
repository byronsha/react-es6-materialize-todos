import React from 'react';

export default class TodosListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  renderTaskSection() {
    const { task, isCompleted } = this.props;

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
              <input id="icon_prefix" type="text" className="validate" defaultValue={task} ref="editInput" />
              <label className="active" htmlFor="icon_prefix">Description</label>
            </div>
          </form>
        </td>
      );
    }

    return (
      <td style={taskStyle}
          onClick={this.props.toggleTask.bind(this, task)}
      >
        {task}
      </td>
    );
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
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({ isEditing: false });
  }
}
