import React from "react";
import "./Card.css";

const Card = (pokemon) => {
    let imgSrc = pokemon.pokemon.sprites.front_default;
    let name = pokemon.pokemon.name;
    let types = pokemon.pokemon.types;
    let weight = pokemon.pokemon.weight;
    let height = pokemon.pokemon.height;
    let ability = pokemon.pokemon.abilities[0].ability.name;

    return (
        <div className="card">
            <div className="card__img">
                <img src={imgSrc} alt=""></img>
            </div>
            <div className="card__name">{name}</div>
            <div className="card__types">
                <div>タイプ：</div>
                {types.map((type) => {
                    return (
                        <div key={type.type.name}>
                            <span className="type__name">{type.type.name}</span>
                        </div>
                    );
                })}
            </div>
            <div className="card__info">
                <div className="card__data">
                    <p className="title">重さ：{weight}</p>
                </div>
                <div className="card__data">
                    <p className="title">高さ：{height}</p>
                </div>
                <div className="card__data">
                    <p className="title">アビリティ：{ability}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
