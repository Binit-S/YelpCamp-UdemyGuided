import {useState, useEffect} from 'react';
import axios from 'axios' ;

function App(){
  //1. Start with an empty array of campgrounds
  const [campgrounds , setCampgrounds] = useState([]);

  //Data Creation 
  const[title,setTitle] = useState('');
  const[location, setLocation] = useState('');

  function submitCampgtound(e){
    e.preventDefault();
    axios.post('http://localhost:3000/campgrounds',{title,location})
      .then(res=> {
        setCampgrounds([...campgrounds,res]);
        setTitle('');
        setLocation('');
      });
  }

  useEffect(()=>{
    axios.get('http://localhost:3000/campgrounds') // Fetch Data from you backend
      .then(res=> setCampgrounds(res.data))
      .catch(err => console.error(err));
  },[]);


  return(
    <div>
      <h1>All Campgrounds (Mern Version) </h1>
    
        {campgrounds.map(camp => (
          <div key = {camp._id} style = {{ border : `1px solid #ccc`,margin :'10px' , padding:'10px'}}>
            <h2>{camp.title}</h2>
            <p>{camp.location}</p>
          </div>
        ))}

      <form onSubmit={submitCampgtound}>
        <input value={title} onChange={e => setTitle(e.target.value)}/>
        <input value={location} onChange={e => setLocation(e.target.value)} />
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
