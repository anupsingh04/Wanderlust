const Listing = require("../models/listing.js");

// for geocoding
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  // 1. Get both query parameters
  const { category, q } = req.query;
  // 2. Start with an empty filter
  let filter = {};
  // 3. Add category filter if it exists
  if (category) {
    filter.category = category;
  }
  // 4. Add search filter if it exists
  if (q) {
    // $or: Find listings that match EITHER title Or location Or country
    filter.$or = [
      { title: { $regex: q, $options: "i" } }, // 'i' means case-insensitive
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
    ];
  }
  // 5. Run the query with the combined filter
  // Mongoose will find documents that match ALL filter conditions (e.g., category AND search query)
  const allListings = await Listing.find(filter);
  // 6. Render the page
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    }) //nested population
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing Not Found!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.location + ", " + req.body.country,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body);

  // If no categories were checked, req.body.category will be undefined.
  // We set it to an empty array to prevent database errors.
  if (!newListing.category) {
    newListing.category = [];
  }

  newListing.owner = req.user._id; //now the creater will be linked to his listing
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  // console.log(listing);
  if (!listing) {
    req.flash("error", "Listing Not Found!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  let newImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/c_fill,h_250,w_300"
  );
  res.render("listings/edit.ejs", { listing, newImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // If no categories are checked, req.body.category will be undefined.
  // We must set it to an empty array [] to correctly overwrite the old categories.
  if (!req.body.category) {
    req.body.category = [];
  }

  let listing = await Listing.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  // Geocode if location or country changed - By Copilot
  if (req.body.location || req.body.country) {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.location + ", " + req.body.country,
        limit: 1,
      })
      .send();
    listing.geometry = response.body.features[0].geometry;
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  await listing.save();

  req.flash("success", "Listing successfully updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
