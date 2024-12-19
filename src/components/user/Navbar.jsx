export default function Navbar() {
   return (
      <nav className="bg-red-400 text-black p-6 flex justify-between items-center">
        <div className="text-3xl font-extrabold">
          <a href="">KGMOA</a>
        </div>
        <div>
          <ul className="flex space-x-6">
            <li><a href="" className="font-bold">Home</a></li>
            <li><a href="" className="font-bold">Conference 2025</a></li>
            <li><a href="" className="font-bold">Contact Us</a></li>
            <li><a href="" className="font-bold">About Us</a></li>
            <li><a href="" className="font-bold">Admin</a></li>
          </ul>
        </div>
      </nav>
    );
}
