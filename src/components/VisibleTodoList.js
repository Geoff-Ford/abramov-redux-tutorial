import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';



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
        fetchTodos(filter);
    },
    render() {
        const {toggleTodo, ...rest} = this.props;
        return (
            <TodoList
                {...rest}
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
        filter
    }
};

VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    actions
)(VisibleTodoList));

export default VisibleTodoList;

