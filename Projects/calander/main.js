let currentYear, currentMonth;

document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    createCalendar(currentYear, currentMonth);
});

function updateNoteIndicator(dateKey) {
    const td = document.querySelector(`td[data-date="${dateKey}"]`);
    if (td) {
        const noteIndicator = td.querySelector('.note-indicator');
        const hasNote = localStorage.getItem(dateKey) !== null;
        if (hasNote && !noteIndicator) {
            const indicator = document.createElement('div');
            indicator.classList.add('note-indicator');
            td.appendChild(indicator);
        } else if (!hasNote && noteIndicator) {
            noteIndicator.remove();
        }
    }
}

function saveNote() {
    const date = notesDialog.dataset.date;
    const note = notesContent.value;
    localStorage.setItem(date, note);
    updateNoteIndicator(date);
    notesDialog.style.display = 'none';
}

function deleteNote() {
    const date = notesDialog.dataset.date;
    localStorage.removeItem(date);
    updateNoteIndicator(date);
    notesDialog.style.display = 'none';
}

function showNotesDialog(note, date) {
    notesContent.value = note;
    notesDialog.dataset.date = date;
    updateNoteIndicator(date);
    notesDialog.style.display = 'flex';
}

const calendarBody = document.getElementById('calendarBody');
const monthYearHeader = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const notesDialog = document.getElementById('notesDialog');
const notesContent = document.getElementById('notesContent');
const saveNoteButton = document.getElementById('saveNote');

prevMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar(currentYear, currentMonth);
});

nextMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar(currentYear, currentMonth);
});

calendarBody.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'TD') {
        const date = target.textContent;
        if (date.trim() !== '') {
            const month = currentMonth + 1 < 10 ? '0' + (currentMonth + 1) : currentMonth + 1;
            const formattedDate = currentYear + '-' + month + '-' + (date.length === 1 ? '0' + date : date);
            const storedNote = localStorage.getItem(formattedDate);
            if (storedNote) {
                showNotesDialog(storedNote, formattedDate);
            } else {
                showNotesDialog('', formattedDate);
            }
        }
    }
});

saveNoteButton.addEventListener('click', saveNote);

function createCalendar(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const prevLastDay = new Date(year, month, 0).getDate();

    const months = [
        'ינואר',
        'פברואר',
        'מרץ',
        'אפריל',
        'מאי',
        'יוני',
        'יולי',
        'אוגוסט',
        'ספטמבר',
        'אוקטובר',
        'נובמבר',
        'דצמבר'
    ];

    monthYearHeader.textContent = `${months[month]} ${year}`;

    calendarBody.innerHTML = '';

    const table = document.createElement('table');
    calendarBody.appendChild(table);

    const tr = document.createElement('tr');
    table.appendChild(tr);

    const weekdays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']; 

    for (let day of weekdays) {
        const th = document.createElement('th');
        th.textContent = day;
        tr.appendChild(th);
    }

    let count = 1;
    for (let i = 0; i < 6; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayIndex) {
                const td = document.createElement('td');
                td.textContent = prevLastDay - firstDayIndex + j + 1;
                tr.appendChild(td);
            } else if (count > daysInMonth) {
                break;
            } else {
                const td = document.createElement('td');
                td.textContent = count;
                const monthString = (month + 1).toString().padStart(2, '0');
                const dayString = count.toString().padStart(2, '0');
                const dateKey = `${year}-${monthString}-${dayString}`;
                const note = localStorage.getItem(dateKey);
                if (note) {
                    td.classList.add('note');
                    updateNoteIndicator(dateKey);
                }
                tr.appendChild(td);
                count++;
            }
        }
        table.appendChild(tr);
    }
}

function updateCalendar(year, month) {
    createCalendar(year, month);
}
