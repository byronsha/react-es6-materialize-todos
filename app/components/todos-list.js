import _ from 'lodash';
import React from 'react';
import TodosListHeader from './todos-list-header';
import TodosListItem from './todos-list-item';

export default class TodosList extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'todos');

    return _.map(this.props.todos, (todo, index) => <TodosListItem key={index} {...todo} {...props}/>);
  }

  render() {
    return (
      <div className="col s12 m12">
        <table className="bordered responsive">
          <TodosListHeader />
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
      </div>
    );
  }
}
