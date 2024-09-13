import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RestTemplate from "../components/restComponents/RestTemplate";
import axios from "axios";
import Header from "../common/Header";

function Restaurant() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-total-pages`
        );
        setTotalPages(response.data.totalPages);
        // setCurrentPage(totalPages-1);
      } catch (error) {
        console.error("Error fetching total pages:", error);
      }
    };
    fetchTotalPages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-rest`,
          { pageNumber: currentPage }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleIndividualSearch = async (e) => {
    e.preventDefault();
    const id = e.target.search.value;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/get-rest-by-id/${id}`
      );
      if (response) {
        alert("Restaurant found");
        navigate(`/ind-rest/${id}`);
      } else {
        alert("Restaurant not found, Try advanced search");
      }
    } catch (error) {
      alert("Restaurant not found, Try advanced search");
      e.target.search.value = null;
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center gap-4 p-4">
        <Link
          to="/adv"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Advanced Search
        </Link>
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </Link>
      </div>
      <form
        onSubmit={handleIndividualSearch}
        className="flex items-center justify-center gap-4 bg-white rounded p-2"
      >
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Enter Restaurant ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        <button
          type="submit"
          className="h-8 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
        >
          Search
        </button>
      </form>
      <RestTemplate
        data={data}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Restaurant;
