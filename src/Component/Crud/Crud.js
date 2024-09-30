import React, { useEffect, useState } from "react";
import "../Crud/Crud.css";

// ====================================================

const Crud = () => {
  const [task, settask] = useState([]);
  const [taskTest, setTaskTest] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mode, setMode] = useState(false);

  // ====================== add task ====================

  const addTask = () => {
    if (taskTest.trim() === "") {
      return;
    }
    settask([...task, taskTest]);
    setTaskTest("");
  };

  // ===================== edit task ===================

  const editTask = () => {
    if (taskTest.trim() === "" || selectedIndex === null) {
      return;
    }

    let copy = [...task];
    copy[selectedIndex] = taskTest;
    settask(copy);
    setTaskTest("");
    setSelectedIndex(null);
    setMode(false);
  };

  // ===================== delete task =================

  const deleteTask = (itemindex) => {
    const filterData = task.filter((item, index) => index !== itemindex);
    settask(filterData);
  };

  return (
    <>
      <div className="container mt-5 pt-5">
        <h1>CRUD</h1>
        <input
          onChange={(e) => setTaskTest(e.target.value)}
          value={taskTest}
          class="form-control"
          type="text"
        />
        <button onClick={mode ? editTask : addTask}>
          {mode ? "Save" : "Add Item"}
        </button>
      </div>

      {/* ===================== item list + edit/delete btn ========================== */}

      <div className="container list_container">
        {Array.isArray(task) && task.length > 0 ? (
          task.map((item, index) => (
            <div key={index}>
              <div>
                <h6>
                  {index + 1} : {item}
                </h6>
                <div>
                  <button
                    onClick={() => {
                      setSelectedIndex(index);
                      setTaskTest(item); // Set input field with the selected item for editing
                      setMode(true); // Switch to edit mode
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </>
  );
};

export default Crud;
