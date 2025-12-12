import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const cat = {
  name: 'wawa',
  imageUrl: 'https://i.imgur.com/wzeCD5O.jpeg',
  imageSize: 90
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
function MyButton({ setIsLoggedIn }) {

  function handleClick() {
    setIsLoggedIn(true);
  };

  return (
    <button onClick={handleClick}>Click for a Surprise</button>
  );
}


function Wawa() {
  return (
    <>
    <h1>{cat.name}</h1>
    <img 
      className="catImage"
      src={cat.imageUrl}
      alt={'This is where I would put ' + cat.name + ' IF THE IMAGE LOADS!'}
      style={{
        width: cat.imageSize,
        height: cat.imageSize
      }}
      />
    </>
  );
}

const monsters = [
  { title: 'Pikachu', isPokemon: true, id: 1},
  { title: 'Lucario', isPokemon: true,  id: 2},
  { title: 'Angelmon', isPokemon: false,  id: 3},
];
const listItems = monsters.map(mons => 
  <li key={mons.id} style={{ color: mons.isPokemon? 'red' : 'blue'}}>
    {mons.title}
  </li>
);

export default function MyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='welcomeText'>Welcome to my app</h1>
        {isLoggedIn? (
          <Wawa />
        ) : (
          <MyButton setIsLoggedIn={setIsLoggedIn} />
        )}
      </header>
    </div>
  );
}



// export default function ShoppingList() {
//   const listItems = products.map(product =>
//     <li
//       key={product.id}
//       style={{
//         color: product.isFruit ? 'magenta' : 'darkgreen'
//       }}
//     >
//       {product.title}
//     </li>
//   );

//   return (
//     <ul>{listItems}</ul>
//   );
// }
