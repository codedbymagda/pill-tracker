document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pillForm');
    const pillList = document.getElementById('pillList');
    const clear = document.getElementById('clear');
    let entries = [];

    // Load from localStorage
    const stored = localStorage.getItem('pillEntries');
    if (stored) {
        entries = JSON.parse(stored);
        entries.forEach(addListItem);
    }

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('pname').value.trim();
      const amount = document.getElementById('amount').value;
      const frequency = document.getElementById('frequency').value;
      const time = document.getElementById('time').value;
     // const weekday = document.getElementById('weekday').value;

      const formattedTime = convertTo12Hour(time);
      const response = name + ' ' + amount + ' ' + frequency + ' @ ' + formattedTime;

      if (entries.includes(response)){
          alert("This pill entry already exists! :O");
          return;
      }
      
      //Add to list and storage
      entries.push(response);
      addListItem(response);
      localStorage.setItem('pillEntries', JSON.stringify(entries));

      form.reset();
    });


    // Clear all button
    clear.addEventListener('click', function() {
      if(confirm("DELETE all pill entries?")){
          entries = [];
          pillList.innerHTML = '';
          localStorage.removeItem('pillEntries');
      }
    });


    //Add item to list
    function addListItem(response) {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.gap = '10px';

        // Text span
        const textSpan = document.createElement('span');
        textSpan.textContent = response;
        textSpan.style.flex = '1';
      
        // Create the TAKEN button
        const taken = document.createElement('button');
        taken.textContent = 'TAKEN';
        taken.classList.add('taken-btn');
  
        taken.addEventListener('click', function (e) {
          e.stopPropagation();
          textSpan.classList.add('taken');
          //li.classList.add('done')


        });

        // DELETE button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'DELETE';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent li click from toggling 'done'

        if (confirm("Are you sure you want to DELETE?")) {
            pillList.removeChild(li);

        // Remove from entries array
        entries = entries.filter(item => item !== response);
        localStorage.setItem('pillEntries', JSON.stringify(entries));
        }
        });


        //Undo button 
        const undo = document.createElement('button');
        undo.textContent = 'UNDO';
        undo.classList.add('undo-btn');

        undo.addEventListener('click', function(e){
        e.stopPropagation();


        //Remove the taken visual style
        textSpan.classList.remove('taken');

        const index = entries.findIndex(item => item.text === entry.text);
        if (index !== -1){
          entries[index].taken = false;
          entries[index].date = null;
          localStorage.setItem('pillEntries', JSON.stringify(entries));
        }
        });

        // Add elements to li
        li.appendChild(textSpan);
        li.appendChild(taken);
        li.appendChild(undo);
        li.appendChild(deleteBtn);
        pillList.appendChild(li);
      }

  
    const frequencySelect = document.getElementById('frequency');
    const weekdayLabel = document.querySelector('label[for="weekday"]');
    const weekdaySelect = document.getElementById('weekday');

    frequencySelect.addEventListener('change', function () {
      if (frequencySelect.value === 'weekly') {
        weekdayLabel.style.display = 'inline';
        weekdaySelect.style.display = 'inline';
      } else {
        weekdayLabel.style.display = 'none';
        weekdaySelect.style.display = 'none';
      }
    });

    const numdaysLabel = document.querySelector('label[for="numdays"]');
    const numdaysSelect = document.getElementById('numdays');

    frequencySelect.addEventListener('change', function () {
      if (frequencySelect.value === 'every-x-days') {
        numdaysLabel.style.display = 'inline';
        numdaysSelect.style.display = 'inline';
      } else {
        numdaysLabel.style.display = 'none';
        numdaysSelect.style.display = 'none';
      }
    });

      //Clear Taken / Progress
      document.getElementById('clearTaken').addEventListener('click', function () {
        entries.forEach(entry => {
          entry.taken = false;
          entry.date = null;
        });
        localStorage.setItem('pillEntries', JSON.stringify(entries));
        location.reload(); // Refresh to reflect the changes
      });


    function convertTo12Hour(timeString) {
      if (!timeString) return "No set time";

      const [hour, minute] = timeString.split(':').map(Number);
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const hour12 = (hour % 12) || 12;
      return hour12 + ':' + minute.toString().padStart(2, '0') + ' ' + suffix;
    }
});
