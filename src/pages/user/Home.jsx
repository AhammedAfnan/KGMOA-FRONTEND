import Navbar from "../../components/user/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex mt-5">
        {/* Banner Section */}
        <div className="flex-3 w-3/4 bg-gray-100 h-72 flex items-center justify-center rounded-md">
          <h2 className="text-lg font-semibold">Banner Area</h2>
          {/* Replace this with the actual banner content */}
        </div>

        {/* Other Content Section */}
        <div className="flex-1 w-1/4 bg-gray-200 h-72 ml-5 rounded-md">
          <h3 className="text-md font-medium text-center mt-4">Other Content</h3>
          {/* Add other content here */}
        </div>
      </div>
    </div>
  );
}
