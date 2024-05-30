import { useEffect, useState } from "react";
import QuestionSVG from "./assets/QuestionSVG";
import Modal from "./components/Modal";

import Navbar from "./components/Navbar";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [displayedItems, setDisplayedItems] = useState([]);
  const [loadMore, setLoadMore] = useState(20);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [platform, setPlatform] = useState("");
  const [sortBy, setSortBy] = useState("");

  const url = `https://gamerpower.p.rapidapi.com/api/giveaways?${query}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "25fe09e5f7mshd10231fa965c7bap1ee069jsn4e15a07ac453",
      "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
    },
  };

  //Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    if (data.length > 0) {
      setDisplayedItems(data.slice(0, loadMore));
    }
  }, [data, loadMore]);

  const handleLoadMore = () => {
    setLoadMore((prev) => prev + 10);
  };

  const handleQuestion = (id) => {
    const item = data.find((item) => item.id === id);
    setModalContent(item);
    setShowModal(true);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePlatform = (event) => {
    setPlatform(event.target.value);
  };

  const handleApplyFilters = () => {
    let newQuery = ``;
    if (sortBy) newQuery += `&sort-by=${sortBy}`;
    if (type) newQuery += `&type=${type}`;
    if (platform) newQuery += `&platform=${platform}`;
    setQuery(newQuery);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <div className="flex-grow p-4 mt-16">
        {/* If loading */}
        {loading && <p>Loading...</p>}

        {/* If error */}
        {error && <p>{error.message}</p>}

        {/* If no items */}
        {!loading && !error && displayedItems.length === 0 && (
          <p>No items available</p>
        )}

        {/* Main */}
        <div className="flex">
          {/* Filters and search */}
          <div className="hidden w-56 lg:flex flex-col border-2 fixed top-18 left-4 h-96 bg-gray-800 rounded-lg items-center">
            <p className="font-bold mb-4 mt-4 text-3xl">Filters</p>
            {/* Type */}
            <div className="mb-4 px-5">
              <label className="font-semibold text-gray-100 mb-1">TYPE:</label>
              <div className="mt-2">
                <div className="mb-2 flex items-center">
                  <input
                    type="radio"
                    name="type"
                    id="game"
                    value="game"
                    checked={type === "game"}
                    onChange={handleTypeChange}
                    className="form-radio text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-500"
                  />
                  <label htmlFor="game" className="ml-2 text-gray-100">
                    Game
                  </label>
                </div>
                <div className="mb-2 flex items-center">
                  <input
                    type="radio"
                    name="type"
                    id="loot"
                    value="loot"
                    checked={type === "loot"}
                    onChange={handleTypeChange}
                    className="form-radio text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-500"
                  />
                  <label htmlFor="loot" className="ml-2 text-gray-100">
                    Loot
                  </label>
                </div>
                <div className="mb-2 flex items-center">
                  <input
                    type="radio"
                    name="type"
                    id="beta"
                    value="beta"
                    checked={type === "beta"}
                    onChange={handleTypeChange}
                    className="form-radio text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-500"
                  />
                  <label htmlFor="beta" className="ml-2 text-gray-100">
                    Beta
                  </label>
                </div>
              </div>
            </div>

            {/* Sort by */}
            <div className="mb-4 flex flex-col">
              <label className="font-semibold text-gray-100 mb-1">
                SORT BY:
              </label>
              <select
                value={sortBy}
                onChange={handleSortByChange}
                className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any</option>
                <option value="popularity">Popularity</option>
                <option value="value">Value</option>
                <option value="end_date">End Date</option>
              </select>
            </div>
            {/* Platform */}
            {/* <div>
            <div className="mb-2">
              <label>PLATFORM:</label>
              <div className="mt-2">
                <div className="mb-2">
                  <input
                    type="radio"
                    name="platform"
                    id="pc"
                    value="pc"
                    checked={platform === "pc"}
                    onChange={handleTypeChange}
                  />
                  <label htmlFor="pc">PC</label>
                </div>
                <div className="mb-2">
                  <input
                    type="radio"
                    name="platform"
                    id="loot"
                    value="loot"
                    checked={type === "loot"}
                    onChange={handleTypeChange}
                  />
                  <label htmlFor="loot">Loot</label>
                </div>
                <div className="mb-2">
                  <input
                    type="radio"
                    name="platform"
                    id="beta"
                    value="beta"
                    checked={type === "beta"}
                    onChange={handleTypeChange}
                  />
                  <label htmlFor="beta">Beta</label>
                </div>
              </div>
            </div>
            </div> */}

            {/* Search */}
            <button
              onClick={handleApplyFilters}
              className="mt-4 p-2 px-8 bg-blue-500 hover:bg-blue-700 text-white rounded transition-colors duration-200"
            >
              Search
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow lg:ml-60">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="border-2 border-gray-700 flex flex-col h-80 sm:h-64 md:h-72 bg-gray-800 rounded-lg shadow-lg"
                >
                  <div className="h-[50%]">
                    <img
                      src={item.image}
                      alt={`img${item.id}`}
                      className="w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="h-full flex flex-col justify-between p-2">
                    <div className="font-medium">{item.title}</div>
                    <div className="flex justify-between items-center mb-3 pr-2 pl-2">
                      <div className="flex gap-x-4">
                        <a
                          href={item.open_giveaway_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 hover:bg-blue-700 p-1 pr-2 pl-2 rounded-sm text-lg text-white transition-colors duration-200"
                        >
                          CLAIM
                        </a>
                        <div
                          className="cursor-pointer content-center"
                          onClick={() => handleQuestion(item.id)}
                        >
                          <QuestionSVG
                            color="#97E333"
                            size="32"
                            className="hidden md:flex"
                          />
                        </div>
                      </div>
                      <div className="hidden md:flex font-bold text-2xl">
                        {item.worth === "N/A" ? "" : item.worth}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!loading && !error && displayedItems.length < data.length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded transition-colors duration-200"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        item={modalContent}
      />
    </div>
  );
}

export default App;
