## Pack'd App

Welcome to the Pack'd App!

This is a simple React application that helps you keep track of items you need to pack for a trip. Let's go through the main parts of the code to understand how the app works.
Welcome to the Pack'd App! This is a simple React application that helps you keep track of items you need to pack for a trip. Let's go through the main parts of the code to understand how the app works.

## Components Overview

- App Component
  The main component of the app is App. It manages the state of the packing list items and provides functions to add, delete, toggle, and clear items.
  Components Overview App Component The main component of the app is App. It manages the state of the packing list items and provides functions to add, delete, toggle, and clear items.

- Form Component
  The Form component is responsible for adding new items to the list. It includes fields for item description and quantity, and a button to add the item. When an item is added, it updates the state using the handleAddItem function passed from the App.
  Form Component The Form component is responsible for adding new items to the list. It includes fields for item description and quantity, and a button to add the item. When an item is added, it updates the state using the handleAddItem function passed from the App.

- PackingList Component
  The PackingList component displays the list of items. It allows sorting items based on different criteria: input order, description, or packed status. Sorting is done by copying the original list and using the sort function to reorder items accordingly.
  PackingList Component The PackingList component displays the list of items. It allows sorting items based on different criteria: input order, description, or packed status. Sorting is done by copying the original list and using the sort function to reorder items accordingly.

- Item Component
  Each individual item is represented by the Item component. It displays a checkbox for marking an item as packed, the item description, and a delete button. If an item is marked as packed, its description will be crossed out.
  Item Component Each individual item is represented by the Item component. It displays a checkbox for marking an item as packed, the item description, and a delete button. If an item is marked as packed, its description will be crossed out.

- Stats Component
  The Stats component calculates and displays statistics about the packing list. It shows the total number of items, the number of packed items, and the percentage of items packed.
  Stats Component The Stats component calculates and displays statistics about the packing list. It shows the total number of items, the number of packed items, and the percentage of items packed.

## How to Run

Make sure you have Node.js installed.
Open your terminal and navigate to the project directory.
Run npm install to install the necessary dependencies.
Run npm start to start the development server.
Open your browser and go to http://localhost:3000 to see the app in action!

Feel free to explore the code and experiment with adding, deleting, and marking items as packed. Happy packing!

Feel free to explore the code and experiment with adding, deleting, and marking items as packed. Happy packing!
