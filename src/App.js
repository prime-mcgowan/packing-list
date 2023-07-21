import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    //spread operator (...) creates a new array by expanding the elements of the existing array
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝 Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // event handler
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);

    onAddItems(newItem);

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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      {/* using the ternary operator to conditionally render a line through "packed" items */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, you've already packed X (X%)</em>
    </footer>
  );
}
