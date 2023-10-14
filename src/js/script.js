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

  $(".emoji").click(function () {
    $(".emoji").removeClass("active"); // Remove active class from all buttons
    $(this).addClass("active"); // Add active class to the clicked button

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
