/*global chrome*/
import React, { useEffect, useState } from "react";
import { getPropertyID, getPropertyDetails } from "./Api";
import CardItem from "./components/CardItem";
import "./App.css";
import { ReactComponent as SearchIcon } from "./search.svg";

function App() {
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.executeScript(
        {
          code: "window.getSelection().toString();",
        },
        (selection) => {
          const selectedText = selection[0];

          setAddress(selectedText);
          callAPI(selectedText);
        }
      );
    }
  }, []);

  async function callAPI(address) {
    if (address.length <= 0) {
      return;
    }

    setMsg("Loading...");
    setCards([]);

    const property_id = await getPropertyID(address);
    if (!property_id) {
      setMsg("Unable to find propery id");
      return;
    }

    const cards = await getPropertyDetails(property_id);
    if (cards.length <= 0) {
      setMsg("No results");
      return;
    }
    console.log(cards);
    setCards(cards);
    setMsg("");
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      callAPI(address);
    }
  };

  const submit = (e) => {
    if (address.length <= 0) {
      setMsg("Please enter address");
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
      <h4 className="title">Homes API extension</h4>

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

      {msg && <p>{msg}</p>}

      {cards.length > 0 ? (
        cards.map((card, i) => <CardItem key={i} card={card} />)
      ) : (
        <p>No results</p>
      )}
    </>
  );
}

export default App;
