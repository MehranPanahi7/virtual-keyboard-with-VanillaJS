const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHanlder: {
    onInput: null,
    onClose: null,
  },

  properties: {
    values: "",
    capsLock: false,
  },

  init() {
    // Create main Elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    //Setup Main Elements
    this.elements.main.classList.add("keyboard", "hidden");
    this.elements.keysContainer.classList.add("keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".key");

    // Add to DOM
    document.body.appendChild(this.elements.main);
    this.elements.main.appendChild(this.elements.keysContainer);

    // Automatically use keyboard for elements with .textZone
    document.querySelectorAll(".textZone").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];

    // Create HTML for an Icon
    const createIconHTML = (iconName) => {
      return `<i class="material-icons">${iconName}</i>`;
    };

    // Loop Through
    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Create Attributes / Classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyWide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.values = this.properties.values.substring(
              0,
              this.properties.values.length - 1
            );
            this._triggerEvent("onInput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyWide", "keyActivable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this.toggleCapsLock();
            keyElement.classList.toggle("keyActive", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyWide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.values += "\n";
            this._triggerEvent("onInput");
          });

          break;

        case "space":
          keyElement.classList.add("keyExtraWide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.values += " ";
            this._triggerEvent("onInput");
          });

          break;

        case "done":
          keyElement.classList.add("keyWide", "keyDark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onClose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.values += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();

            this._triggerEvent("onInput");
          });
          break;
      }

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(hadlerName) {
    if (typeof this.eventHanlder[hadlerName] === "function") {
      this.eventHanlder[hadlerName](this.properties.values);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, onInput, onClose) {
    this.elements.values = initialValue || "";
    this.eventHanlder.onInput = onInput;
    this.eventHanlder.onClose = onClose;
    this.elements.main.classList.remove("hidden");
  },

  close() {
    this.properties.values = "";
    this.eventHanlder.onInput = onInput;
    this.eventHanlder.onClose = onClose;
    this.elements.main.classList.add("hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
