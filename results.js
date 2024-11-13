document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the answers and url from storage
    chrome.storage.local.get(['answers', 'url'], (data) => {
      const answers = data.answers;
      const quizletUrl = data.url;
  
      if (answers && Array.isArray(answers)) {
        displayAnswers(answers);
        // Optionally clear the stored answers
        chrome.storage.local.remove('answers');
      } else {
        document.getElementById('answers').innerText = 'No answers found.';
      }
  
      if (quizletUrl) {
        setupQuizletButton(quizletUrl);
        // Optionally clear the stored url
        chrome.storage.local.remove('url');
      } else {
        document.getElementById('quizlet-button').style.display = 'none';
      }
    });
  });
  
  
  function displayAnswers(answers) {
    const answersDiv = document.getElementById('answers');
    answers.forEach((item, index) => {
      // Create elements
      const questionEl = document.createElement('div');
      questionEl.className = 'question';
  
      const questionTitle = document.createElement('h2');
      questionTitle.innerText = `Question ${index + 1}`;
  
      const questionText = document.createElement('p');
      questionText.innerText = item.question;
      questionText.className = 'question-text';
  
      const answerText = document.createElement('p');
      answerText.innerText = `Answer: ${item.answer}`;
      answerText.className = 'answer-text';
  
      const copyButton = document.createElement('button');
      copyButton.innerText = 'Copy Answer';
      copyButton.className = 'copy-button';
      copyButton.addEventListener('click', () => {
        copyToClipboard(item.answer);
        copyButton.innerText = 'Copied!';
        setTimeout(() => {
          copyButton.innerText = 'Copy Answer';
        }, 2000);
      });
  
      const explanationText = document.createElement('p');
      explanationText.innerText = `Explanation: ${item.explanation}`;
      explanationText.className = 'explanation-text';
  
      // Append elements
      questionEl.appendChild(questionTitle);
      questionEl.appendChild(questionText);
      questionEl.appendChild(answerText);
      questionEl.appendChild(copyButton);
      questionEl.appendChild(explanationText);
  
      answersDiv.appendChild(questionEl);
    });
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Copied to clipboard:', text);
      },
      (err) => {
        console.error('Could not copy text:', err);
      }
    );
    function setupQuizletButton(url) {
        const quizletButton = document.getElementById('quizlet-button');
        quizletButton.addEventListener('click', () => {
          window.open(url, '_blank');
        });
      }
    }