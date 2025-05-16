import { useState, useEffect } from 'react';
import { useParams, Navigate, Routes, Route, Link } from 'react-router-dom';
import Card from '@components/Card/Card.jsx';
import Collapse from '../../components/Collapse/Collapse';
import Carousel from '../../components/Carousel/Carousel';
import propertiesData from '../../data/properties.json';
import './Property.css';

// Composant principal qui définit les routes pour la section Property
function Property() {
    return (
        <Routes>
            {/* Route pour la liste des propriétés */}
            <Route index element={<Properties />} />

            {/* Route pour les détails d'une propriété spécifique avec un paramètre id */}
            <Route path=":id" element={<PropertyDetails />} />
        </Routes>
    );
}

// Composant pour afficher la liste des propriétés
function Properties() {
    // État pour stocker la liste des propriétés
    const [properties, setProperties] = useState([]);

    // État pour indiquer si les données sont en cours de chargement
    const [loading, setLoading] = useState(true);

    // État pour stocker les éventuelles erreurs
    const [error, setError] = useState(null);

    // Effet exécuté une seule fois au montage du composant
    useEffect(() => {
        try {
            // Simulation d'un appel API avec setTimeout
            setTimeout(() => {
                // Chargement des données depuis le fichier JSON importé
                setProperties(propertiesData);
                // Fin du chargement
                setLoading(false);
            }, 1000); // Délai simulé de 1 seconde
        } catch (err) {
            // En cas d'erreur, on stocke le message d'erreur
            setError(`Erreur: ${err.message}`);
            // Et on indique que le chargement est terminé
            setLoading(false);
        }
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois

    return (
        <div className="properties">
            <h1>Nos propriétés</h1>

            {/* Affichage conditionnel basé sur l'état de chargement et les erreurs */}
            {loading ? (
                // Si loading est true, afficher un indicateur de chargement
                <div className="loader">Chargement...</div>
            ) : error ? (
                // Si une erreur est présente, l'afficher
                <div className="error">{error}</div>
            ) : (
                // Sinon, afficher la grille de propriétés
                <section className="properties-grid">
                    {/* Parcourir le tableau de propriétés et afficher une carte pour chacune */}
                    {properties.map((property) => (
                        // Link crée un lien navigable vers la page de détails de la propriété
                        <Link to={`/properties/${property.id}`} key={property.id}>
                            <Card
                                id={property.id}
                                title={property.title}
                                cover={property.cover}
                            />
                        </Link>
                    ))}
                </section>
            )}
        </div>
    );
}

// Composant pour afficher les détails d'une propriété spécifique
function PropertyDetails() {
    // Extraction du paramètre id depuis l'URL
    const { id } = useParams();

    // État pour stocker les données de la propriété sélectionnée
    const [property, setProperty] = useState(null);

    // État pour indiquer si les données sont en cours de chargement
    const [loading, setLoading] = useState(true);

    // État pour stocker les éventuelles erreurs
    const [error, setError] = useState(null);

    // Effet qui s'exécute lorsque l'id change
    useEffect(() => {
        try {
            // Simulation d'un appel API avec setTimeout
            setTimeout(() => {
                // Recherche de la propriété correspondant à l'id dans les données
                const foundProperty = propertiesData.find(p => p.id === id);

                if (foundProperty) {
                    // Si la propriété est trouvée, on met à jour l'état
                    setProperty(foundProperty);
                } else {
                    // Sinon, on enregistre une erreur
                    setError("Propriété non trouvée");
                }

                // Dans tous les cas, on indique que le chargement est terminé
                setLoading(false);
            }, 500); // Délai simulé de 0,5 seconde
        } catch (err) {
            // En cas d'erreur, on stocke le message d'erreur
            setError(`Erreur: ${err.message}`);
            // Et on indique que le chargement est terminé
            setLoading(false);
        }
    }, [id]); // L'effet se déclenche à chaque changement d'id

    // Si le chargement est terminé, qu'aucune propriété n'est trouvée et qu'il n'y a pas d'erreur
    // On redirige vers la page 404
    if (!loading && !property && !error) {
        return <Navigate to="/not-found" />;
    }

    return (
        <div className="property-details">
            {/* Affichage conditionnel basé sur l'état de chargement et les erreurs */}
            {loading ? (
                // Si loading est true, afficher un indicateur de chargement
                <div className="loader">Chargement...</div>
            ) : error ? (
                // Si une erreur est présente, l'afficher
                <div className="error">{error}</div>
            ) : property && (
                <>
                    {/* En-tête avec le titre et l'emplacement */}
                    <div className="property-header">
                        <h1 className="property-title">{property.title}</h1>
                        <p className="property-location">{property.location}</p>
                    </div>

                    {/* Carrousel d'images */}
                    <Carousel pictures={property.pictures} />

                    {/* Sections pliables (collapsibles) */}
                    <div className="property-collapses">
                        {/* Description de la propriété */}
                        <Collapse
                            title="Description"
                            content={property.description}
                        />

                        {/* Liste des équipements */}
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
                            isList={true} // Indique que le contenu doit être affiché comme une liste
                        />
                    </div>
                </>
            )}
        </div>
    );
}

// Exportation du composant principal pour qu'il puisse être importé ailleurs
export default Property;