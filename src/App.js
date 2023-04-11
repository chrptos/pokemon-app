import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  // 最初の一回だけAPIをフェッチする
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得する。
      let res = await getAllPokemon(initialUrl);
      // ポケモンの詳細データを取得する。
      loadPokemon(res.results);
      // console.log(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      // データ取得に成功したらloadingをfalseにする
      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    // Promise.allは、data.mapで生成したPromiseオブジェクトをまとめ、全てがresolveされた時点で、それらの実行結果を配列として返す。
    let _pokemonData = await Promise.all(
      // data配列の各要素であるポケモンのURLを元に、getPokemon関数を呼び出してPromiseオブジェクトを生成する
      data.map(pokemon => getPokemon(pokemon.url))
    );
    setPokemonData(_pokemonData);
  }

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    // console.log(data.results)
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const handlePrevPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    // console.log(data.results)
    await loadPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);
    console.log(data.previous);
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="App">
        {loading
          ? <h1>ロード中...</h1>
          : <div className="pokemon__card__container">
            {
              pokemonData.map((pokemon, i) => { return <Card key={i} pokemon={pokemon} /> })}
          </div>}
        <div className="btn">
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
      </div>
    </>
  );
}

export default App;
