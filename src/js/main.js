// Mobile Navigation
const navButton = document.getElementById("btnMenu");
const disclosure = document.getElementById("primaryNav");
const listItems = disclosure.querySelectorAll("li a");
const navBtnOpenClass = 'primaryNav__btn--open';
const navBtnCloseClass = 'primaryNav__btn--close';
const hiddenClass = 'primaryNav--hidden';

function openNavigation() {
  navButton.setAttribute("aria-expanded", "true");
  navButton.classList.add(navBtnOpenClass);
  navButton.classList.remove(navBtnCloseClass);
  disclosure.classList.remove(hiddenClass);
}

function closeNavigation() {
  navButton.setAttribute("aria-expanded", "false");
  navButton.classList.add(navBtnCloseClass);
  navButton.classList.remove(navBtnOpenClass);
  disclosure.classList.add(hiddenClass);
}

function toggleNavigation() {
  const open = navButton.getAttribute("aria-expanded");
  open === "false" ? openNavigation() : closeNavigation();
}

// This function closes an open disclosure if a user tabs away from the last anchor element in the list. It is reliant on the ul container having a class to check whether the relatedTarget is within the disclosure. If not, it will close.
function handleBlur() {
  const navList = event.currentTarget.closest(".primaryNav__list");
  if (!event.relatedTarget || !navList.contains(event.relatedTarget)) {
    closeNavigation();
  }
}

navButton.addEventListener("click", toggleNavigation);

// add event to the last item in the nav list to trigger the disclosure to close if the user tabs out of the disclosure
listItems[listItems.length - 1].addEventListener("blur", handleBlur);

// Close the disclosure if a user presses the escape key
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    navButton.focus();
    closeNavigation();
  }
});