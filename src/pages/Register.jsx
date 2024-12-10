export default function Register() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-4/5  flex flex-col items-center justify-center px-10">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-black">
          Register
        </h2>
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 px-2">
                Name:
              </label>
              <input
                type="text"
                className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-black focus:outline-none"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 px-2">
                Place:
              </label>
              <input
                type="text"
                className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-black focus:outline-none"
                placeholder="Enter place"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 px-2">
                KMC No:
              </label>
              <input
                type="text"
                className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-black focus:outline-none"
                placeholder="Enter KMC No"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 px-2">
                Mobile No:
              </label>
              <input
                type="text"
                className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-black focus:outline-none"
                placeholder="Enter mobile no"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 px-2">
                Reg Fees:
              </label>
              <input
                type="text"
                className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-black focus:outline-none"
                placeholder="Enter fees"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 mt-3 px-4 bg-black text-white font-bold rounded-lg hover:bg-gray-500 focus:outline-none focus:ring focus:ring-black"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
