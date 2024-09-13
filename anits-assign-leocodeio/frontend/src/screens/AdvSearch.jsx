import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ccmapperReverse } from "../common/utils/countryToCode.js";
import RestTemplate from "../components/restComponents/RestTemplate";
import Header from "../common/Header";

const AdvSearch = () => {
  const [serachOption, setSearchOption] = useState(1);
  const [country, setCountry] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [avgCost, setAvgCost] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const countryNames = Object.keys(ccmapperReverse);

  const fetchNameDescriptionSearch = async (page) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/adv/searchByNameAndDesc`,
        {
          name,
          description,
          pageNumber: page,
          pageSize: 10,
        }
      );
      setData(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const fetchOtherOptionsSearchResults = async (page) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/adv/filter`,
        {
          country: country.toLowerCase(),
          cuisines: cuisine,
          avg_spend: avgCost,
          pageNumber: page,
          pageSize: 10,
        }
      );
      setData(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (serachOption === 1) {
      if (name === "" && description === "") {
        setData([]);
        setTotalPages(0);
        return;
      }
      fetchNameDescriptionSearch(currentPage);
    } else {
      if (country === "" && cuisine === "" && avgCost === "") {
        setData([]);
        setTotalPages(0);
        return;
      }
      fetchOtherOptionsSearchResults(currentPage);
    } // eslint-disable-next-line
  }, [name, description, country, cuisine, avgCost, currentPage, serachOption]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="flex gap-2 items-center justify-center w-[600px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {serachOption === 1 ? (
            <>
              {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Search by Name and Description
              </h2> */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 flex items-center justify-center gap-2">
                <label
                  htmlFor="desc"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          ) : (
            <>
              {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Search by Matched Details
              </h2> */}
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Country:
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Country</option>
                  {countryNames.map((countryName) => (
                    <option key={countryName} value={countryName}>
                      {countryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cuisine"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Cuisine:
                </label>
                <input
                  type="text"
                  id="cuisine"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="avgCost"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Average Cost for Two:
                </label>
                <input
                  type="number"
                  id="avgCost"
                  value={avgCost}
                  onChange={(e) => setAvgCost(e.target.value)}
                  min="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={() => {
              setSearchOption(serachOption === 1 ? 0 : 1);
              setName("");
              setDescription("");
              setCountry("");
              setCuisine("");
              setAvgCost("");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {serachOption === 1 ? "More" : "Less"}
          </button>
          <Link
            to="/rest"
            className="text-blue-500 hover:text-blue-700 m-1 mx-4 "
          >
            Back
          </Link>
        </div>
      </div>
      {data.length > 0 && (
        <RestTemplate
          data={data}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default AdvSearch;
