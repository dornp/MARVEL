import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        charList: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharList();
    }

    onCharListLoaded = (char) => {
        this.setState({
            charList: char
        })
    }

    onError = () => {

    }

    getCharList = () => {
        
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    render() {
        const {charList} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charList.map((item) => (
                        <li key={item.charId} className="char__item char__item_selected">
                            <img src={item.thumbnail} alt={item.name}/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    ))}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
        
}

export default CharList;