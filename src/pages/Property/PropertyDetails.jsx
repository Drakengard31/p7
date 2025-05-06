import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Collapse from '../../components/Collapse/Collapse';
import './PropertyDetails.css';
import propertiesData from '../../data/properties.json';

function PropertyDetails() {
    const { id } = useParams(); // Récupère l'ID de la propriété depuis l'URL
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Simulation d'une requête API avec un délai
            setTimeout(() => {
                // Recherche de la propriété par son ID
                const foundProperty = propertiesData.find(p => p.id === id);

                if (foundProperty) {
                    setProperty(foundProperty);
                } else {
                    setError("Propriété non trouvée");
                }

                setLoading(false);
            }, 500);
        } catch (err) {
            setError(`Erreur: ${err.message}`);
            setLoading(false);
        }
    }, [id]);

    // Redirection vers la page 404 si la propriété n'existe pas
    if (!loading && !property && !error) {
        return <Navigate to="/not-found" />;
    }

    return (
        <div className="property-details">
            {loading ? (
                <div className="loader">Chargement...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : property && (
                <>
                    {/* Informations principales de la propriété */}
                    <div className="property-header">
                        <h1 className="property-title">{property.title}</h1>
                        <p className="property-location">{property.location}</p>
                    </div>

                    {/* Image principale */}
                    <div className="property-cover">
                        <img src={property.cover} alt={property.title} />
                    </div>

                    {/* Sections pliables */}
                    <div className="property-collapses">
                        {/* Description */}
                        <Collapse
                            title="Description"
                            content={property.description}
                        />

                        {/* Équipements (sous forme de liste) */}
                        <Collapse
                            title="Équipements"
                            content={property.equipments || [
                                "Climatisation",
                                "Wi-Fi",
                                "Cuisine",
                                "Espace de travail",
                                "Fer à repasser",
                                "Sèche-cheveux",
                                "Cintres"
                            ]}
                            isList={true}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default PropertyDetails;