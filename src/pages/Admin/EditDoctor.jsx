import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const AddEditDoctor = ({ editingDoctor, setEditingDoctor }) => {
  const { backendURL, aToken, getAllDoctors, editDoctor } = useContext(AdminContext);

  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Only for add
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Prefill form if editing
  useEffect(() => {
    if (editingDoctor) {
      setName(editingDoctor.name || "");
      setEmail(editingDoctor.email || "");
      setExperience(editingDoctor.experience || "1 year");
      setFees(editingDoctor.fees || "");
      setAbout(editingDoctor.about || "");
      setSpeciality(editingDoctor.speciality || "General Physician");
      setDegree(editingDoctor.degree || "");
      setDocImg(editingDoctor.image || null);
      setPassword(""); // don't prefill password
    }
  }, [editingDoctor]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !speciality || !degree || !experience || !about || !fees) {
      return toast.error("Please fill all fields");
    }

    if (!editingDoctor && password.length < 8)
      return toast.error("Password must be at least 8 characters");

    if (!docImg) return toast.error("Please provide doctor image URL");

    try {
      setIsLoading(true);

      const doctorData = {
        name,
        email,
        speciality,
        degree,
        experience,
        about,
        fees: Number(fees),
        image: typeof docImg === "string" ? docImg : null,
      };

      if (!editingDoctor) doctorData.password = password.length >= 8 ? password : undefined;

      if (editingDoctor) {
        // Edit doctor
        await editDoctor(editingDoctor._id, doctorData);
        setEditingDoctor(null); // reset edit mode
      } else {
        // Add doctor
        const response = await fetch(`${backendURL}/api/admin/add-doctor`, {
          method: "POST",
          headers: { "Content-Type": "application/json", atoken: aToken },
          body: JSON.stringify(doctorData),
        });

        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          getAllDoctors();
        } else {
          toast.error(data.message);
        }
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setExperience("1 year");
      setFees("");
      setAbout("");
      setSpeciality("General Physician");
      setDegree("");
      setDocImg(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 rounded-xl">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold">
          {editingDoctor ? "Edit Doctor" : "Add Doctor"}
        </h1>

        {/* Image URL */}
        <div className="flex flex-col items-start">
          <label className="mb-1 font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/doctor.jpg"
            value={typeof docImg === "string" ? docImg : ""}
            onChange={(e) => setDocImg(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
          {docImg && typeof docImg === "string" && (
            <img
              src={docImg}
              alt="doctor"
              className="w-28 h-28 rounded-full mt-2 object-cover border-2 border-blue-200"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {!editingDoctor && (
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label>Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`${i + 1} year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Fees</label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label>Speciality</label>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option>General Physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>Education</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>About</label>
          <textarea
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end gap-3">
          {editingDoctor && (
            <button
              type="button"
              onClick={() => setEditingDoctor(null)}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {editingDoctor ? (isLoading ? "Updating..." : "Update Doctor") : isLoading ? "Adding..." : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditDoctor;