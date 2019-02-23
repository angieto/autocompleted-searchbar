import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: '',
      activeIndex: 0
    };
    this.getSuggestions = this.getSuggestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this); 
}

  // Handle Search Function
  getSuggestions(prefix) {
    const result = Array
      .from(new Array(10), function(x, i) {
        return i;
      })
      .map(function(x) {
        const mockList = [
          'near me',
          'in 2019',
          'events',
          'random facts',
          'today',
          'in the US',
          'trend',
          'top 10',
          'styles',
          'forecast'
        ];
        let index = Math.floor(Math.random() * 9);
        return prefix + ' ' + mockList[x] + ' ' + mockList[index];
      });
    const delay = Math.random() * 800 + 200; // delay 200~1000ms
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, delay, result);
    });
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      text: value
    });
    if (value) {
      // get suggestion items here
      this.getSuggestions(value).then(result => {
        if (this.state.text) {
          this.setState({
            suggestions: result
          });
        }
      });
    } else {
      this.setState({
        suggestions: []
      })
    }
  }

  handleClick(selectedText) {
    this.setState({
      activeIndex: 0,
      text: selectedText,
      suggestions: []
    });
  }

  handleKeyDown(e) {
    let { activeIndex, suggestions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeIndex: 0,
        text: suggestions[activeIndex],
        suggestions: []
      });
    } else if (e.keyCode === 38) {
      if (activeIndex === 0) return;
      this.setState({
        activeIndex: activeIndex - 1
      });
    } else if (e.keyCode === 40) {
      if (activeIndex === suggestions.length - 1) return;
      this.setState({
        activeIndex: activeIndex + 1
      });
    }
  }

  suggestionSelected(value) {
    this.setState({
      text: value,
      suggestions: []
    })
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (!suggestions) return null;
    else {
      const list = 
        <ul>
          { suggestions.map((item, index) => 
              <li
                  className={
                    index === this.state.activeIndex ? 'active' : ''
                  }
                  key={item}
                  onClick={() => this.handleClick(item)}
              > {item} </li>
            )
          }
        </ul>
      return list;
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='container col-sm-12 col-lg-6 mt-2'>
          <div className='search'>
            <input 
              className='form-control'
              type="text" 
              value={ this.state.text }
              onChange={ this.handleChange }
              onKeyDown={ this.handleKeyDown }
            />
            <input type='submit' value='' className='search-btn' />
          </div>
          { this.renderSuggestions() }
        </div>
      </div>
    );
  }
}

export default SearchBar;
