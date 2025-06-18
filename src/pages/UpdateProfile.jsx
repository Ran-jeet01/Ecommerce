// src/pages/UpdateProfile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setName(data.name || "");
        setLocation(data.location || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [currentUser.uid]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      name,
      location,
      updatedAt: serverTimestamp(),
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      {success && <p className="text-green-500 mb-4">Profile updated!</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          className="w-full px-4 py-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (City, Country)"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
