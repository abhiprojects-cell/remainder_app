import React, { useState } from "react";

export default function App() {
  const [remiander, setRemiander] = useState([]);
  const [title, setTitle] = useState("");

  const [editingIndex, seteditingIndex] = useState(null);
  const [editValue, seteditValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setRemiander((prev) => [...prev, trimmed]);
    setTitle("");
  };

  const handleDelete = (indexToDelete) => {
    setRemiander((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const editingFunction = (itemToEdit, indexToEdit) => {
    seteditValue(itemToEdit);
    seteditingIndex(indexToEdit);
  };

  const saveEdit = () => {
    const trim = editValue.trim();
    if (!trim) {
      alert("title cannot be empty");
      return;
    }
    setRemiander((prev) => prev.map((v, i) => (i === editingIndex ? trim : v)));
    seteditingIndex(null);
    seteditValue("");
  };

  const cancelEdit = () => {
    seteditingIndex(null);
    seteditValue("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Remainder app</h1>

      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="enter ur remainder"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
          >
            ADD
          </button>
        </form>
      </div>

      <div className="max-w-xl mx-auto">
        <ul className="space-y-3">
          {remiander.map((item, index) =>
            editingIndex === index ? (
              <li
                key={index}
                className="bg-white p-4 shadow border rounded-lg flex justify-between items-center"
              >
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => seteditValue(e.target.value)}
                  className="flex-1 px-3 py-2 mr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                />

                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    save
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  >
                    cancel
                  </button>
                </div>
              </li>
            ) : (
              <li
                key={index}
                className="bg-white p-4 shadow border rounded-lg flex justify-between items-center"
              >
                <span>{item}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    delete
                  </button>

                  <button
                    onClick={() => editingFunction(item, index)}
                    className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
                  >
                    edit
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
