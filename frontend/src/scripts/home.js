// Home page functionality
import { AuthService } from '../services/authService.js';
import { NoteService } from '../services/noteService.js';

document.addEventListener('DOMContentLoaded', () => {
  // Redirect to login if not authenticated
  if (!AuthService.isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  // Load user data
  const user = AuthService.getUser();
  console.log('Logged in as:', user.username);

  // Load notes
  loadNotes();

  // Handle logout
  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      AuthService.clearUserSession();
      window.location.href = 'login.html';
    });
  }

  // Handle new note creation
  const newNoteButton = document.getElementById('open-popup-link');
  if (newNoteButton) {
    newNoteButton.addEventListener('click', (e) => {
      e.preventDefault();
      openNoteModal();
    });
  }
});

async function loadNotes() {
  try {
    const notes = await NoteService.getAll();
    renderNotes(notes);
  } catch (error) {
    console.error('Error loading notes:', error);
    alert('Failed to load notes');
  }
}

function renderNotes(notes) {
  const notesContainer = document.querySelector('section');
  notesContainer.innerHTML = '';

  if (notes.length === 0) {
    notesContainer.innerHTML = '<p class="no-notes">No notes found. Create your first note!</p>';
    return;
  }

  notes.forEach(note => {
    const noteElement = createNoteElement(note);
    notesContainer.appendChild(noteElement);
  });
}

function createNoteElement(note) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note-card';
  noteDiv.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <div class="note-footer">
      <span class="priority priority-${note.priority}">Priority: ${note.priority}</span>
      <span class="date">${new Date(note.created_at).toLocaleDateString()}</span>
    </div>
    <div class="note-actions">
      <button class="edit-btn" data-id="${note.id}">Edit</button>
      <button class="delete-btn" data-id="${note.id}">Delete</button>
    </div>
  `;

  // Add event listeners for edit and delete
  noteDiv.querySelector('.edit-btn').addEventListener('click', () => editNote(note));
  noteDiv.querySelector('.delete-btn').addEventListener('click', () => deleteNote(note.id));

  return noteDiv;
}

function openNoteModal(note = null) {
  // Implementation for note modal
  // This would show a form to create/edit a note
}

async function editNote(note) {
  openNoteModal(note);
}

async function deleteNote(noteId) {
  if (confirm('Are you sure you want to delete this note?')) {
    try {
      await NoteService.delete(noteId);
      loadNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  }
}