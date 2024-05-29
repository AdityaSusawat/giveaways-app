import { useEffect, useState } from "react";
import QuestionSVG from "./assets/QuestionSVG";
import Modal from "./components/Modal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      <div className="flex-grow p-4">
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {!loading && !error && displayedItems.length === 0 && (
          <p>No items available</p>
        )}
        <div className="flex">
          <div className="hidden w-56 lg:flex flex-col border-2 fixed top-4 left-4 h-96 bg-gray-800 rounded-lg items-center">
            <p className="font-bold mb-4 mt-4 text-3xl">Filters</p>
            {/* Type */}
            <div className="mb-2">
              <label>TYPE:</label>
              <div className="mt-2">
                <div className="mb-2">
                  <input
                    type="radio"
                    name="type"
                    id="game"
                    value="game"
                    checked={type === "game"}
                    onChange={handleTypeChange}
                  />
                  <label htmlFor="game">Game</label>
                </div>
                <div className="mb-2">
                  <input
                    type="radio"
                    name="type"
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
                    name="type"
                    id="beta"
                    value="beta"
                    checked={type === "beta"}
                    onChange={handleTypeChange}
                  />
                  <label htmlFor="beta">Beta</label>
                </div>
              </div>
              {/* <RadioGroup
                value={type}
                onChange={handleTypeChange}
                className="mt-2"
              >
                <div className="mb-2">
                  <RadioGroupItem
                    type="radio"
                    name="type"
                    id="game"
                    value="game"
                    checked={type === "game"}
                  />
                  <Label htmlFor="game">Game</Label>
                </div>
                <div className="mb-2">
                  <RadioGroupItem
                    type="radio"
                    name="type"
                    id="loot"
                    value="loot"
                    checked={type === "loot"}
                  />
                  <Label htmlFor="loot">Loot</Label>
                </div>
                <div className="mb-2">
                  <RadioGroupItem
                    type="radio"
                    name="type"
                    id="beta"
                    value="beta"
                    checked={type === "beta"}
                  />
                  <Label htmlFor="beta">Beta</Label>
                </div>
              </RadioGroup> */}
            </div>
            {/* Sort by */}
            <div className="mb-2 flex flex-col">
              <label className="font-semibold">SORT BY:</label>
              <select value={sortBy} onChange={handleSortByChange}>
                <option value="">Any</option>
                <option value="popularity">Popularity</option>
                <option value="value">Value</option>
                <option value="end_date">End Date</option>
              </select>
              {/* <Select value={sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger className="w-[180px] text-red-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="value">Value</SelectItem>
                  <SelectItem value="end_date">End Date</SelectItem>
                </SelectContent>
              </Select> */}
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
              className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded transition-colors duration-200"
            >
              Search
            </button>
          </div>
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
