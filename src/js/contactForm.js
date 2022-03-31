const contactForm = () => {
  contact();
};

const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const telephoneInput = document.querySelector("#telephone");
const selectInput = document.querySelector("#select");
const textInput = document.querySelector("#text");
const checkbox = document.querySelector("#checkbox");
const submitButton = document.querySelector("#submit");

function contact() {
  submitButton.addEventListener("click", checkIfValid);
  dropdownMenu();
}

function checkIfValid() {
  submitButton.setAttribute("type", "");
  if (!nameInput.value || /[0-9]/.test(nameInput.value)) {
    console.log("name missing");
    nameInput.focus();
    nameInput.classList.add("wrongInput");
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)
  ) {
    console.log("email missing");
    emailInput.focus();
    nameInput.classList.remove("wrongInput");
    emailInput.classList.add("wrongInput");
  } else if (/\D/.test(telephoneInput.value)) {
    console.log("enter a number");
    telephoneInput.focus();
    emailInput.classList.remove("wrongInput");
    telephoneInput.classList.add("wrongInput");
  } else if (!selectInput.value) {
    console.log("betreff missing");
    selectInput.focus();
    telephoneInput.classList.remove("wrongInput");
    selectInput.classList.add("wrongInput");
  } else if (!textInput.value) {
    console.log("text missing");
    textInput.focus();
    selectInput.classList.remove("wrongInput");
    textInput.classList.add("wrongInput");
  } else if (!checkbox.checked) {
    console.log("Zustimmung missing");
    checkbox.focus();
    textInput.classList.remove("wrongInput");
    checkbox.classList.add("wrongInput");
  } else {
    console.log("off you go!");
    submitButton.setAttribute("type", "submit");
  }
}

////////////////////////////
// DROPDOWN MENU

function dropdownMenu() {
  const SPACEBAR_KEY_CODE = [0, 32];
  const ENTER_KEY_CODE = 13;
  const DOWN_ARROW_KEY_CODE = 40;
  const UP_ARROW_KEY_CODE = 38;
  const ESCAPE_KEY_CODE = 27;

  const list = document.querySelector(".dropdown__list");
  const listContainer = document.querySelector(".dropdown__list-container");
  const dropdownArrow = document.querySelector(".dropdown__arrow");
  const listItems = document.querySelectorAll(".dropdown__list-item");
  const dropdownSelectedNode = document.querySelector("#dropdown__selected");
  const listItemIds = [];

  dropdownSelectedNode.addEventListener("click", (e) =>
    toggleListVisibility(e)
  );
  dropdownSelectedNode.addEventListener("keydown", (e) =>
    toggleListVisibility(e)
  );

  // Add each list item's id to the listItems array
  listItems.forEach((item) => listItemIds.push(item.id));

  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      setSelectedListItem(e);
      closeList();
    });

    item.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case ENTER_KEY_CODE:
          setSelectedListItem(e);
          closeList();
          return;

        case DOWN_ARROW_KEY_CODE:
          focusNextListItem(DOWN_ARROW_KEY_CODE);
          return;

        case UP_ARROW_KEY_CODE:
          focusNextListItem(UP_ARROW_KEY_CODE);
          return;

        case ESCAPE_KEY_CODE:
          closeList();
          return;

        default:
          return;
      }
    });
  });

  function setSelectedListItem(e) {
    let selectedTextToAppend = document.createTextNode(e.target.innerText);
    dropdownSelectedNode.innerHTML = null;
    dropdownSelectedNode.appendChild(selectedTextToAppend);
  }

  function closeList() {
    list.classList.remove("open");
    dropdownArrow.classList.remove("expanded");
    listContainer.setAttribute("aria-expanded", false);
  }

  function toggleListVisibility(e) {
    let openDropDown =
      SPACEBAR_KEY_CODE.includes(e.keyCode) || e.keyCode === ENTER_KEY_CODE;

    if (e.keyCode === ESCAPE_KEY_CODE) {
      closeList();
    }

    if (e.type === "click" || openDropDown) {
      list.classList.toggle("open");
      dropdownArrow.classList.toggle("expanded");
      listContainer.setAttribute(
        "aria-expanded",
        list.classList.contains("open")
      );
    }

    if (e.keyCode === DOWN_ARROW_KEY_CODE) {
      focusNextListItem(DOWN_ARROW_KEY_CODE);
    }

    if (e.keyCode === UP_ARROW_KEY_CODE) {
      focusNextListItem(UP_ARROW_KEY_CODE);
    }
  }

  function focusNextListItem(direction) {
    const activeElementId = document.activeElement.id;
    if (activeElementId === "dropdown__selected") {
      document.querySelector(`#${listItemIds[0]}`).focus();
    } else {
      const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
      if (direction === DOWN_ARROW_KEY_CODE) {
        const currentActiveElementIsNotLastItem =
          currentActiveElementIndex < listItemIds.length - 1;
        if (currentActiveElementIsNotLastItem) {
          const nextListItemId = listItemIds[currentActiveElementIndex + 1];
          document.querySelector(`#${nextListItemId}`).focus();
        }
      } else if (direction === UP_ARROW_KEY_CODE) {
        const currentActiveElementIsNotFirstItem =
          currentActiveElementIndex > 0;
        if (currentActiveElementIsNotFirstItem) {
          const nextListItemId = listItemIds[currentActiveElementIndex - 1];
          document.querySelector(`#${nextListItemId}`).focus();
        }
      }
    }
  }
}

export default contactForm;
