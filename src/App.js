import React, { Component }from 'react';
import './App.css';
import Container from './components/Container.js'
import {Header} from './components/Header.js'
import {NavBar} from './components/NavBar.js'
import Form from './components/Form.js'

class App extends Component {

  state = {
    characters: [],
    movies: [],
    planets: [],
    animals: [],
    showChar: false,
    showMov: false,
    showPlan: false,
    showAnim: false,
    showQuiz: false,
    prompt: true,
    pending: true,
    navbar: true,
    pendingItems: [],
    error: "",
    loggedin: false,
  }


  componentWillMount(){
    fetch('http://localhost:8000/api/characters/?format=json')
      .then(response=>response.json())
      .then(characters=>this.setState({characters}))

    fetch('http://localhost:8000/api/movies/?format=json')
      .then(response=>response.json())
      .then(movies=>this.setState({movies}))

    fetch('http://localhost:8000/api/planets/?format=json')
      .then(response=>response.json())
      .then(planets=>this.setState({planets}))

    fetch('http://localhost:8000/api/wildlife/?format=json')
      .then(response=>response.json())
      .then(animals=>this.setState({animals}))

      if(localStorage.token){
        fetch('http://localhost:8000/api/userwildlife/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
          }
        }).then(response=>response.json())
          .then(pendingAnims=>this.setState({pendingItems: [...this.state.pendingItems, pendingAnims].flat([1])}))

        fetch('http://localhost:8000/api/usercharacters/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
          }
        }).then(response=>response.json())
          .then(pendingChars=>this.setState({pendingItems: [...this.state.pendingItems, pendingChars].flat([1])}))
          // .then(pendingChars=>pendingChars.filter(pendingChar=>{
          //   return pendingChar.user === localStorage.user
          // }))
          // .then(console.log)

        fetch('http://localhost:8000/api/userplanets/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
          }
        }).then(response=>response.json())
        .then(pendingPlans=>this.setState({pendingItems: [...this.state.pendingItems, pendingPlans].flat([1])}))
    }
  }

  showCharacters = () => {
    this.setState({
      showMov: false,
      showChar: true,
      showPlan: false,
      showAnim: false,
      showQuiz: false,
      prompt: false
    })
  }

  showMovies = () => {
    this.setState({
      showMov: true,
      showChar: false,
      showPlan: false,
      showAnim: false,
      showQuiz: false,
      prompt: false
    })
  }

  showPlanets = () => {
    this.setState({
      showMov: false,
      showChar: false,
      showPlan: true,
      showAnim: false,
      showQuiz: false,
      prompt: false
    })
  }

  showAnimals = () => {
    this.setState({
      showMov: false,
      showChar: false,
      showPlan: false,
      showAnim: true,
      showQuiz: false,
      prompt: false
    })
  }

  showPrompt = () => {
    this.setState({
      showMov: false,
      showChar: false,
      showPlan: false,
      showAnim: false,
      showQuiz: false,
      navbar: true,
      prompt: true
    })
  }

  shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex
    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
  }

  showPending = () => {
    this.setState({
      pending: !this.state.pending
    })
  }

  addCharacter = (character) => {
    fetch('http://localhost:8000/api/usercharacters/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      },
      body:JSON.stringify(character)
    })
  }

  addPlanet = (planet) => {
    fetch('http://localhost:8000/api/userplanets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      },
      body:JSON.stringify(planet)
    })
  }

  addAnimal = (animal) => {
    fetch('http://localhost:8000/api/userwildlife/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      },
      body:JSON.stringify(animal)
    })
  }

  addPending = (item) => {
    this.setState({
      pendingItems: [...this.state.pendingItems, item]
    })
  }

  signUp = (user) => {
    fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(user)
    }).then(response=>response.json())
      .then((result) => {
        return result.error ? alert(result.error) : localStorage.setItem('token', result.token), localStorage.setItem('user', result.user.id)
      })
  }

  logIn = (user) => {
    fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(user)
    }).then(response=>response.json())
      .then((result) => {
        // return result["non_field_errors"] ? console.log(result["non_field_errors"][0]) : localStorage.setItem('token', result.token), localStorage.setItem('user', result.user.id)
        if(result["non_field_errors"]){
          this.setState({
            error: result["non_field_errors"][0]
          })
        }else {return localStorage.setItem('token', result.token), localStorage.setItem('user', result.user.id)}
      })
  }

  logOut = () => {
    fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      }
    })
    this.setState({
      pending: false,
      loggedin: false
    })
  }

  handleClick = (event) => {
    if(event.target.className === "character-quiz-button"){
      this.setState({
        showMov: false,
        showChar: false,
        showPlan: false,
        showAnim: false,
        showQuiz: true,
        prompt: false,
        navbar: false
      })
    }
  }

  render(){
    // console.log(this.state.error)
    // console.log(this.state.pendingItems)
    return (
      <div className="App">
        <Header/>
        {this.state.navbar ? <NavBar
          showCharacters={this.showCharacters}
          showMovies={this.showMovies}
          showPlanets={this.showPlanets}
          showAnimals={this.showAnimals}/> : null}
        {this.state.prompt ? [<p className="prompt">Welcome</p>,
                              <p className="prompt">Choose a button above to begin your Star Wars education</p>,
                              <br></br>,
                              <br></br>,
                              <p className="quiz-prompt">Ready to put your knowledge to the test?</p>,
                              <p className="prompt">Choose a button below to take a quiz</p>,
                              <br></br>,
                              <div>
                              <button onClick={this.handleClick} className="character-quiz-button">Character Quiz</button>,
                              {/* <button onClick={this.showQuiz} className="movie-quiz-button">Movie Quiz</button>, */}
                              {/* <button onClick={this.showQuiz} className="animal-quiz-button">Animal Quiz</button>, */}
                              </div>,
                              <br></br>,
                              <div className="add-div"><p className="prompt">Something missing from the database?</p>
                              <Form addCharacter={this.addCharacter}
                                    addPlanet={this.addPlanet}
                                    addAnimal={this.addAnimal}
                                    showPending={this.showPending}
                                    pendingItems={this.state.pendingItems}
                                    addPending={this.addPending}
                                    signUp={this.signUp}
                                    logIn={this.logIn}
                                    logOut={this.logOut}
                                    error={this.state.error}/>
                              </div>,
                              ] : null}
        {this.state.showMov ? <Container movies={this.state.movies} showPrompt={this.showPrompt}/> : null}
        {this.state.showChar ? <Container characters={this.state.characters} showPrompt={this.showPrompt}/> : null}
        {this.state.showPlan ? <Container planets={this.state.planets} showPrompt={this.showPrompt}/> : null}
        {this.state.showAnim ? <Container animals={this.state.animals} showPrompt={this.showPrompt}/> : null}
        {this.state.showQuiz ? <Container quizcharacters={this.state.characters} showPrompt={this.showPrompt}/> : null}
      </div>
    );
  }
}

export default App;
