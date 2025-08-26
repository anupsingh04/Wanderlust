const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// for geocoding
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
// const mapToken = "SECRET_MAP_TOKEN";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = await Promise.all(
    initData.data.map(async (obj) => {
      let { location, country } = { ...obj };
      let response = await geocodingClient
        .forwardGeocode({
          query: location + ", " + country,
          limit: 1,
        })
        .send();
      return {
        ...obj,
        owner: "68a8f1f1709efdee6f4085f7",
        geometry: {
          type: "Point",
          coordinates: response.body.features[0].geometry.coordinates,
        },
      };
    })
  );
  await Listing.insertMany(initData.data);
  console.log("data initialized");
};

initDB();
