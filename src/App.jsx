import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [displayedItems, setDisplayedItems] = useState([]);
  const [loadMore, setLoadMore] = useState(20);

  const url = "https://gamerpower.p.rapidapi.com/api/giveaways";
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

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //     document.documentElement.offsetHeight
  //   ) {
  //     return;
  //   }
  //   setLoadMore((prev) => prev + 10);
  // };

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //     document.documentElement.offsetHeight - 1
  //   ) {
  //     setLoadMore((prev) => prev + 10);
  //   }
  // };

  const handleLoadMore = () => {
    setLoadMore((prev) => prev + 10);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <div className="flex-grow p-4">
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {!loading && !error && displayedItems.length === 0 && (
          <p>No items available</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="border-2 border-gray-700 flex flex-col h-72 bg-gray-800 rounded-lg shadow-lg"
            >
              <div className="h-[60%]">
                <img
                  src={item.image}
                  alt={`img${item.id}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="h-[40%] flex flex-col justify-between p-2">
                <div className="font-medium">{item.title}</div>
                <div className="flex justify-between items-center">
                  <a
                    href={item.open_giveaway_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-700 p-1 pr-2 pl-2 rounded-sm text-lg text-white transition-colors duration-200"
                  >
                    CLAIM
                  </a>
                  <div className="font-bold text-2xl">
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
  );
}

export default App;
