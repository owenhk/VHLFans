// Function to extract the lesson name along with the chapter and book
function getLessonName() {
    const lessonNameElement = document.querySelector('meta[name="VHL.lesson_name"]');
    if (lessonNameElement) {
      return lessonNameElement.getAttribute('content').replace(/<br\s*\/?>/g, ' ');
    }
    return null;
  }
  
  // Function to extract the list of questions
  // Function to extract the list of questions
  function getQuestions() {
    const questions = [];
    const questionElements = document.querySelectorAll('.questions');
    questionElements.forEach((questionElement) => {
      const questionTextElement = questionElement.querySelector(
        'div[data-helpable-type="whole_question"]'
      );
      if (questionTextElement) {
        const questionText = questionTextElement.textContent.trim();
        questions.push(questionText);
      }
    });
    // Return a comma-separated list of questions
    return questions.join(', ');
  }

// Select the header container and the <hr> element
const headerContainer = document.querySelector('.c-activity-header');
const hrElement = document.querySelector('.c-activity-header__rule');

// Apply flex styles to the header container to align items vertically centered
if (headerContainer) {
    headerContainer.style.display = 'flex';
    headerContainer.style.alignItems = 'center'; // Centers items vertically
}

// Create the button
const button = document.createElement('button');
button.innerText = '💨 Cheat with VHLFans';
button.style.padding = '10px 20px';
button.style.backgroundColor = '#4654f6';
button.style.color = '#FFF';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.style.marginLeft = '10px';
button.style.display = 'inline-block'; // Ensures it aligns inline with other items

// Insert the button before the <hr> element
if (headerContainer && hrElement) {
    headerContainer.insertBefore(button, hrElement);
}

// Add click event listener
button.addEventListener('click', () => {
  button.innerText = 'Loading...';
  button.disabled = true;

  // Extract data
  const lessonName = getLessonName();
  const questions = getQuestions();

  // Send a message to the background script to make the API request
  chrome.runtime.sendMessage(
    {
      action: 'apiRequest',
      lessonName: lessonName,
      questions: questions,
    },
    (response) => {
      if (response.status === 200) {
        // The background script will open the results page
      } else {
        button.innerText = 'Error, try again';
        console.error('API Request Error:', response.error || 'Unknown error');
      }
      button.disabled = false;
    }
  );
});