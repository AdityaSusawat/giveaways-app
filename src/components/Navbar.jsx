import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b-2 border-gray-700 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="pl-12 py-2 flex">
        <img src={logo} alt="logo" className="h-12" />

        {/* <div className="flex">
          <img src={logo} alt="logo" className="h-12" />
          <a href="#" className="text-lg font-semibold hover:text-blue-400">
            Home
          </a>
          <a href="#" className="text-lg font-semibold hover:text-blue-400">
            Giveaways
          </a>
          <a href="#" className="text-lg font-semibold hover:text-blue-400">
            Winners
          </a>
          <a href="#" className="text-lg font-semibold hover:text-blue-400">
            Contact
          </a>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
