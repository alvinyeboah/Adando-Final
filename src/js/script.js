$(function () {
  $(".menu-link").click(function () {
    $(".menu-link").removeClass("is-active");
    $(this).addClass("is-active");
  });
});

$(function () {
  $(".main-header-link").click(function () {
    $(".main-header-link").removeClass("is-active");
    $(this).addClass("is-active");
  });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdowns.forEach((c) => c.classList.remove("is-active"));
    dropdown.classList.add("is-active");
  });
});

$(".search-bar input")
  .focus(function () {
    $(".header").addClass("wide");
  })
  .blur(function () {
    $(".header").removeClass("wide");
  });

$(document).click(function (e) {
  var container = $(".status-button");
  var dd = $(".dropdown");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    dd.removeClass("is-active");
  }
});

$(function () {
  $(".dropdown").on("click", function (e) {
    $(".content-wrapper").addClass("overlay");
    e.stopPropagation();
  });
  $(document).on("click", function (e) {
    if ($(e.target).is(".dropdown") === false) {
      $(".content-wrapper").removeClass("overlay");
    }
  });
});

$(function () {
  $(".status-button:not(.open)").on("click", function (e) {
    $(".overlay-app").addClass("is-active");
  });
  $(".pop-up .close").click(function () {
    $(".overlay-app").removeClass("is-active");
  });
});

$(".status-button:not(.open)").click(function () {
  $(".pop-up").addClass("visible");
});

$(".pop-up .close").click(function () {
  $(".pop-up").removeClass("visible");
});

const toggleButton = document.querySelector(".dark-light");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

$(document).ready(function () {
  $("#openModal").click(function () {
    $("#moodModal").css("display", "block");
  });

  $("#affirmButton").click(function () {
    $("#modalAffirm").css("display", "block");
  });
  $(".modal-content-affirm .close").click(function() {
    $(".modal-affirm").css("display", "none");
  });

$("#affirmButton").click(function () {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuote = data[randomIndex].text;
    console.log(randomQuote)
    $('.feedback-message').text(randomQuote);

    $("#modalAffirm").css("display", "block");
  });
});
  
$(".close").click(function () {
  $("#modalAffirm").css("display", "none");
});

$(".emoji").click(function () {
  $(".emoji").removeClass("active"); 
  $(this).addClass("active"); 
  let selectedMood = $(this).data("mood");
  console.log(`Selected mood: ${selectedMood}`);
  saveMood(selectedMood);
});



  $(".close").click(function () {
    $("#moodModal").css("display", "none");
    $("#moodPrice").css("display", "none");
  });

  $(".mood").click(function () {
    let selectedMood = $(this).data("mood");
    console.log(`Selected mood: ${selectedMood}`);

    $("#moodModal").css("display", "none");
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('moodModal');
  const closeModalButton = modal.querySelector('.close');
  const emojiButtons = modal.querySelectorAll('.emoji');
  const saveButton = modal.querySelector('#saveMood');
  const feedbackMessage = modal.querySelector('.feedback-message');

  closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
    fetchMoodData(); 
});


  emojiButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          const selectedMood = this.dataset.mood;
          saveMood(selectedMood);
      });
  });

  function saveMood(mood) {
      fetch('/saveMood', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mood: mood })
      })
      .then(response => response.text())
      .then(data => {
          console.log(data);
          feedbackMessage.innerText = 'Mood logged!';
          setTimeout(() => {
              modal.style.display = 'none';
              feedbackMessage.innerText = '';
          }, 2000); // Display the message for 2 seconds
      })
      .catch(error => console.error('Error:', error));
  }
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('/moodData')
    .then(response => response.json())
    .then(data => {
      const moodCounts = {};
      data.forEach(mood => {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      });

      const labels = Object.keys(moodCounts);
      const counts = Object.values(moodCounts);

      const ctx = document.getElementById('moodChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Mood Counts',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1
            }
          }
        }
      });
    });
});

$(document).ready(function() {
  // When the user clicks the button, open the modal
  $("#openModalBtn").click(function() {
    $("#modalprice").css("display", "block");
  });

  // When the user clicks the close button or anywhere outside of the modal, close it
  $(".modal-content .close").click(function() {
    $("#modalprice").css("display", "none");
  });

 

  $(window).click(function(event) {
    if (event.target.id == "modalprice") {
      $("#modalprice").css("display", "none");
    }
  });
});




$(document).ready(function () {
  $("#free-trial-button").click(function () {
    $("#moodPrice").css("display", "block");
  });
});

function fetchMoodData() {
  fetch('/getMoodData')
      .then(response => response.json())
      .then(data => {
          const ctx = document.getElementById('moodChart').getContext('2d');
          const chart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: Object.keys(data), // Assuming data is an object with dates as keys
                  datasets: [{
                      label: 'Mood',
                      data: Object.values(data), // Assuming data is an object with mood values
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true,
                          max: 5
                      }
                  }
              }
          });
      })
      .catch(error => console.error('Error:', error));
}


$("#affirmSide").click(function () {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuote = data[randomIndex].text;
    console.log(randomQuote)
    $('.feedback-message').text(randomQuote);

    $("#modalAffirm").css("display", "block");
  });
});

$("#refresh-affirmation").click(function () {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuote = data[randomIndex].text;
    console.log(randomQuote)
    $('.feedback-message').text(randomQuote);

    $("#modalAffirm").css("display", "block");
  });
});

$(".close").click(function () {
  $("#modalAffirm").css("display", "none");
});
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    $("#modalAffirm").css("display", "none");
    $("#moodModal").css("display", "none");
    $("#moodPrice").css("display", "none");

  }
});

function saveData() {
  // Get the selected emoji
  const selectedEmoji = document.querySelector('.emoji-buttons .selected').textContent;

  // Get the text input
  const moodInput = document.getElementById('moodInput').value;

  // Combine emoji and text input
  const dataToSave = `${selectedEmoji} - ${moodInput}\n`;

  // Send the data to the server for saving
  fetch('/saveMoodData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moodData: dataToSave }),
  });
}
// Assuming moodValue contains the selected emoji
fetch('/moodData', {
  method: 'POST',
  headers: {
      'Content-Type': 'text/plain',
  },
  body: JSON.stringify(moodValue),
});

$(document).ready(function() {
  $("#aibutton").click(function() {
    $("#aihelper").css("display", "block");
  });

  $(".modal-content .close").click(function() {
    $("#modalprice").css("display", "none");
  });

});
