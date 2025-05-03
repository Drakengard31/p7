import { Link } from 'react-router-dom';
import './Card.css'; // N'oublie pas de créer ce fichier CSS

function Card({ id, title, cover }) {
    return (
        <Link to={`/properties/${id}`} className="card-link">
            <article className="card">
                <img
                    src={cover}
                    alt={title}
                    className="card-image"
                />
                <div className="card-overlay">
                    <h2 className="card-title">{title}</h2>
                </div>
            </article>
        </Link>
    );
}

export default Card;