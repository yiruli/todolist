import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import uuid from 'uuid';
import axios from 'axios';

//function App() {
class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  //Toggle Complete
  markComplete = (id) => {
      this.setState({ todos: this.state.todos.map( todo => {
        if(todo.id ===id){
          todo.completed = !todo.completed
        }
        return todo;
      })

      });
  }

  //Delete Todo
  delTodo = (id) => {
    //this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)] });
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  //Add Todo
  addTodo = (title) => {
    /*
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo]});
    */
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({todos:
        [...this.state.todos, res.data]
      }));
  }

  render(){
    return (
      <HashRouter>
        <div className="App">
          <div className="container">
            <Header />
              <Switch>
                <Route exact path="/" render={props => (
                  <React.Fragment>
                    <AddTodo addTodo={this.addTodo}/>
                    <Todos todos = {this.state.todos} markComplete = {this.markComplete}
                    delTodo={this.delTodo} />
                  </React.Fragment>
                )} />
                <Route path="/about" component={About} />
              </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
