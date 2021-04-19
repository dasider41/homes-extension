import axios from "axios";

const API_POINT = "https://gateway.homes.co.nz";

async function getPropertyID(address) {
  const req = await axios.get(
    `${API_POINT}/property/resolve?address=${address}`
  );

  const {
    data: { property_id },
  } = req;

  return property_id;
}

async function getPropertyDetails(property_id) {
  const req = await axios.get(`${API_POINT}/property/${property_id}/detail`);
  const {
    data: { property },
  } = req;

  const {
    display_estimated_lower_value_short,
    display_estimated_upper_value_short,
    display_estimated_value_short,
  } = property;

  const output = `Low:${display_estimated_lower_value_short}, Est:${display_estimated_value_short}, High:${display_estimated_upper_value_short}`;

  return output;
}

export { getPropertyID, getPropertyDetails };
