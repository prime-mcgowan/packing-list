import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    //* spread operator (...) creates a new array by expanding the elements of the existing array
    setItems((items) => [...items, item]);
  }

  // * setItems is called with callback function and receives the current `items` array as a parameter
  // * the .filter method is used to check each item in the items array...using the item.id !== id condition
  // * if the item's `id` DOES NOT match the `id` passed in then it stays in the array...otherwise that item is deleted
  // ! the original `items` array is immutable - it is not being directly modified, rather a new array is created with the filtered content
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    // * the items array will be looped over using .map
    // * the entire array will be returned with an object having been updated with line-through text decoration
    setItems((items) =>
      items.map((item) =>
        // * spread operator (...) creates the new array with the matching id's packed status (from false to true) as "packed" = line-through
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL items?"
    );
    if (confirmed) setItems([]);
  }

  // * Application components rendered here:
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🧳 Far Away 🏝 </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Event Handler
  function handleSubmit(e) {
    // * 👇 prevents the default form submission action from happening
    // * allowing the form to be handled in the `Form` component's `handleSubmit` function
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(), //* creates a unique timestamp for the newItem
    };
    // console.log(newItem);

    // * this function is defined in `App` and has been passed in as a prop
    onAddItems(newItem);

    // * form inputs are reset after the newItem is added
    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* An empty array of 20 elements is created using Array.from */}
        {/* i + 1 then creates an array with values from 1-20 */}
        {/* .map is used to iterate over each element in the array */}
        {/* each option element will then have a numeric value from 1-20 for the select dropdown menu */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onDeleteAllItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteAllItems}>Clear packing list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {/* using the ternary operator to conditionally render a line through "packed" items */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>🏁 Start Packing!! 🏁</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Success!! You are ready to GO!! ✈️"
          : `You have ${numItems} on your list, you've already packed ${numPacked}
          (${percentage}%)`}
      </em>
    </footer>
  );
}
