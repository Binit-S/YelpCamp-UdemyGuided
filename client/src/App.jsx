import {useState, useEffect} from 'react';
import axios from 'axios' ;
import { Routes, Route , Link } from 'react-router-dom';
import NewCampground from './NewCampground';
import ShowCampground from './ShowCampground';
import EditCampground from './EditCampground';


//create a component to list all campgrounds
function Home(){
    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        //Fetch all campgrounds from backend
        async function getData(){
            const response = await axios.get('http://localhost:3000/campgrounds');
            setCampgrounds(response.data);
        }

        getData();  
    },[]);

    return (
      <div>
        <h1 style={{paddingLeft :'0.5em'}}>Yelp Campgrounds</h1>
        <Link to = "/new" style={{ paddingLeft:'1em'}}> + Add Campground</Link> {/*link to the form for adding new campground */}
        <ul>
          {campgrounds.map(camp => (
            <li key={camp._id} style={{ border: '1px solid #ddd', margin:'10px 0',padding: '10px'}}>
              <Link to={`/campgrounds/${camp._id}`}>{camp.title}</Link> - {camp.location}{' '}
              <Link to={`/campgrounds/${camp._id}/edit`}>Edit</Link>
            </li>
          ))}
        </ul>
      </div>
    )
}

function App() {
  return(
    //Define your routes here 
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/new' element={<NewCampground />} />
      <Route path='/campgrounds/:id' element={<ShowCampground />} />
      <Route path='/campgrounds/:id/edit' element={<EditCampground />} />
    </Routes>
  )
}

export default App;
