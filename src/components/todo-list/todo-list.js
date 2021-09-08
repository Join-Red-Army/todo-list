import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({
  todos, onDeleted, onToggleImportant, onToggleDone 
}) => {

  // создание массива react-элементов из массива свойств 
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem 
          { ...itemProps }
          onDeleted={ () => onDeleted(id) }
          onToggleImportant={ () => onToggleImportant(id)}
          onToggleDone={ () => onToggleDone(id) }
        />
      </li>
    );
  });

  // вернуть ul-список с react-элементами внутри
  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;