// Define your quiz questions as an array of objects
const quizQuestions = [
    {
      question: "Question 1",
      choices: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0
    },
    {
      question: "Question 2",
      choices: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 1
    },
    // Add more questions as needed
  ];
  
  // Global variables
  let currentQuestionIndex = 0;
  let score = 0;
  let time = 60;
  let timerInterval;
  
  // Function to start the quiz
  function startQuiz() {
    // Hide start screen and display question screen
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("question-screen").style.display = "block";
    
    // Start the timer
    startTimer();
  
    // Display the first question
    displayQuestion();
  }
  
  // Function to display a question
  function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
  
    // Update question text
    document.getElementById("question-text").textContent = question.question;
  
    // Clear choices list
    const choicesList = document.getElementById("choices-list");
    choicesList.innerHTML = "";
  
    // Create and append choices to the list
    question.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = index;
      li.appendChild(input);
      li.appendChild(document.createTextNode(choice));
      choicesList.appendChild(li);
    });
  }
  
  // Function to submit the selected answer
  function submitAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    
    // Check if an answer is selected
    if (selectedChoice) {
      const selectedAnswer = parseInt(selectedChoice.value);
  
      // Check if the answer is correct
      if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
        // Increment the score
        score++;
      } else {
        // Deduct time for incorrect answer
        time -= 10;
      }
  
      // Go to the next question or end the quiz if all questions are answered
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  }
  
  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(function() {
      time--;
      // Update the timer display
      document.getElementById("timer").textContent = time;
  
      // Check if time has run out
      if (time <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to end the quiz
  function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
  
    // Hide the question screen and display the end screen
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
  
    // Display the final score
    document.getElementById("score").textContent = score;
  
    // Event listener for the submit button
    document.getElementById("submit-button").addEventListener("click", saveScore);
  }
  
  // Function to save the score and initials
  function saveScore(event) {
    event.preventDefault();
  
    // Get the initials from the input field
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value.trim();
  
    // Validate initials
    if (initials === "") {
      alert("Please enter your initials.");
      return;