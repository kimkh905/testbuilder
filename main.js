const footerStatus = document.querySelector("#footer-status");
const revealItems = document.querySelectorAll(".reveal");
const consonantGrid = document.querySelector("#consonant-grid");
const vowelGrid = document.querySelector("#vowel-grid");
const phraseList = document.querySelector("#phrase-list");
const phraseTabs = document.querySelectorAll(".phrase-tab");
const quizQuestion = document.querySelector("#quiz-question");
const quizOptions = document.querySelector("#quiz-options");
const quizFeedback = document.querySelector("#quiz-feedback");
const nextQuestionButton = document.querySelector("#next-question");

const consonants = [
  { char: "ㄱ", sound: "g/k", tip: "Soft g at the start, k-like at the end." },
  { char: "ㄴ", sound: "n", tip: "Like n in nice." },
  { char: "ㄷ", sound: "d/t", tip: "Soft d first, t-like at the end." },
  { char: "ㄹ", sound: "r/l", tip: "Between r and l depending on position." },
  { char: "ㅁ", sound: "m", tip: "Like m in mom." },
  { char: "ㅂ", sound: "b/p", tip: "Soft b first, p-like at the end." },
];

const vowels = [
  { char: "ㅏ", sound: "a", tip: "Like a in father." },
  { char: "ㅓ", sound: "eo", tip: "Open o sound, common in Korean." },
  { char: "ㅗ", sound: "o", tip: "Rounded o sound." },
  { char: "ㅜ", sound: "u", tip: "Like oo in moon." },
  { char: "ㅡ", sound: "eu", tip: "Flat unrounded vowel." },
  { char: "ㅣ", sound: "i", tip: "Like ee in see." },
];

const phraseSets = {
  greetings: [
    { korean: "안녕하세요", romanized: "annyeonghaseyo", english: "Hello" },
    { korean: "감사합니다", romanized: "gamsahamnida", english: "Thank you" },
    { korean: "죄송합니다", romanized: "joesonghamnida", english: "I am sorry" },
  ],
  travel: [
    { korean: "이거 얼마예요?", romanized: "igeo eolmayeyo?", english: "How much is this?" },
    { korean: "화장실 어디예요?", romanized: "hwajangsil eodiyeyo?", english: "Where is the bathroom?" },
    { korean: "지하철역이 어디예요?", romanized: "jihacheolyeogi eodiyeyo?", english: "Where is the subway station?" },
  ],
  cafe: [
    { korean: "아메리카노 한 잔 주세요", romanized: "amerika-no han jan juseyo", english: "One Americano, please" },
    { korean: "포장해 주세요", romanized: "pojanghae juseyo", english: "Please make it to-go" },
    { korean: "차가운 걸로 주세요", romanized: "chagaun geollo juseyo", english: "Please make it cold" },
  ],
};

const quizData = [
  {
    question: "What does \"감사합니다\" mean?",
    options: ["Thank you", "Goodbye", "Excuse me"],
    answer: "Thank you",
    feedback: "\"감사합니다\" is the standard polite way to say thank you.",
  },
  {
    question: "Which vowel sounds closest to \"ee\" in English?",
    options: ["ㅓ", "ㅣ", "ㅡ"],
    answer: "ㅣ",
    feedback: "\"ㅣ\" sounds like ee in see.",
  },
  {
    question: "What is the safest speech style for most beginners?",
    options: ["Casual speech only", "Polite speech first", "Slang first"],
    answer: "Polite speech first",
    feedback: "Polite endings are safer and more useful in real daily situations.",
  },
];

let quizIndex = 0;
let questionAnswered = false;

function createHangulTile(item) {
  const card = document.createElement("article");
  card.className = "hangul-tile";

  const char = document.createElement("div");
  char.className = "hangul-char";
  char.textContent = item.char;

  const sound = document.createElement("div");
  sound.className = "hangul-meta";
  sound.textContent = `Sound: ${item.sound}`;

  const tip = document.createElement("div");
  tip.className = "hangul-meta";
  tip.textContent = item.tip;

  card.append(char, sound, tip);
  return card;
}

function renderHangul() {
  consonants.forEach((item) => consonantGrid.append(createHangulTile(item)));
  vowels.forEach((item) => vowelGrid.append(createHangulTile(item)));
}

function renderPhrases(setName) {
  phraseList.innerHTML = "";

  phraseSets[setName].forEach((phrase) => {
    const card = document.createElement("article");
    card.className = "phrase-card";

    const korean = document.createElement("div");
    korean.className = "phrase-korean";
    korean.textContent = phrase.korean;

    const romanized = document.createElement("div");
    romanized.className = "phrase-romanized";
    romanized.textContent = phrase.romanized;

    const english = document.createElement("p");
    english.className = "phrase-english";
    english.textContent = phrase.english;

    card.append(korean, romanized, english);
    phraseList.append(card);
  });
}

function setActiveTab(targetSet) {
  phraseTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.set === targetSet);
  });
}

function renderQuestion() {
  const current = quizData[quizIndex];
  questionAnswered = false;
  quizQuestion.textContent = current.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";

  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(button, option));
    quizOptions.append(button);
  });
}

function handleAnswer(button, option) {
  if (questionAnswered) {
    return;
  }

  questionAnswered = true;
  const current = quizData[quizIndex];
  const buttons = quizOptions.querySelectorAll(".quiz-option");

  buttons.forEach((item) => {
    item.disabled = true;

    if (item.textContent === current.answer) {
      item.classList.add("is-correct");
    }
  });

  if (option !== current.answer) {
    button.classList.add("is-wrong");
  }

  quizFeedback.textContent = current.feedback;
}

function showNextQuestion() {
  quizIndex = (quizIndex + 1) % quizData.length;
  renderQuestion();
}

if (footerStatus) {
  const year = new Date().getFullYear();
  footerStatus.textContent = `Built for Korean learners in ${year}.`;
}

if (consonantGrid && vowelGrid) {
  renderHangul();
}

if (phraseList && phraseTabs.length > 0) {
  renderPhrases("greetings");

  phraseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetSet = tab.dataset.set;
      setActiveTab(targetSet);
      renderPhrases(targetSet);
    });
  });
}

if (quizQuestion && quizOptions && nextQuestionButton) {
  renderQuestion();
  nextQuestionButton.addEventListener("click", showNextQuestion);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
  revealObserver.observe(item);
});
