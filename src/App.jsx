import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userEdit, setUserEdit] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getALLData();
  }, []);

  // Display Data
  async function getALLData() {
    const response = await axios.get(API_URL);
    setUsers(response.data);
  }

  // Tambah Data

  async function addData(e) {
    e.preventDefault();
    if (!name || !email) {
      return;
    }
    const response = await axios.post(API_URL, { name, email });
    setName("");
    setEmail("");
    getALLData();
  }

  // Edit Data
  function editData(data) {
    setUserEdit(data);
    setName(data.name);
    setEmail(data.email);
  }

  // Update Data
  async function updateData(e) {
    e.preventDefault();
    if (!name || !email) {
      return;
    }
    const response = await axios.put(API_URL + "/" + userEdit.id, {
      name,
      email,
    });
    setName("");
    setEmail("");
    getALLData();
    setUserEdit(null);
  }

  // handleClick
  async function handleClick(e) {
    e.preventDefault();
    if (userEdit) {
      await updateData(e);
    } else {
      await addData(e);
    }
  }

  // Delete Data
  async function deleteData(id) {
    const response = await axios.delete(API_URL + "/" + id);
    getALLData();
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h3>{userEdit ? "Edit pengguna" : "Tambah Pengguna"}</h3>
        <form className="input-box" type="submit" onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">
            {userEdit ? "Update Data" : "Tambah Data"}
          </button>
        </form>
      </div>
      <div className="data-pengguna">
        <h3>Data Pengguna</h3>
        <ul>
          {users.map((user) => (
            <li>
              <div>
                {user.name} <span className="email">({user.email})</span>
              </div>
              <div>
                <button className="btn-edit">
                  <a href="#" onClick={() => editData(user)} className="edit">
                    Edit
                  </a>{" "}
                </button>
                <button className="btn-delete">
                  <a
                    href="#"
                    className="delete"
                    onClick={() => deleteData(user.id)}
                  >
                    Delete
                  </a>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
