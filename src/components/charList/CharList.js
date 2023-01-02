import { Component } from 'react';
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

    getImgStyles = (thumbnail) => {
        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'}
        }
        return imgStyle;
    }

    render() {
        const {charList} = this.state;

        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charList.map((item) => (
                        <li onClick={() => this.props.onCharSelected(item.id)} key={item.charId} className="char__item char__item_selected">
                            <img src={item.thumbnail} alt={item.name} style={this.getImgStyles(item.thumbnail)}/>
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