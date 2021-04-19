import React from "react";

const CardItem = ({ card }) => {
  const { property_details } = card;
  const link = `https://homes.co.nz/address${card.url}`;

  return (
    <div className="output">
      <p>Low : {property_details.display_estimated_lower_value_short || "-"}</p>
      <p>Est : {property_details.display_estimated_value_short || "-"}</p>
      <p>
        High : {property_details.display_estimated_upper_value_short || "-"}
      </p>
      <p>Price : {card.display_price || "-"}</p>
      <a href={link} target="_new">
        More...
      </a>
    </div>
  );
};

export default CardItem;
