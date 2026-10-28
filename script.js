const ecranAccueil = document.getElementById("ecran-accueil");
const ecranQuestion = document.getElementById("ecran-question");
const ecranResultats = document.getElementById("ecran-resultats");

const btnJouer = document.getElementById("btn-jouer");
const btnRejouer = document.getElementById("btn-rejouer");

const elementScore = document.getElementById("score");
const messageReussi = document.getElementById("message-reussi");
const messageEchec = document.getElementById("message-echec");


let indexQuestionActuelle = 0;
let score = 0;


btnJouer.addEventListener("click", démarrerQuiz);
btnRejouer.addEventListener("click", démarrerQuiz);

function démarrerQuiz() {
  indexQuestionActuelle = 0;
  score = 0;
  
  ecranAccueil.classList.add("ecran-cache");
  ecranResultats.classList.add("ecran-cache");
  ecranQuestion.classList.remove("ecran-cache");
  
  chargerQuestion();
}

function chargerQuestion() {
  if (indexQuestionActuelle >= questions.length) {
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

  
  q.reponses.forEach((reponse, index) => {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "btn-reponse";
    bouton.textContent = reponse;
    
   
    bouton.addEventListener("click", () => vérifierRéponse(index));
    conteneurOptions.appendChild(bouton);
  });
}

function vérifierRéponse(indexSelectionne) {
  const q = questions[indexQuestionActuelle];

  if (indexSelectionne === q.bonne_reponse) {
    score++;
  }

  indexQuestionActuelle++;
  chargerQuestion();
}

function afficherEcranResultats() {
  ecranAccueil.classList.add("ecran-cache");
  ecranQuestion.classList.add("ecran-cache");
  ecranResultats.classList.remove("ecran-cache");

  elementScore.textContent = `${score} / ${questions.length}`;

  
  if (score >= 5) {
    messageReussi.style.display = "block";
    messageEchec.style.display = "none";
  } else {
    messageReussi.style.display = "none";
    messageEchec.style.display = "block";
  }
}

ecranAccueil.classList.remove("ecran-cache");
ecranQuestion.classList.add("ecran-cache");
ecranResultats.classList.add("ecran-cache");