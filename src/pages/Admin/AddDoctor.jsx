import React from "react";
import { assets } from "../../assets/assets_admin/assets";

const AddDoctor = () => {
  return (
    <div className="p-6 min-h-screen">
      <form className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Add Doctor</h1>

        {/* Upload Picture */}
        <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-400 transition">
          <label htmlFor="doc-img" className="flex flex-col items-center cursor-pointer">
            <img src={assets.upload_area} alt="upload" className="w-20 h-20 mb-2" />
            <p className="text-gray-600 text-center">
              Upload Doctor <br /> Picture
            </p>
            <input type="file" id="doc-img" hidden />
          </label>
        </div>

        {/* Doctor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              placeholder="Name"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Doctor Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Doctor Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Doctor Experience</label>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`${i + 1} year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Fees</label>
            <input
              type="number"
              placeholder="Fees"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Speciality</label>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="General physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Education</label>
            <input
              type="text"
              placeholder="Education"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">About Me</label>
          <textarea
            placeholder="Write about doctor..."
            rows={5}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;