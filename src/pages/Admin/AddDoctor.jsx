import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { backendURL, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 8) return toast.error("Password must be at least 8 characters");

    if (!docImg || typeof docImg === "string") {
      return toast.error("Please upload an image");
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);

      const { data } = await axios.post(
        `${backendURL}/api/admin/add-doctor`,
        formData,
        {
          headers: { atoken: aToken, "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success(data.message);

        
        setDocImg(data.doctor.image);

        // Reset other form fields
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 year");
        setFees("");
        setAbout("");
        setSpeciality("General Physician");
        setDegree("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold">Add Doctor</h1>

        {/* Image Upload */}
        <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-400 transition">
          <label htmlFor="doc-img" className="flex flex-col items-center cursor-pointer">
            <img
              src={docImg ? (typeof docImg === "string" ? docImg : URL.createObjectURL(docImg)) : assets.upload_area}
              alt="upload"
              className="w-20 h-20 mb-2 rounded-full"
            />
            <p className="text-gray-600 text-center">Upload Doctor <br /> Picture</p>
            <input
              type="file"
              id="doc-img"
              accept="image/*"
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
          </label>
        </div>

        {/* Doctor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="email@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`${i + 1} year`}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Fees</label>
            <input
              type="number"
              placeholder="Fees"
              required
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Speciality</label>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="General Physician">General Physician</option>
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
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">About Doctor</label>
          <textarea
            placeholder="Write about doctor..."
            required
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Uploading..." : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;