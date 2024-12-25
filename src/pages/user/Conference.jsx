import React, { useState, useEffect } from "react";
import hotelsData from "../../data/hotelsData.json";
import committeeData from "../../data/commiteeData.json";
import placesData from '../../data/placesData.json'
import Navbar from "../../components/user/Navbar";

const CommitteeSection = ({ title, members }) => (
  <div className="mb-8">
    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4">
      {title}:
    </h3>
    <div className="space-y-4">
      {members.map((member, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-4 sm:p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <p className="font-semibold text-gray-900">Name: {member.Name}</p>
          {member.Title && <p className="text-gray-700">{member.Title}</p>}
        </div>
      ))}
    </div>
  </div>
);

export default function Conference() {
  const [hotels, setHotels] = useState([]);
  const [committee, setCommittee] = useState(null);
  const [places, setPlaces ] = useState(null)
  const [view, setView] = useState("hotels");

  useEffect(() => {
    setHotels(hotelsData.hotels); // Setting hotels data
    setCommittee(committeeData); // Setting the committee data
    setPlaces(placesData.places)
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-400 min-h-screen py-4 sm:py-8 px-4 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <select
            className="mb-8 p-2 rounded"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <option value="hotels">Hotels & Lodges</option>
            <option value="committee">Committee</option>
            <option value="places">Places</option>
          </select>

          {view === "hotels" && (
            <>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 sm:mb-12">
                {hotelsData.title}
              </h1>

              {/* Hotels Section */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-12">
                {hotels.map((hotel, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-2 sm:mb-4">
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-wide hover:text-blue-600 text-center">
                        {hotel.name}
                      </h2>
                    </div>
                    <div className="text-gray-600 text-center text-bold">
                      <p>{hotel.address}</p>
                    </div>
                    <div className="text-black text-center">
                      <p>Mob:{hotel.contact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {view === "committee" && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Organizing Committee */}
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                  Organizing Committee
                </h1>

                {committee && committee["Organizing Committee"] && (
                  <div>
                    {/* Roles with single members */}
                    {["Organizing Chairman", "Organizing Co-Chairman"].map(
                      (role, index) => (
                        <CommitteeSection
                          key={index}
                          title={role}
                          members={[committee["Organizing Committee"][role]]}
                        />
                      )
                    )}

                    {/* Roles with multiple members */}
                    {Object.keys(committee["Organizing Committee"])
                      .filter((role) =>
                        Array.isArray(committee["Organizing Committee"][role])
                      )
                      .map((role) => (
                        <CommitteeSection
                          key={role}
                          title={role.replace(/([A-Z])/g, " $1").trim()}
                          members={committee["Organizing Committee"][role]}
                        />
                      ))}
                  </div>
                )}
              </div>

              {/* Conference Committee Chairmans & Co-Chairmans */}
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                  Conference Committee Chairmans & Co-Chairmans
                </h1>

                {committee &&
                  committee[
                    "Conference Committee Chairmans & Co-Chairmans"
                  ] && (
                    <div>
                      {Object.keys(
                        committee[
                          "Conference Committee Chairmans & Co-Chairmans"
                        ]
                      ).map((role, index) => (
                        <CommitteeSection
                          key={index}
                          title={role.replace(/([A-Z])/g, " $1").trim()}
                          members={
                            committee[
                              "Conference Committee Chairmans & Co-Chairmans"
                            ][role]
                          }
                        />
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}
          { view === 'places' && (
            <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 sm:mb-12">{placesData.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {places.map((place, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img src={place.image} alt={place.name} className="w-full h-32 sm:h-48 object-cover rounded-md mb-4" />
                  <h2  className="text-lg sm:text-2xl font-bold text-gray-900 tracking-wide text-center">{place.name}</h2>
                </div>
              ))}
            </div>
            </>
          ) }
        </div>
      </div>
    </>
  );
}
