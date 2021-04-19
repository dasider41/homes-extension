import React from "react";

const CardItem = ({ card }) => {
  const { property_details } = card;
  const link = `https://homes.co.nz/address${card.url}`;

  return (
    <div className="output">
      <p>{property_details.address}</p>
      <p>
        <small> Low : </small>
        <b>{property_details.display_estimated_lower_value_short || "-"}</b>,
        <small> Est : </small>
        <b>{property_details.display_estimated_value_short || "-"}</b>,
        <small> High : </small>
        <b>{property_details.display_estimated_upper_value_short || "-"}</b>
      </p>
      <p>Price : <b>{card.display_price || "-"}</b></p>
      <a href={link} target="_new">
        More...
      </a>
    </div>
  );
};

export default CardItem;
