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

        feedbackReponse.textContent = 'Bonne réponse !'
    } else {
        boutons[indexChoisi].classList.add('incorrecte');

       feedbackReponse.textContent =
            `Mauvaise réponse. La bonne réponse était : ${questionActuelle.reponses[bonneReponse]}.`;
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

let animationId = null;
let particules = [];

function initFeuArtifice() {
  const canvas = document.getElementById('canvas-artifice');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particules = [];

  function creerExplosion(x, y) {
    const nombreParticules = 55;
    const couleur = `hsl(${Math.random() * 360}, 100%, 50%)`;
    for (let i = 0; i < nombreParticules; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vitesse = Math.random() * 4 + 1;
      particules.push({
        x: x, y: y,
        vx: Math.cos(angle) * vitesse,
        vy: Math.sin(angle) * vitesse,
        alpha: 1, couleur: couleur
      });
    }
  }

  function boucleAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) {
      creerExplosion(Math.random() * canvas.width, Math.random() * (canvas.height * 0.6));
    }
    for (let i = particules.length - 1; i >= 0; i--) {
      const p = particules[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.alpha -= 0.015;
      if (p.alpha <= 0) { particules.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.couleur;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    animationId = requestAnimationFrame(boucleAnimation);
  }
  boucleAnimation();
}

const stopperAnimationArtifice = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  const canvas = document.getElementById('canvas-artifice');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

// Arrête l'animation si on relance une partie
document.getElementById('btn-jouer')?.addEventListener('click', stopperAnimationArtifice);
document.getElementById('btn-rejouer')?.addEventListener('click', stopperAnimationArtifice);

// Redimensionne proprement si la taille d'écran change
window.addEventListener('resize', () => {
  const canvas = document.getElementById('canvas-artifice');
  if (canvas && document.getElementById('ecran-resultats') && !document.getElementById('ecran-resultats').classList.contains('cache') && score >= 7) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// Déclencheur automatique branché sur le bouton "Suivant" de la dernière question
document.getElementById('btn-suivant')?.addEventListener('click', () => {
  // Le délai de 10ms permet de laisser votre fonction afficherResultats s'exécuter d'abord
  setTimeout(() => {
    const ecranResultatsVisivel = !document.getElementById('ecran-resultats')?.classList.contains('cache');
    if (ecranResultatsVisivel && score >= 7) {
      initFeuArtifice();
    }
  }, 10);
});
