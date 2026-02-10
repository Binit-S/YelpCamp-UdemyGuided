import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditCampground() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function getCampground() {
            try {
                const response = await axios.get(`http://localhost:3000/campgrounds/${id}`);
                const camp = response.data;
                setTitle(camp.title || '');
                setLocation(camp.location || '');
                setPrice(camp.price || '');
                setDescription(camp.description || '');
            } catch (err) {
                console.error('Failed to load campground', err);
            }
        }
        getCampground();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/campgrounds/${id}`, {
                title,
                location,
                price,
                description
            });
            navigate(`/campgrounds/${id}`);
        } catch (err) {
            console.error('Failed to update campground', err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Edit Campground</h1>
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
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditCampground;
