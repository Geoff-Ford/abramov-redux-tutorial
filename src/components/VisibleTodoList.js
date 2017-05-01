import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import FetchError from './FetchError';



let VisibleTodoList = () => ({
    componentDidMount() {
        this.fetchData();
    },
    componentDidUpdate(prevProps) {
        if(this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    },
    fetchData() {
        const { filter, fetchTodos } = this.props;
        fetchTodos(filter)
            .then(() => console.log('Done!!!'));
    },
    render() {
        const {toggleTodo, todos, errorMessage, isFetching} = this.props;
        if(isFetching && !todos.length) {
            return <p>Loading...</p>;
        }
        if(errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                />
            );
        }

        return (
            <TodoList
                todos={todos}
                onTodoClick={toggleTodo}
            />
        );
    }
});

/*
class VisibleTodoList extends React.Component {
    componentDidMount() {
        fetchTodos(this.props.filter)
            .then(todos =>
                console.log(this.props.filter, todos)
            )
    }
    componentDidUpdate(prevProps) {
        if(this.props.filter !== prevProps.filter) {
            fetchTodos(this.props.filter)
                .then(todos =>
                    console.log(this.props.filter, todos)
                )
        }
    }
    render() {
        return <TodoList {...this.props} />
    }
}
*/


const mapStateToTodoListProps = (state, { params }) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        errorMessage: getErrorMessage(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
};

VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    actions
)(VisibleTodoList));

export default VisibleTodoList;

