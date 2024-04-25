function isRequired(value) {
  return value && value.trim(); // Retourne true si la valeur n'est pas vide après avoir supprimé les espaces vides
}

// Fonction pour vérifier si une valeur a une longueur minimale
function isMinLength(value, min) {
  return value.length >= min; // Retourne true si la longueur de la valeur est supérieure ou égale à la longueur minimale spécifiée
}

// Fonction pour obtenir les erreurs de validation du formulaire
function getErrors(values) {
  // Création d'une constante pour stocker les erreurs des différents champs s'il y en a.
  const errors = {};

  // Vérification du champ "search"
  if (!isRequired(values.search)) {
    errors.search = "Veuillez renseigner ce champ.";
  } else if (!isMinLength(values.search, 3)) {
    errors.search = "Veuillez entrer 3 caractères ou plus.";
  }

  return errors;
}

// Fonction pour valider le formulaire
function validateForm(form) {
  // Récupération des données du formulaire
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  // Récupération des erreurs de validation
  const errors = getErrors(values);
  const hasErrors = Object.keys(errors).length > 0;

  // Gestion des erreurs
  if (hasErrors) {
    console.log("Erreurs de validation :", errors);
    return false; // Le formulaire est invalide
  }
  console.log("Formulaire validé avec succès :", values);
  return true; // Le formulaire est valide
}

// Export de la fonction de validation du formulaire
export default validateForm;
