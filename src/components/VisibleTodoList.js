import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList';
import { toggleTodo } from '../actions';



const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(t => t.completed);
        case 'active':
            return todos.filter(t => !t.completed);
        default:
            throw new Error(`Unknown filter: ${filter}`);
    }
};

const mapStateToTodoListProps = (state, { params }) => ({
    todos: getVisibleTodos(state.todos, params.filter || 'all')
});
const VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    {onTodoClick: toggleTodo}
)(TodoList));

export default VisibleTodoList;

