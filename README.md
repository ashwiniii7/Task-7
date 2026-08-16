# Task Manager – DOM Explorer

A fully interactive Task Manager built using HTML, CSS, and Vanilla JavaScript.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Event Handling

---

# Browser Rendering Concepts

## 1. Parsing

Parsing is the process where the browser reads the HTML and CSS code and converts it into structures that the browser can understand.

When the browser receives an HTML document, it analyzes the HTML elements and their relationships to create the DOM Tree.

Similarly, the browser processes CSS rules to create the CSSOM Tree.

The basic process is:

HTML → Parsing → DOM Tree

CSS → Parsing → CSSOM Tree

---

## 2. Tokenization

Tokenization is the process of breaking the HTML source code into smaller meaningful units called tokens.

For example:

```html
<div>
    <h1>Task Manager</h1>
</div>


3. DOM Tree

DOM stands for Document Object Model.

The DOM Tree represents the HTML document as a tree-like structure where each HTML element becomes a node.

For example:

<body>
    <div>
        <h1>Task Manager</h1>
        <button>Add Task</button>
    </div>
</body>

The DOM structure can be represented as:

Document
└── html
    └── body
        └── div
            ├── h1
            └── button

JavaScript can access and modify these DOM nodes.

For example:

document.querySelector("h1");

This allows JavaScript to select and manipulate the heading.

4. CSSOM Tree

CSSOM stands for CSS Object Model.

The CSSOM Tree represents the CSS rules that the browser has parsed.

For example:

h1 {
    color: white;
    font-size: 30px;
}

The browser processes these CSS rules and creates a structure that represents the styling information.

The CSSOM works together with the DOM to determine how elements should appear on the webpage.

5. Render Tree

The Render Tree is created using information from both the DOM Tree and CSSOM Tree.

HTML
  ↓
DOM Tree


CSS
  ↓
CSSOM Tree


DOM Tree + CSSOM Tree
          ↓
     Render Tree
          ↓
        Layout
          ↓
        Paint

The Render Tree contains the elements that need to be displayed on the screen along with their styles.

Elements that are not visually displayed, such as elements with:

display: none;

are not included in the Render Tree.

Event Propagation

Event propagation describes how an event travels through the DOM when an event occurs.

For example, if a button is inside a div, clicking the button can involve both the button and the parent div.

Event propagation has two important phases:

Capturing Phase
Bubbling Phase
6. Event Capturing

Event Capturing is the phase where an event travels from the outermost element toward the target element.

For example:

Document
   ↓
HTML
   ↓
BODY
   ↓
DIV
   ↓
BUTTON

The event travels from the parent elements toward the element that was clicked.

JavaScript can listen during the capturing phase by using:

element.addEventListener("click", handler, true);

The third argument true enables capturing.

7. Event Bubbling

Event Bubbling is the phase where an event travels from the target element back toward its parent elements.

For example:

BUTTON
   ↑
DIV
   ↑
BODY
   ↑
HTML
   ↑
Document

If a button is clicked, the event first occurs on the button and then bubbles upward through its parent elements.

Example:

parent.addEventListener("click", function () {
    console.log("Parent clicked");
});

If a child button is clicked, the parent's event listener can also be triggered because of event bubbling.

8. Event Delegation

Event Delegation is a technique where a single event listener is attached to a parent element instead of adding separate listeners to every child element.

For example:

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove();
    }
});

Here, instead of adding a separate click event listener to every delete button, one listener is attached to the parent taskList.

Event Delegation works because of Event Bubbling.

Advantages of Event Delegation
Reduces the number of event listeners.
Improves performance.
Works well with dynamically created elements.
Makes JavaScript code easier to manage.
Project Features
Add new tasks
Delete tasks
Mark tasks as completed
Interactive task management
DOM manipulation using JavaScript
Event handling
Event bubbling
Event delegation
Responsive user interface"# Task-7" 
