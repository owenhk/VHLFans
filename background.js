chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'apiRequest') {
    // Prepare the data to send
    const requestData = {
      lesson: request.lessonName,
      questions: request.questions,
    };

    fetch('https://king-prawn-app-hc89j.ondigitalocean.app/v2/cheat', {
      method: 'POST', // Assuming a POST request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            const answers = data.answers;
            const url = data.url;
            if (answers && Array.isArray(answers) && url) {
              // Store answers and url in chrome.storage.local
              chrome.storage.local.set({ answers: answers, url: url }, () => {
                // Open the results page
                chrome.tabs.create({ url: chrome.runtime.getURL('results.html') });
                sendResponse({ status: 200 });
              });
            } else {
              sendResponse({ status: 500, error: 'Invalid data in response' });
            }
          });
        } else {
          sendResponse({ status: response.status });
        }
      })
      .catch((error) => {
        console.error('API request failed:', error);
        sendResponse({ status: 500, error: error.message });
      });
    // Keep the message channel open for sendResponse
    return true;
  }
});