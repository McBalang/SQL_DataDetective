showSection('story-section');
let currentTutorialSlide = 0;
history.pushState({}, "SQL DataDetective Demo", "/SQL_DataDetective");


function resetTextArea() {
  const sqlQueryTextarea = document.getElementById('sqlQuery');
  sqlQueryTextarea.value = '';
}

function appendCommand(command) {
  const sqlQueryTextarea = document.getElementById('sqlQuery');

  // Append the selected command to the existing content in the textarea
  const currentContent = sqlQueryTextarea.value.trim();
  const separator = currentContent.length > 0 ? ' ' : ''; // Add a space separator if needed
  sqlQueryTextarea.value = currentContent + separator + command;
}

  function goHome() {
    window.location.href = "index.html";
  }

function displayQueryResults(data) {
  console.log('Received data:', data);  // Add this line for debugging

  var table = '';

  // Check if data is an array with at least one element
  if (Array.isArray(data) && data.length > 0) {
    const headers = Object.keys(data[0]); // Extract keys from the first object

    table += '<table class="result-table"><thead><tr>';

    // Use headers array for table headers
    headers.forEach(function (header) {
      table += '<th>' + header + '</th>';
    });

    table += '</tr></thead><tbody>';

    // Iterate over each object in the array
    data.forEach(function (row) {
      table += '<tr>';
      // Use headers array to access values in each object
      headers.forEach(function (header) {
        table += '<td>' + row[header] + '</td>';
      });
      table += '</tr>';
    });

    table += '</tbody></table>';
  } else {
    // Display an error message if data is not in the expected format
    table = '<div style="color: red;">Error: Invalid data format</div>';
    console.error('Invalid data format:', data);  // Log an error for further debugging
  }
  document.getElementById('queryResult').innerHTML = table;
}

  const sliderContent = document.querySelector('.slider-content');
  const slideWidth = document.querySelector('.slide').offsetWidth;

  let currentSlide = 0;

  // Function to slide to the next content
  function nextSlide() {
    currentSlide = (currentSlide + 1) % 7;
    updateSlider();
  }

  // Function to slide to the previous content
  function prevSlide() {
    currentSlide = (currentSlide - 1 + 7) % 7;
    updateSlider();
  }

  // Function to update the slider based on the current slide index
  function updateSlider() {
    const nextTranslateX = -currentSlide * slideWidth;
    sliderContent.style.transform = `translateX(${nextTranslateX}px)`;
  }

function prevTutorial() {
  if (currentTutorialSlide > 0) {
    currentTutorialSlide--;
    showTutorialSlide();
  }
}

function nextTutorial() {
  // Assume the maximum slide index is tutorialContent.children.length - 1
  const maxSlideIndex = document.getElementById('tutorialContent').children.length - 1;

  if (currentTutorialSlide < maxSlideIndex) {
    currentTutorialSlide++;
    showTutorialSlide();
  }
}

function showTutorialSlide() {
  const tutorialContent = document.getElementById('tutorialContent');
  tutorialContent.style.transform = `translateX(${-currentTutorialSlide * 100}%)`;
}

function executeQuery() {
  const sqlQuery = document.getElementById('sqlQuery').value;

  fetch(`/query?sql=${encodeURIComponent(sqlQuery)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        displayErrorMessage(data.error);
      } else {
        displayQueryResults(data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      displayErrorMessage('Something wrong with your SQL Statement :(');
    });
}

function displayErrorMessage(message) {
  alert(`Error: ${message}`);
}

function selectStory(storyType) {
  // Redirect to the advanced.html page with the selected story type
  window.location.href = `advanced.html?type=${storyType}`;
}

function showSection(sectionId) {
  // Hide all content sections
  var contentSections = document.querySelectorAll('.content');
  contentSections.forEach(function (section) {
    section.style.display = 'none';
  });

  // Remove 'active' class from all tabs
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
  });

  // Show the selected section
  var selectedSection = document.querySelector('.' + sectionId);
  if (selectedSection) {
    selectedSection.style.display = 'block';

    // Add 'active' class to the clicked tab
    var clickedTab = document.querySelector('.' + sectionId + '-tab');
    if (clickedTab) {
      clickedTab.classList.add('active');
    } else {
      console.log('Clicked tab not found:', sectionId + '-tab');
    }
  } else {
    console.log('Selected section not found:', sectionId);
  }
}

function showSection(sectionId) {
  // Hide all content sections
  var contentSections = document.querySelectorAll('.content');
  contentSections.forEach(function (section) {
    section.style.display = 'none';
  });

  // Show the selected section
  var selectedSection = document.querySelector('.' + sectionId);
  selectedSection.style.display = 'block';

  // If the "Submit Answer" section is clicked, generate the input fields
  if (sectionId === 'submit-answer-section') {
    generateSubmitAnswerFields();
  }
}

function generateSubmitAnswerFields() {
  var submitAnswerSection = document.querySelector('.submit-answer-section');
  submitAnswerSection.innerHTML = ''; // Clear existing content

  // Create a container for multiple sets of input fields
  var inputContainer = document.createElement('div');
  inputContainer.id = 'inputContainer';
  submitAnswerSection.appendChild(inputContainer);

  // Create initial set of input fields
  addInputFields(inputContainer);

  // Create "Add" button to dynamically add more sets of input fields
  var addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.onclick = function () {
    addInputFields(inputContainer);
  };
  submitAnswerSection.appendChild(addButton);

  // Create "Submit" button
  var submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Answer(s)';
  submitButton.onclick = submitAnswers;
  submitAnswerSection.appendChild(submitButton);
}

// Add this function to your script.js
function generateSubmitAnswerFields() {
  var submitAnswerSection = document.querySelector('.submit-answer-section');
  submitAnswerSection.innerHTML = ''; // Clear existing content

  // Create container for the form
  var formContainer = document.createElement('div');
  formContainer.classList.add('form-container');
  submitAnswerSection.appendChild(formContainer);

  // Create header for the form
  var formHeader = document.createElement('h2');
  formHeader.textContent = 'Welcome to SQL City Reporting Interface';
  formContainer.appendChild(formHeader);

  // Create form fields
  addInputFields(formContainer);

  // Create "Add" button to dynamically add more sets of input fields
  var addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.onclick = function () {
    addInputFields(formContainer);
  };
  formContainer.appendChild(addButton);

  // Create "Remove" button to dynamically remove sets of input fields
  var removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.onclick = function () {
    formContainer.removeChild(inputSetContainer); // Assuming inputSetContainer is declared elsewhere
  };
  formContainer.appendChild(removeButton);

  // Create "Submit" button
  var submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Answer(s)';
  submitButton.onclick = submitAnswers;
  formContainer.appendChild(submitButton);
}


function addInputFields(container) {
  // Create a container for each set of input fields
  var inputSetContainer = document.createElement('div');

  // Create dropdown menu for report type
  var reportTypeLabel = document.createElement('label');
  reportTypeLabel.for = 'reportType';
  reportTypeLabel.textContent = 'Report Type:';
  inputSetContainer.appendChild(reportTypeLabel);

  var reportTypeSelect = document.createElement('select');
  reportTypeSelect.name = 'reportType';
  var crimeOption = document.createElement('option');
  crimeOption.value = 'Crime';
  crimeOption.text = 'Crime';
  var taskOption = document.createElement('option');
  taskOption.value = 'Task';
  taskOption.text = 'Task';
  reportTypeSelect.add(crimeOption);
  reportTypeSelect.add(taskOption);
  inputSetContainer.appendChild(reportTypeSelect);

  // Create input fields for first name
  var firstNameLabel = document.createElement('label');
  firstNameLabel.for = 'firstName';
  firstNameLabel.textContent = 'First Name:';
  inputSetContainer.appendChild(firstNameLabel);

  var firstNameInput = document.createElement('input');
  firstNameInput.type = 'text';
  firstNameInput.name = 'firstName';
  firstNameInput.placeholder = 'Enter first name';
  inputSetContainer.appendChild(firstNameInput);

  // Create input fields for last name
  var lastNameLabel = document.createElement('label');
  lastNameLabel.for = 'lastName';
  lastNameLabel.textContent = 'Last Name:';
  inputSetContainer.appendChild(lastNameLabel);

  var lastNameInput = document.createElement('input');
  lastNameInput.type = 'text';
  lastNameInput.name = 'lastName';
  lastNameInput.placeholder = 'Enter last name';
  inputSetContainer.appendChild(lastNameInput);

  // Create input fields for evidence ID
  var evidenceLabel = document.createElement('label');
  evidenceLabel.for = 'evidenceId';
  evidenceLabel.textContent = 'Evidence ID:';
  inputSetContainer.appendChild(evidenceLabel);

  var evidenceInput = document.createElement('input');
  evidenceInput.type = 'text';
  evidenceInput.name = 'evidenceId';
  evidenceInput.placeholder = 'Enter evidence ID';
  inputSetContainer.appendChild(evidenceInput);

  // Add the set of input fields to the main container
  container.appendChild(inputSetContainer);

  // Add line break for better separation between sets
  container.appendChild(document.createElement('br'));
}

function submitAnswers(container) {
  // Process the current set of input fields
  var reportType = container.querySelector('[name="reportType"]').value;
  var firstName = container.querySelector('[name="firstName"]').value;
  var lastName = container.querySelector('[name="lastName"]').value;
  var evidenceId = container.querySelector('[name="evidenceId"]').value;

  // Define correct answers
  var correctAnswers = [
    { reportType: 'Crime', firstName: 'Aleks', lastName: 'Tanaka', evidenceId: '20' },
    { reportType: 'Crime', firstName: 'John', lastName: 'Silva', evidenceId: '77' }
    // Add more correct answers as needed
  ];

  // Check if the submitted answers match any of the correct answers
  var isCorrect = correctAnswers.some(function (correctAnswer) {
    return (
      correctAnswer.reportType === reportType &&
      correctAnswer.firstName === firstName &&
      correctAnswer.lastName === lastName &&
      correctAnswer.evidenceId === evidenceId
    );
  });

  // Display feedback based on correctness
  if (isCorrect) {
    console.log('Correct answer! Well done!');
    // You can add additional logic or UI changes for correct answers
  } else {
    console.log('Incorrect answer. Please try again.');
    // You can add additional logic or UI changes for incorrect answers
  }
}





