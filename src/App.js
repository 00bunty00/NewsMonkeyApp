import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {

  pageSize = 12;

  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route exact path = '/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'general' pageSize = {this.pageSize} country = 'in'/>}/>
            <Route exact path = '/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'business' pageSize = {this.pageSize} country = 'in' category = 'business'/>} />
            <Route exact path = '/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'entertainment' pageSize = {this.pageSize} country = 'in' category = 'entertainment'/>} />
            <Route exact path = '/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'general' pageSize = {this.pageSize} country = 'in' category = 'general'/>} />
            <Route exact path = '/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'health' pageSize = {this.pageSize} country = 'in' category = 'health'/>} />
            <Route exact path = '/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'science' pageSize = {this.pageSize} country = 'in' category = 'science'/>} />
            <Route exact path = '/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'sports' pageSize = {this.pageSize} country = 'in' category = 'sports'/>} />
            <Route exact path = '/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key = 'technology' pageSize = {this.pageSize} country = 'in' category = 'technology'/>} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App


// Here is the API key for News API.
// 8e50222f44384540bf49e2cd1a1c2a60