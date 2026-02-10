import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ShowCampground() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campground, setCampground] = useState(null);

    useEffect(() => {
        async function getCampground() {
            try {
                const response = await axios.get(`http://localhost:3000/campgrounds/${id}`);
                setCampground(response.data);
            } catch (err) {
                console.error('Failed to load campground', err);
            }
        }
        getCampground();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/campgrounds/${id}`);
            navigate('/');
        } catch (err) {
            console.error('Failed to delete campground', err);
        }
    };

    if (!campground) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>{campground.title}</h1>
            <p><strong>Location:</strong> {campground.location}</p>
            <p><strong>Price:</strong> {campground.price}</p>
            <p><strong>Description:</strong> {campground.description}</p>
            <div>
                <Link to={`/campgrounds/${id}/edit`}>Edit</Link>{' '}
                <button onClick={handleDelete}>Delete</button>{' '}
                <Link to="/">Back</Link>
            </div>
        </div>
    );
}

export default ShowCampground;
