import React, { Component } from 'react';
import './item-satus-filter.css';

export default class ItemStatusFilter extends Component {


  buttons = [
    {name: 'All', label: 'all'},
    {name: 'Active', label: 'active'},
    {name: 'Done', label: 'done'},
  ];


  render() {
    const {onFilter, filterWord} = this.props;

    const htmlButtonsArray = this.buttons.map(({name, label}) => {
      const btnActiveClass = filterWord === label ? 'btn-info' : 'btn-outline-secondary';
      
      return (
        <button 
          type="button"
          className={`btn btn-info ${btnActiveClass}`}
          onClick={ onFilter() }
          key={name}
        >
          {label}
        </button>
      );
    });

    return (
      <div className='btn-group'>
        {htmlButtonsArray}
      </div>
    );
  }
}