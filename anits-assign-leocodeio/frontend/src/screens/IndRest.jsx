import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ccmapper } from "../common/utils/countryToCode";
import Header from "../common/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaStarHalfAlt } from "react-icons/fa";

const IndRest = () => {
  const { id } = useParams(); // Extract the ID from the URL parameters
  const [takeReview, SetTakeReview] = useState(false);
  const [data, setData] = useState(null);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-rest-by-id/${id}`
        );
        setData(response.data.rest[0]);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, review]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const submitReview = async (e) => {
    e.preventDefault();
    if (review === "") {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/review/${id}`,
        {
          name: name,
          review: review,
          rating: rating,
        }
      );
      console.log(response);
      setReview("");
      setName("");
      setRating("");
      SetTakeReview(false);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(data["Reviews"]);
  const reviews = {};
  const ratings = {};
  if (data["Reviews"].length > 0) {
    for (let i = 0; i < data["Reviews"].length; i++) {
      const name = data["Reviews"][i].name;
      const rev = data["Reviews"][i].review;
      const rating = data["Reviews"][i].rating;
      ratings[name] = [rating];
      if (!reviews[name]) {
        reviews[name] = [rev];
      } else {
        reviews[name].push(rev);
      }
    }
  }

  console.log(reviews);
  console.log(Object.keys(reviews).length);

  return (
    <>
      <Header />
      <div className="flex flex-col gap-2 items-center justify-center mt-1">
        <button
          className=" bg-red-500 flex items-center justify-center gap-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            SetTakeReview(!takeReview);
          }}
        >
          {!takeReview ? "give review" : "close"}
        </button>
        {takeReview && (
          <form
            className="rounded flex gap-2 border border-2 border-black p-2"
            onSubmit={submitReview}
          >
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={rating}
              placeholder="rating"
              onChange={(e) => {
                e.preventDefault();
                setRating(e.target.value);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              placeholder="name"
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="review"
              value={review}
              onChange={(e) => {
                e.preventDefault();
                setReview(e.target.value);
              }}
            />
            <button
              className=" bg-green-500 flex items-center justify-center gap-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              submit review
            </button>
          </form>
        )}
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 px-4 py-2 ">
            {data["Restaurant Name"]} Restaurant
          </h1>
          <Link
            to="/rest"
            className="border border-2 border-black rounded px-2 text-black-500 hover:text-black-700 mb-2 "
          >
            <b>&lt;Back</b>
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-left justify-center w-[600px] bg-black text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-2">
            <strong>ID:</strong> {data["Restaurant ID"]}
          </p>
          <p className="mb-2">
            <strong>Name:</strong> {data["Restaurant Name"]}
          </p>
          <p className="mb-2">
            <strong>Country:</strong> {ccmapper[parseInt(data["Country Code"])]}
          </p>
          <p className="mb-2">
            <strong>Country code:</strong> {data["Country Code"]}
          </p>
          <p className="mb-2">
            <strong>Average Cost for Two:</strong>{" "}
            {data["Average Cost for two"]}
          </p>
          <p className="mb-2">
            <strong>Cuisines:</strong> {data["Cuisines"]}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {data["Description"]}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {data["Address"]}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {data["Aggregate rating"]}
          </p>
          <p className="mb-2">
            <strong>Votes:</strong> {data["Votes"]}
          </p>

          <div className="mb-2">
            <strong>Reviews:</strong>
            {Object.keys(reviews).length > 0 ? (
              <Carousel
                showIndicators={false}
                autoPlay={true}
                infiniteLoop={true}
              >
                {Object.keys(reviews).map((key) => (
                  <div key={key}>
                    <p className="mb-2">
                      <strong className="flex gap-2 items-center justify-center">
                        -{key}-
                      </strong>
                      <strong className="flex gap-2 items-center justify-center">
                        <FaStarHalfAlt /> {ratings[key]}
                      </strong>
                    </p>
                    {reviews[key].map((rev, index) => (
                      <p className="mb-2" key={index}>
                        {rev}
                      </p>
                    ))}
                  </div>
                ))}
              </Carousel>
            ) : (
              <>No reviews till now</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndRest;
