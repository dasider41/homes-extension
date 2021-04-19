import React, { useState } from "react";
import { getPropertyID, getPropertyDetails } from "./Api";

function App() {
  const msg_no_result = "No result";
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(msg_no_result);

  async function callAPI(address) {
    setResult("Loading...");
    const property_id = await getPropertyID(address);
    if (!property_id) {
      setResult("Unable to find propery id");
      return;
    }
    const output = await getPropertyDetails(property_id);
    // console.log(output);
    if (output) {
      setResult(output);
    } else {
      setResult(msg_no_result);
    }
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      callAPI(address);
    }
  };

  const submit = (e) => {
    if (address.length < 0) {
      return;
    }
    // console.log(address);
    callAPI(address);
  };

  const clearInput = (e) => {
    setAddress("");
    setResult(msg_no_result);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setAddress(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={address}
      />
      <button style={{ marginLeft: "5px" }} onClick={submit}>
        Submit
      </button>
      <button style={{ marginLeft: "5px" }} onClick={clearInput}>
        Clear
      </button>
      <p>{result}</p>
    </div>
  );
}

export default App;
