// ── Sélection des éléments DOM ──────────────
// Ces lignes récupèrent les éléments HTML par leur id.
// Tu n'as pas besoin de les modifier.

const btnJouer = document.getElementById('btn-jouer');
const btnSuivant = document.getElementById('btn-suivant');
const btnRejouer = document.getElementById('btn-rejouer');

const ecranAccueil = document.getElementById('ecran-accueil');
const ecranQuestion = document.getElementById('ecran-question');
const ecranResultats = document.getElementById('ecran-resultats');

const texteQuestion = document.getElementById('texte-question');
const compteurQuestion = document.getElementById('compteur-question');
const progression = document.getElementById('progression');
const listeReponses = document.getElementById('liste-reponses');
const feedbackReponse = document.getElementById('feedback-reponse');
const imageQuestion = document.getElementById('image-question');

const scoreElement = document.getElementById('score');
const felicitation = document.getElementById('felicitation');
const messageReussi = document.getElementById('message-reussi');
const messageEchec = document.getElementById('message-echec');
const titreResultats = document.getElementById('titre-resultats');

//... Crée autant de constantes que d'éléments HTML à récupérer


btnJouer.addEventListener("click", démarrerQuiz);
btnRejouer.addEventListener("click", démarrerQuiz);

let indexCourant = 0    // numéro de la question en cours (commence à 0)
let score = 0    // nombre de bonnes réponses
let reponseDonnee = false


// ── Chargement du JSON ───────────────────────
// Cette fonction est déjà écrite.
// Elle charge le fichier questions.json et remplit l'écran d'accueil.



// ── Navigation entre les écrans ──────────────
// Cette fonction est déjà écrite.
// Elle cache tous les écrans puis affiche celui qu'on lui donne.

const afficher = (ecran) => {
  ecranAccueil.classList.add('cache')
  ecranQuestion.classList.add('cache')
  ecranResultats.classList.add('cache')
  ecran.classList.remove('cache')
};

function chargerQuestion() {
  if (indexQuestionActuelle >= questions.length) 
    afficherEcranResultats();
    return;
  }

  const q = questions[indexQuestionActuelle];

 
  ecranQuestion.innerHTML = `
    <header>
      <h2>Question ${q.id} / ${questions.length}</h2>
      <p id="intitule-question">${q.question}</p>
    </header>
    <section id="options-conteneur"></section>
  `;

  const conteneurOptions = document.getElementById("options-conteneur");

const afficherQuestion = () => { const questionActuelle = questions[indexCourant];
reponseDonnee = false;
    // Énoncé et progression
    texteQuestion.textContent = questionActuelle.question;
    compteurQuestion.textContent =
        `Question ${indexCourant + 1} / ${questions.length}`;

    progression.max = questions.length;
    progression.value = indexCourant + 1;

    imageQuestion.classList.add('cache');
    imageQuestion.removeAttribute('src');
    imageQuestion.alt = '';

    // Réinitialiser les réponses précédentes
    listeReponses.replaceChildren();
    feedbackReponse.textContent = '';

    // Cacher le bouton Suivant jusqu'à la réponse.
    btnSuivant.classList.add('cache');

    // Créer un bouton accessible pour chaque réponse
    questionActuelle.reponses.forEach((reponse, indexReponse) => {
const bouton = document.createElement('button');

        bouton.type = 'button';
        bouton.classList.add('bouton-reponse');
        bouton.textContent = reponse;

        bouton.addEventListener('click', () => {
            verifierReponse(indexReponse);
        });

        listeReponses.appendChild(bouton);
    });

    // Mettre le focus sur la première réponse
const premiereReponse = listeReponses.querySelector('button');

    if (premiereReponse) {
        premiereReponse.focus();
    }
};

  // Écris ton code ici

function vérifierRéponse(indexSelectionne) {
  const q = questions[indexQuestionActuelle];
}
  if (indexSelectionne === q.bonne_reponse) {
    score++;
  }

// Empêcher plusieurs réponses à la même question.
const verifierReponse = (indexChoisi) => {
  if (reponseDonnee) {
        return;
    }

    reponseDonnee = true;

    const questionActuelle = questions[indexCourant];
    const bonneReponse = questionActuelle.bonne_reponse;

    imageQuestion.src = questionActuelle.image;
    imageQuestion.alt = `Illustration : ${questionActuelle.question}`;
    imageQuestion.classList.remove('cache');

    const boutons = listeReponses.querySelectorAll('button');
    // Désactiver toutes les réponses après le choix.
    boutons.forEach((bouton) => {
        bouton.disabled = true;
    });

    // Indiquer la bonne réponse.
    if (boutons[bonneReponse]) {
        boutons[bonneReponse].classList.add('correcte');
    }

    // Comparer la réponse choisie à la bonne réponse.
    if (indexChoisi === bonneReponse) {
        score++;

    } else {
        boutons[indexChoisi].classList.add('incorrecte');

       
    }
    

    // Afficher le feedback aux technologies d'assistance.
    feedbackReponse.setAttribute('role', 'status');
    feedbackReponse.setAttribute('aria-live', 'polite');

    // Afficher le bouton Suivant.
    btnSuivant.classList.remove('cache');
    btnSuivant.focus();
};

function afficherEcranResultats() {
  ecranAccueil.classList.add("ecran-cache");
  ecranQuestion.classList.add("ecran-cache");
  ecranResultats.classList.remove("ecran-cache");
}
  elementScore.textContent = `${score} / ${questions.length}`;

const afficherResultats = () => {
    // Afficher le score final.
    scoreElement.textContent = `${score} / ${questions.length}`;

    // Cacher les deux messages avant de choisir lequel afficher.
    messageReussi.classList.add('cache');
    messageEchec.classList.add('cache');

    // Déterminer si le quiz est réussi.
    const pourcentage = (score / questions.length) * 100;

    if (pourcentage >= 50) {
        felicitation.textContent = 'Bravo, bien joué !';
        messageReussi.classList.remove('cache');
    } else {
        felicitation.textContent =           

        messageEchec.classList.remove('cache');
    }

    // Afficher l'écran des résultats.
    afficher(ecranResultats);

    // Placer le focus sur le bouton Rejouer.
    btnRejouer.focus();
};
// bouton JOUER
btnJouer.addEventListener('click', () => {
    if (!Array.isArray(questions) || questions.length === 0) {
        return;
    }

    // Réinitialiser le quiz.
    indexCourant = 0;
    score = 0;
    reponseDonnee = false;

    // Afficher la première question.
    afficher(ecranQuestion);
    afficherQuestion();
});

// bouton question suivante
btnSuivant.addEventListener('click', () => {
    // Ne pas avancer sans réponse.
    if (!reponseDonnee) {
        return;
    }

    indexCourant++;

    // Afficher la question suivante ou les résultats.
    if (indexCourant < questions.length) {
        afficherQuestion();
    } else {
        afficherResultats();
    }
});

// bouton REJOUER
btnRejouer.addEventListener('click', () => {
    // Réinitialiser les variables.
    indexCourant = 0;
    score = 0;
    reponseDonnee = false;

    // Retourner à l'accueil.
    afficher(ecranAccueil);

    // Rendre le focus au bouton Jouer.
    btnJouer.focus();
});




ecranAccueil.classList.remove("ecran-cache");
ecranQuestion.classList.add("ecran-cache");
ecranResultats.classList.add("ecran-cache");
