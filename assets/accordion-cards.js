document.addEventListener("DOMContentLoaded", function() {
  var expandButtons = document.querySelectorAll(".accordion-blocks-container .expand-button");
  var currentlyExpanded = null;

  expandButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent clicks on the button from propagating to the document click listener

      var card = button.closest(".accordion-blocks-container .i-card");
      var expandedInfo = card.querySelector(".accordion-blocks-container .expanded-info");

      if (currentlyExpanded && currentlyExpanded !== expandedInfo) {
        currentlyExpanded.style.maxHeight = null;
        currentlyExpanded.closest(".i-card").classList.remove("expanded");
        updateIcon(currentlyExpanded.closest(".accordion-blocks-container .i-card"), false);
      }

      if (expandedInfo.style.maxHeight) {
        expandedInfo.style.maxHeight = null;
        card.classList.remove("expanded");
        currentlyExpanded = null;
        updateIcon(card, false);
      } else {
        expandedInfo.style.maxHeight = expandedInfo.scrollHeight + "px";
        card.classList.add("expanded");
        currentlyExpanded = expandedInfo;
        updateIcon(card, true);
      }
    });
  });

  // Function to update the icon class
  function updateIcon(card, expanded) {
    var expandButton = card.querySelector(".accordion-blocks-container .expand-button");
    if (expandButton) {
      if (expanded) {
        expandButton.classList.add("expanded");
        expandButton.innerHTML = `
          <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.96 2.672V0.404H9.052V2.672H0.96Z" fill="white" /></svg>`;
      } else {
        expandButton.classList.remove("expanded");
        // Use your original SVG code for the collapsed state
        expandButton.innerHTML = `<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.336 13.88V8H0.568V5.928H6.336V0.216H8.464V5.928H14.232V8H8.464V13.88H6.336Z" fill="white" /></svg>`;
      }
    }
  }

  // Global click event listener
  document.body.addEventListener("click", function(event) {
    if (currentlyExpanded && !event.target.closest(".accordion-blocks-container .i-card")) {
      currentlyExpanded.style.maxHeight = null;
      currentlyExpanded.closest(".accordion-blocks-container .i-card").classList.remove("expanded");
      updateIcon(currentlyExpanded.closest(".accordion-blocks-container .i-card"), false);
      currentlyExpanded = null;
    }
  });
});