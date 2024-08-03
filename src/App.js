
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products,setProducts] = useState([])
  const [input,setInput] = useState("")
  const fetchAPI = async() =>{


    const res = await fetch("https://dummyjson.com/products")
    const data = await res.json()
    setProducts(data.products)


  }

  useEffect(()=>{

    fetchAPI()
  },[])
  const debouncing = (fn,delay)=>{

    let timer;

    return (...args)=>{
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn(...args)

      },delay)
    }


  
  }


  const filtered_products = products.filter((prod)=>prod.title.toLowerCase().includes(input.toLowerCase()))
  const handleInput = (e) =>{
    setInput(e.target.value)
  }
  const debounceTimeout = debouncing(handleInput,300)
 
  return (
    <div className="App">
    <h1>Debouncing Search</h1>
    <input type="text"  onChange={debounceTimeout} className='text' placeholder='Search the products..'/>
    <div className='product-container'>

{filtered_products.map((prod,ind)=>{
  return <div key={prod.id} className='ind-prod'>

    <img src={prod.thumbnail} alt={prod.title}/>
    <h4>{prod.title}</h4>
  </div>
})}
    </div>
    </div>
  );
}

export default App;
