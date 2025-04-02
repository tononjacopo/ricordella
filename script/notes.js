document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const openPopupLink = document.getElementById('open-popup-link');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const priorityDropdownItems = document.querySelectorAll('.dropdown .menu li');
    const selectedPriorityElement = document.querySelector('.dropdown .selected');

    // Open the popup and set current date on creation date input
    openPopupLink.addEventListener('click', function (event) {
        event.preventDefault();
        popup.style.display = 'flex';
        automaticdate('creation-date');
    });

    // Close the popup when clicking the close button
    closePopupBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Update the selected priority when clicking on a dropdown item
    priorityDropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            selectedPriorityElement.textContent = this.textContent.trim();
            updatePriorityClass(this); // Update active class for styling
        });
    });

    // Handle saving the note and closing the popup
    saveNoteBtn.addEventListener('click', saveAndClosePopup);
});

function automaticdate(id) {
    const date = document.getElementById(id);
    date.readOnly = false;
    date.value = new Date().toISOString().slice(0, 10);
    date.readOnly = true;
}

function saveAndClosePopup() {
    var reminderTitle = document.getElementById('reminder-title').value;
    var reminderText = document.getElementById('text').value;
    var priority = document.querySelector('.selected').textContent.trim();

    // Map priority values to the correct backend values
    var priorityMappings = {
        'Normal': 'normal',
        'Medium': 'medium',
        'High': 'high',
        'Very High': 'very-high'
    };

    // Ensure title, text, and priority are filled
    if (reminderTitle.trim() === '' || reminderText.trim() === '' || priority === 'PRIORITY') {
        alert('Please enter TITLE, TEXT, and set PRIORITY before saving.');
        return;
    }

    // Get the current date and time
    var now = new Date();
    var dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    var formData = new FormData();
    formData.append('reminderTitle', reminderTitle);
    formData.append('reminderText', reminderText);
    formData.append('priority', priorityMappings[priority]); // Correctly mapped priority
    formData.append('dateString', dateString);

    // Send the POST request to the PHP script
    fetch('../php/notes.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message);
                addNewNoteToUI(reminderTitle, reminderText, priority, dateString);
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the note. Please try again.');
        });

    // Clear form fields and close popup
    document.getElementById('reminder-title').value = '';
    document.getElementById('text').value = '';
    document.querySelector('.selected').textContent = 'PRIORITY';
    closePopup();
}

function addNewNoteToUI(reminderTitle, reminderText, priority, dateString) {
    var noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');

    var noteTitle = document.createElement('h2');
    noteTitle.textContent = reminderTitle;

    var noteText = document.createElement('p');
    noteText.textContent = reminderText;

    var notePriority = document.createElement('span');
    notePriority.textContent = 'Priority: ' + priority;
    notePriority.classList.add('note-priority');

    var noteDate = document.createElement('span');
    noteDate.textContent = 'Last edit: ' + dateString;
    noteDate.classList.add('note-date');

    noteContainer.appendChild(noteTitle);
    noteContainer.appendChild(notePriority);
    noteContainer.appendChild(noteText);
    noteContainer.appendChild(noteDate);

    document.querySelector('.notes-exposing').appendChild(noteContainer);
}

function updatePriorityClass(item) {
    // Remove active class from all items
    document.querySelectorAll('.dropdown .menu li').forEach(li => li.classList.remove('active'));
    item.classList.add('active');
}
