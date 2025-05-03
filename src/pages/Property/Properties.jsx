import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import propertiesData from '../../data/properties.json';
import './Properties.css';

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setTimeout(() => {
                setProperties(propertiesData);
                setLoading(false);
            }, 1000); // Simulation d'un chargement API
        } catch (err) {
            setError(`Erreur: ${err.message}`);
            setLoading(false);
        }
    }, []);

    return (
        <div className="properties">
            <h1>Nos propriétés</h1>

            {loading ? (
                <div className="loader">Chargement...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <section className="properties-grid">
                    {properties.map((property) => (
                        <Card
                            key={property.id}
                            id={property.id}
                            title={property.title}
                            cover={property.cover}
                        />
                    ))}
                </section>
            )}
        </div>
    );
}

export default Properties;