import React, { Component } from 'react'
import {CardFront} from './CardFront.js'
import {CardBack} from './CardBack.js'
import Form from './Form.js'

class Card extends Component {

    state = {
        flip: false,
        update: true,
    }

    showCard = () => {
        if(this.props.character){
            return [<CardBack 
                    character={this.props.character}
                    species={this.props.character.species}
                    gender={this.props.character.gender}
                    planet={this.props.character.planet}
                    force_sensitive={this.props.character.force_sensitive}
                    side={this.props.character.side}
                    role={this.props.character.role}
                    quote={this.props.character.quote}
                    movies={this.props.character.movies}/>,
                    <CardFront character={this.props.character} name={this.props.character.name} image={this.props.character.image}/>
            ]
        } else if(this.props.movie){
            return [<CardBack
                    movie={this.props.movie}
                    opening_crawl={this.props.movie.opening_crawl}
                    episode={this.props.movie.episode}
                    roman_numeral={this.props.movie.roman_numeral}
                    title={this.props.movie.title}
                    isFlipped={this.state.flip}/>,
                    <CardFront
                    movie={this.props.movie}
                    title={this.props.movie.title}
                    poster={this.props.movie.poster}/>
            ]
        } else if(this.props.planet){
            return [<CardBack
                    planet={this.props.planet}
                    terrain={this.props.planet.terrain}
                    climate={this.props.planet.climate}/>,
                    <CardFront
                    planet={this.props.planet}
                    name={this.props.planet.name}
                    image={this.props.planet.image}/>
            ]
        }else if(this.props.pendingItem){
            if(this.props.pendingItem.category === "character"){
                return [<CardBack 
                    character={this.props.pendingItem}
                    species={this.props.pendingItem.species}
                    gender={this.props.pendingItem.gender}
                    planet={this.props.pendingItem.planet}
                    force_sensitive={this.props.pendingItem.force_sensitive}
                    side={this.props.pendingItem.side}
                    role={this.props.pendingItem.role}
                    quote={this.props.pendingItem.quote}
                    category={this.props.pendingItem.category}/>,
                    <CardFront pendingItem={this.props.pendingItem}
                            character={this.props.pendingItem}
                            name={this.props.pendingItem.name}
                            image={this.props.pendingItem.image}
                            deleteCharacter={this.props.deleteCharacter}
                            buttonAction={this.handleClick}/>
                ]
            }else if(this.props.pendingItem.category === "planet"){
                return [<CardBack
                    planet={this.props.pendingItem}
                    terrain={this.props.pendingItem.terrain}
                    climate={this.props.pendingItem.climate}
                    category={this.props.pendingItem.category}/>,
                    <CardFront
                    planet={this.props.pendingItem}
                    name={this.props.pendingItem.name}
                    image={this.props.pendingItem.image}/>
                ]
            }else if(this.props.pendingItem.category === "animal"){
                return [<CardBack
                    animal={this.props.pendingItem}
                    classification={this.props.pendingItem.classification}
                    habitat={this.props.pendingItem.habitat}
                    diet={this.props.pendingItem.diet}/>,
                    <CardFront
                    animal={this.props.pendingItem}
                    name={this.props.pendingItem.name}
                    image={this.props.pendingItem.image}/>
                ]
            }
        }else if(this.props.animal){
            return [<CardBack
                animal={this.props.animal}
                classification={this.props.animal.classification}
                habitat={this.props.animal.habitat}
                diet={this.props.animal.diet}/>,
                <CardFront
                animal={this.props.animal}
                name={this.props.animal.name}
                image={this.props.animal.image}/>
            ]
        }
    }

    flipCard = (event) => {
        this.setState({
            flip: !this.state.flip
        })
    }

    handleClick = (event, classname) => {
        // console.log(event.target.nodeName)
        if(classname === "delete-button" && event.target.nodeName === "BUTTON"){
            if(this.props.pendingItem){
                if (this.props.pendingItem.category === "character"){
                    this.props.deleteCharacter(this.props.pendingItem)
                    this.props.removePending(this.props.character)
                }
            }
        } else if(classname === "update-button" && event.target.nodeName === "BUTTON"){
            console.log("update")
        } else if(event.target.nodeName === "DIV" || event.target.nodeName === "H2" || event.target.nodeName === "IMG" || event.target.nodeName === "P")
            {return this.flipCard()}
    }

    render(){
        // console.log(this.props.pendingItem)
        return(
            <div onClick={this.handleClick} className={this.state.flip ? "flip-card character-card" : "character-card"}>
                {this.showCard()}
                {/* {this.state.update ? <Form pendingChar={this.props.pendingItem}/> : null} */}
            </div>
        )
    }
}

export default Card;