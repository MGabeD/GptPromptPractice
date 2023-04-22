const userPromptElement = document.getElementById("user-prompt");
const submitButton = document.getElementById("submit-btn");
const hintButton = document.getElementById("hint-btn");
const revealButton = document.getElementById("reveal-btn");
const targetResponseElement = document.getElementById("target-response");
const scoreElement = document.getElementById("score");
const backEndUrl = process.env.BACKEND || "http://localhost:3000"
const apiUrl = backEndUrl + "/api/gpt";

let currentData = [
  {
    targetResponse: "List of steps to create an interactive prompt engineering application",
    correctPrompt: "What are the steps to create an interactive application that helps users practice prompt engineering?",
    hint: "Ask about the steps to create an application for practicing prompt engineering.",
  },
  {
    targetResponse: "Tips to improve query refinement",
    correctPrompt: "What are some suggestions to refine queries for better responses from language models?",
    hint: "Ask for suggestions on refining queries for improved results.",
  },
  {
    targetResponse: "Ways to make the application more engaging and gamified",
    correctPrompt: "How can I incorporate gamification features to make the application more engaging?",
    hint: "Ask about incorporating gamification features into the application.",
  },
  {
    targetResponse: "How to integrate OpenAI API in the application",
    correctPrompt: "What is the process to integrate the OpenAI API into my application?",
    hint: "Ask about integrating the OpenAI API into the application.",
  },
  {
    targetResponse: "Best practices for prompt engineering",
    correctPrompt: "What are some best practices for effective prompt engineering?",
    hint: "Ask for best practices in prompt engineering.",
  },
];


let currentIndex = 0;
let score = 0;

submitButton.addEventListener("click", checkUserInput);
hintButton.addEventListener("click", showHint);
revealButton.addEventListener("click", revealAnswer);

function updateUI() {
  targetResponseElement.textContent = currentData[currentIndex].targetResponse;
  scoreElement.textContent = score;
}

function showHint() {
  alert(currentData[currentIndex].hint);
}

function revealAnswer() {
  alert(`The correct prompt is: ${currentData[currentIndex].correctPrompt}`);
}

async function checkUserInput() {
  const userInput = userPromptElement.value.trim();

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const aiGeneratedResponse = await response.json();

    if (aiGeneratedResponse === currentData[currentIndex].correctPrompt) {
      score++;
      currentIndex++;
      if (currentIndex >= currentData.length) {
        alert("Congratulations! You have completed all the challenges.");
        currentIndex = 0;
      }
      updateUI();
    } else {
      alert("Incorrect. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while processing the request.");
  }

  userPromptElement.value = "";
}

// Initialize UI
updateUI();
