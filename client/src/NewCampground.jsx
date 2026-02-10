import {useState} from 'react';
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom';

function NewCampground(){
    const [title,setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Send POST request to backend to create new campground
        try {
            const response = await axios.post('http://localhost:3000/campgrounds', 
                {
                     title, 
                     location,
                     price,
                     description
            });
                
            // After successful creation, navigate to the show page
            navigate(`/campgrounds/${response.data._id}`);
        } catch (err) {
            console.error('Failed to create campground', err);
        }
    }

    return (
        <div style={{ padding: '20px'}}>
            <h1>New Campground</h1>
            <h2>Fill out the form to add a new campground</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:'10px'}}>
                    <label>Title:</label>
                    <input 
                        id='title'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}required
                    />
                </div>
                <div style={{ marginBottom:'10px'}}>
                    <label>Location:</label>
                    <input
                        id='location'
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}required
                    />
                </div>
                <div style={{ marginBottom:'10px'}}>
                    <label>Price:</label>
                    <input
                        id='price'
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}required
                    />
                </div>
                <div style={{ marginBottom:'10px'}}>
                    <label>Description:</label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}required
                    />
                </div>
                <button type="submit">Add Campground</button>
            </form>    
        </div>
    )
}

export default NewCampground;
