import Rest from "../model/rest.js";
import csv from "csv-parser";
import fs from "fs";
import { ccmapperReverse } from "../utils/countryToCode.js";

const uploadCSV = async (req, res) => {
  console.log("--break point--");
  try {
    const file = req.file;
    const data = [];

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    fs.createReadStream(file.path) //creates redable stream
      .pipe(csv()) // pipes output of one stream to input of another csv method is to deal with csv
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", async () => {
        // fs.unlinkSync(file.path);
        //check every val in colums is good to insert
        console.log(data);
        await Rest.insertMany(data);
        res.status(200).json({ message: "CSV uploaded successfully" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading CSV" });
  }
};

const getRestById = async (req, res) => {
  // console.log(req.params)
  const id = req.params.id;
  //  console.log(id);
  try {
    const rest = await Rest.find({ "Restaurant ID": id });
    res.status(200).json({ rest }); // this will go to the template and the details of restarant will be visible
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const getTotalPages = async (req, res) => {
  try {
    const totalDocs = req.body.totalDocs || (await Rest.countDocuments());
    const totalPages = Math.ceil(totalDocs / 10);
    res.status(200).json({ totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching total pages" });
  }
};

const getRest = async (req, res) => {
  // console.log("---breakpoint---")
  // console.log(req.body);
  const pageNumber = parseInt(req.body.pageNumber);
  // console.log(pageNumber)
  const pageSize = 10; // we change from fe if we want
  // const totalDocs = await Rest.countDocuments();

  const data = req.body.docs || Rest.find();
  data
    .skip((pageNumber - 1) * pageSize) // skip the previous pages
    .limit(pageSize) // limit the number of documents per page
    .then((docs) => {
      // Send the paginated data to the client
      // console.log(docs);
      // console.log(docs.length);
      // console.log(totalDocs);
      res.json({
        data: docs,
        // pagination: {
        //   pageNumber,
        //   pageSize,
        //   totalPages: Math.ceil(totalDocs / pageSize),
        // },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error fetching data" });
    });
};

const serchByNameAndDesc = async (req, res) => {
  const { name, description, pageNumber, pageSize } = req.body;

  const query = {};

  if (name) {
    query["Restaurant Name"] = { $regex: name, $options: "i" };
  }

  if (description) {
    query.$or = [
      { "Restaurant Name": { $regex: description, $options: "i" } },
      { "Locality Verbose": { $regex: description, $options: "i" } },
      { Cuisines: { $regex: description, $options: "i" } },
    ];
  }

  const page = pageNumber || 1;
  const limit = pageSize || 10;
  const skip = (page - 1) * limit;

  try {
    const restaurants = await Rest.find(query).skip(skip).limit(limit);
    const totalDocuments = await Rest.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);

    res.json({
      data: restaurants,
      pagination: {
        pageNumber: page,
        pageSize: limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const filterRest = async (req, res) => {
  const {
    country,
    avg_spend,
    cuisines,
    pageNumber = 1,
    pageSize = 15,
  } = req.body;
  console.log(country, avg_spend, cuisines);

  const query = {};

  if (country) {
    query["Country Code"] = ccmapperReverse[country];
  }

  if (avg_spend) {
    query["Average Cost for two"] = { $gte: avg_spend }; //$gte is a query operator that stands for "Greater Than or Equal To"
  }

  if (cuisines) {
    if (typeof cuisines === "string") {
      query["Cuisines"] = { $regex: cuisines, $options: "i" };
    } else {
      console.error("cuisines is not a string:", cuisines);
    }
  }
  console.log(query, ccmapperReverse[country]);

  if (country || avg_spend || cuisines) {
    try {
      const totalDocs = await Rest.countDocuments(query);
      const restaurants = await Rest.find(query)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      console.log(restaurants);
      res.json({
        data: restaurants,
        pagination: {
          pageNumber,
          pageSize,
          totalPages: Math.ceil(totalDocs / pageSize),
          totalDocs,
        },
      });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Missing parameters" });
  }
};

const addReview = async (req, res) => {
  const id = req.params.id;
  const review = req.body.review;
  const name = req.body.name;
  const rating = req.body.rating;

  console.log(id, review, name);

  try {
    const rest = await Rest.findOne({ "Restaurant ID": id });

    if (rest) {
      rest.Reviews.push({ name: name, rating:rating,review: review });
      await rest.save();
      res.status(200).json({ message: "Review added successfully" });
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};


export {
  uploadCSV,
  getRestById,
  getRest,
  getTotalPages,
  serchByNameAndDesc,
  filterRest,
  addReview,
};
