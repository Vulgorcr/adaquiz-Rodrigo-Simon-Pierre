// ════════════════════════════════════════════
//   ADAQUIZ — script.js
//   Certaines fonctions sont déjà écrites.
//   Les fonctions marquées TODO sont à compléter.
// ════════════════════════════════════════════


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
const messageOnFire = document.getElementById('message-on-fire');

const scoreElement = document.getElementById('score');
const felicitation = document.getElementById('felicitation');
const messageReussi = document.getElementById('message-reussi');
const messageEchec = document.getElementById('message-echec');
const titreResultats = document.getElementById('titre-resultats');
let bonnesReponsesConsecutives = 0;

//... Crée autant de constantes que d'éléments HTML à récupérer


// ── État du quiz ─────────────────────────────
// Ces variables stockent les données en cours de partie.
// Tu n'as pas besoin de les modifier.

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


// ════════════════════════════════════════════
//   TODO — Fonctions à compléter
// ════════════════════════════════════════════


// ── TODO : afficherQuestion ──────────────────
// Cette fonction doit afficher la question en cours.
// Elle est appelée au début de chaque nouvelle question.
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante : questions[indexCourant]
//   2. Mettre à jour la barre de progression
//   3. Mettre à jour le compteur ("Question X / Y")
//   4. Afficher le texte de la question dans #texte-question
//   5. Cacher le bouton "Question suivante"
//   6. Vider #liste-reponses, puis créer un bouton pour chaque réponse
//      Chaque bouton doit appeler verifierReponse() au clic

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

    // Cacher le bouton Suivant et le message on Fire jusqu'à la réponse.
    btnSuivant.classList.add('cache');
    messageOnFire.classList.add('cache');
    messageOnFire.classList.remove('animation-on-fire');

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


// ── TODO : verifierReponse ───────────────────
// Cette fonction est appelée quand une apprenante clique sur une réponse.
// Elle reçoit en paramètre l'index de la réponse choisie (0, 1, 2 ou 3).
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante
//   2. Désactiver tous les boutons de réponse
//   3. Colorier en vert la bonne réponse (ajouter la classe "correcte")
//   4. Si la réponse choisie est mauvaise, la colorier en rouge ("incorrecte")
//   5. Si la réponse est bonne, incrémenter le score
//   6. Afficher le bouton "Question suivante"

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
    bonnesReponsesConsecutives++;

    feedbackReponse.textContent = 'Bonne réponse !';
    feedbackReponse.className = 'feedback correcte-texte';

    // Déclencher l'animation après 3 bonnes réponses consécutives.
    if (bonnesReponsesConsecutives === 3) {
        messageOnFire.classList.remove('cache');
        messageOnFire.classList.add('animation-on-fire');
    }

} else {
    boutons[indexChoisi].classList.add('incorrecte');

    // Remettre le compteur à zéro.
    bonnesReponsesConsecutives = 0;

    messageOnFire.classList.add('cache');
    messageOnFire.classList.remove('animation-on-fire');

    feedbackReponse.textContent =
        `Mauvaise réponse. La bonne réponse était : ${questionActuelle.reponses[bonneReponse]}.`;

    feedbackReponse.className = 'feedback incorrecte-texte';
}
    

    // Afficher le feedback aux technologies d'assistance.
    feedbackReponse.setAttribute('role', 'status');
    feedbackReponse.setAttribute('aria-live', 'polite');

    // Afficher le bouton Suivant.
    btnSuivant.classList.remove('cache');
    btnSuivant.focus();
};


// ── TODO : afficherResultats ─────────────────
// Cette fonction est appelée quand toutes les questions ont été répondues.
//
// Ce qu'elle doit faire :
//   1. Afficher le score dans #score-final (ex. "4 / 7")
//   2. Afficher un message dans #message-fin selon le score
//   3. Appeler afficher(ecranResultats) pour passer à l'écran résultats

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
    bonnesReponsesConsecutives = 0;
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
    bonnesReponsesConsecutives = 0;

    // Retourner à l'accueil.
    afficher(ecranAccueil);

    // Rendre le focus au bouton Jouer.
    btnJouer.focus();
});





// ── TODO : écouteurs d'événements ───────────
// Branche les boutons sur les bonnes fonctions.
//
// À faire :
//   - btn-commencer → afficher l'écran question + appeler afficherQuestion()
//   - btn-suivant   → passer à la question suivante ou aux résultats
//   - btn-rejouer   → remettre indexCourant et score à 0, revenir à l'accueil

// Écris ton code ici
