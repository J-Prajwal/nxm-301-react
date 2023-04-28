import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  // diffing & reconciliation algorithms
  const [counter, setCounter] = useState(0);
  const [disableIncrease, setDisableIncrease] = useState(false);
  const [disableDecrease, setDisableDecrease] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  const handleIncrease = (arg) => {
    setCounter((prev) => prev + arg);
  };

  const handleDecrease = (arg) => {
    setCounter((prev) => prev - arg);
  };

  const getEmployeesData = async () => {
    let res = await fetch("http://localhost:8080/employees");
    let data = await res.json();
    setEmployeeData(data);
  };

  useEffect(() => {
    getEmployeesData();
  }, []);

  useEffect(() => {
    if (counter >= 50) {
      setDisableIncrease(true);
    } else {
      setDisableIncrease(false);
    }

    if (counter <= -20) {
      setDisableDecrease(true);
    } else {
      setDisableDecrease(false);
    }
  }, [counter]);

  console.log(employeeData);

  return (
    <>
      <h1>Counter App</h1>
      <h3> {counter} </h3>
      <button disabled={disableIncrease} onClick={() => handleIncrease(1)}>
        Increase Value by 1
      </button>
      <button disabled={disableIncrease} onClick={() => handleIncrease(10)}>
        Increase Value by 10
      </button>
      <button disabled={disableDecrease} onClick={() => handleDecrease(1)}>
        Decrease Value by 1
      </button>
      <button disabled={disableDecrease} onClick={() => handleDecrease(10)}>
        Decrease Value by 10
      </button>

      <hr />

      <h1 style={{ textAlign: "center", border: "1px solid red" }}>
        Employees
      </h1>
    </>
  );
}

export default App;
