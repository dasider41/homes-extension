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
  const req = await axios.get(
    `${API_POINT}/properties?property_ids=${property_id}`
  );
  const {
    data: { cards },
  } = req;

  return cards;
}

export { getPropertyID, getPropertyDetails };
