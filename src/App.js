/*global chrome*/
import React, { useEffect, useState } from "react";
import { getPropertyID, getPropertyDetails } from "./Api";
import "./App.css";
import { ReactComponent as SearchIcon } from "./search.svg";

function App() {
  const msg_no_result = "No result";
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(msg_no_result);

  useEffect(() => {
    chrome.tabs.executeScript(
      {
        code: "window.getSelection().toString();",
      },
      (selection) => {
        setAddress(selection[0]);
        callAPI(address);
      }
    );
  }, []);

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
    if (address.length <= 0) {
      setResult("Please enter address");
      return;
    }
    // console.log(address);
    callAPI(address);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setAddress(value);
  };

  return (
    <>
      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={address}
      />
      <button onClick={submit}>
        <SearchIcon width="16px" height="16px" />
      </button>
      <div className="output">{result}</div>
    </>
  );
}

export default App;
