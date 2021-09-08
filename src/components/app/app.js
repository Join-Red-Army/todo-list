import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filterWord: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState( ({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return { todoData: newArray };
    });
  };

  addItem = (text) => {
    // generate id
    const newItem = this.createTodoItem(text);
    // add element in state
    this.setState( ({todoData}) => {
      const newArr = [...todoData, newItem];
      return { todoData: newArr };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    // new object width update property
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    // construct new array
    return [
      ...arr.slice(0, idx), 
      newItem, 
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (id) => {
    this.setState( ({ todoData }) => {
      return {todoData: this.toggleProperty(todoData, id, 'done')};
    });
  };

  onToggleImportant = (id) => {
    this.setState( ({ todoData }) => {
      return {todoData: this.toggleProperty(todoData, id, 'important')};
    });
  };


  onSearchChange = (term) => {
    this.setState({ term });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter( (item) => item.label
      .toLowerCase()
      .indexOf(term.toLowerCase()) > -1 );
  };


  // кнопки All, Active, Done
  filtration = (items, filterWord) => {
    return items.filter( (item) => {
      switch (filterWord) {
        case 'all':
          return items;
        case 'done':
          return item.done;
        case 'active':
          return !item.done;
        default:
          return items;
      };
    })
  };

  onFilter = (ev) => {
    console.log(ev.target.innerText);
    this.setState( () => { 
      return {filterWord: ev.target.innerText.toLowerCase()} 
    });
  };




  ////////
  render() {
    const { todoData, term, filterWord } = this.state;
    const visibleItems = this.filtration(this.search(todoData, term), filterWord);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearchChange={ this.onSearchChange }
          />
          <ItemStatusFilter onFilter={() => this.onFilter} filterWord={filterWord}/>  
        </div>

        <TodoList 
          todos={ visibleItems }
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem} />

      </div>
    ); 
  };
};
