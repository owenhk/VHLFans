chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'apiRequest') {
        const lessonName = request.lessonName;
        const questions = request.questions;
      // Perform the API request
      fetch('https://king-prawn-app-hc89j.ondigitalocean.app/cheat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson: lessonName, questions: questions })
    })
    .then(response => {
        if (response.status === 200) {
          // Successful response
          return response.json().then(data => {
            // Extract the "url" field from the response JSON
            const url = data.url;
            if (url) {
              sendResponse({ status: 200, url: url });
            } else {
              // "url" field is missing in the response
              sendResponse({ status: 500, error: 'URL not found in response' });
            }
          });
        } else {
          // Non-200 status code
          sendResponse({ status: response.status });
        }
      })
      .catch(error => {
        console.error('API request failed:', error);
        sendResponse({ status: 500, error: error.message });
      });

      // Indicate that the response is asynchronous
      return true;
    } else if (request.action === 'openTab') {
      // Open a new tab with the specified URL
      chrome.tabs.create({ url: request.url });
    }
  });