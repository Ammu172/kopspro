import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async () => {
    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });

    setName("");
    setPrice("");
    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 E-commerce App</h1>

      <h3>Add Product</h3>
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>

      <h3>Product List</h3>
      {products.map((p) => (
        <div key={p.id}>
          <b>{p.name}</b> - ₹{p.price}
        </div>
      ))}
    </div>
  );
}

export default App;
