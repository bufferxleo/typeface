import React from "react";
import { useNavigate } from "react-router-dom";
import { ccmapper } from "../../common/utils/countryToCode";

const RestTemplate = ({ data, totalPages, setCurrentPage, currentPage }) => {
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRestClick = (e) => {
    e.preventDefault();
    const id =
      e.target.parentElement.querySelector("td:first-child").textContent;
    navigate(`/ind-rest/${id}`);
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex items-center justify-center mb-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          {"<"}
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          {">"}
        </button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Restaurant ID
            </th>
            <th scope="col" className="px-6 py-3">
              Restaurant Name
            </th>
            <th scope="col" className="px-6 py-3">
              Country Code
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Average Cost for Two
            </th>
            <th scope="col" className="px-6 py-3">
              Cuisines
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((restaurant) => (
            <tr
              key={restaurant["Restaurant ID"]}
              onClick={handleRestClick}
              className="bg-white border-b hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-6 py-4">{restaurant["Restaurant ID"]}</td>
              <td className="px-6 py-4">{restaurant["Restaurant Name"]}</td>
              <td className="px-6 py-4">{restaurant["Country Code"]}</td>
              <td className="px-6 py-4">{ccmapper[restaurant["Country Code"]]}</td>
              <td className="px-6 py-4">
                {restaurant["Average Cost for two"]}
              </td>
              <td className="px-6 py-4">{restaurant["Cuisines"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestTemplate;
