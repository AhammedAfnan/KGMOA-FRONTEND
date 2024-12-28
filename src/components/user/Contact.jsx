import React from "react";

const ContactComponent = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Title Section */}
        <h1 className="text-xl font-bold mb-4">
          Karnataka Government Medical Officers Association
        </h1>
        {/* Address Section */}
        <div className="leading-7">
          <p className="font-medium">Arogya Bhavana</p>
          <p>Premises of Central Leprasorium</p>
          <p>Magadi Road, Bangalore - 560 023</p>
          <p>
            <span className="font-medium">Reg No.:</span> 153/76-77 dated
            16-8-1976
          </p>
        </div>
        {/* Footer Message */}
        <p className="mt-6 text-sm text-gray-400">
          For more information, contact us at our office.
        </p>
      </div>
    </footer>
  );
};

export default ContactComponent;
