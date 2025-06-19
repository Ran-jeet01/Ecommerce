import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../components/AuthProvider";

const ManageUsers = () => {
  const { userData } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setUsers(fetchedUsers);
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const changeRole = async (uid, newRole) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { role: newRole });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === uid ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Failed to change role:", error);
      setError("Failed to update user role. Please try again.");
    }
  };

  if (userData?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-red-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Access Denied
              </h3>
              <p className="text-red-700">
                You don't have permission to access this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-4 text-lg font-medium text-gray-700">
            Loading users...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-red-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-red-800">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Manage Users</h2>
        </div>

        <div className="overflow-x-auto">
          {users.length === 0 ? (
            <div className="p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No users found
              </h3>
              <p className="mt-1 text-gray-500">
                There are currently no users in the system.
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onChangeRole={changeRole}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const TableHeader = ({ children }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);

const UserRow = ({ user, onChangeRole }) => (
  <tr className="hover:bg-gray-50">
    <TableCell>
      <span className="font-medium text-gray-800">{user.email}</span>
    </TableCell>

    <TableCell>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.role === "admin"
            ? "bg-indigo-100 text-indigo-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {user.role}
      </span>
    </TableCell>

    <TableCell>
      <div className="flex space-x-2">
        {user.role !== "admin" && (
          <Button
            onClick={() => onChangeRole(user.id, "admin")}
            color="indigo"
            icon={
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          >
            Make Admin
          </Button>
        )}
        {user.role !== "user" && (
          <Button
            onClick={() => onChangeRole(user.id, "user")}
            color="yellow"
            icon={
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            }
          >
            Revoke Admin
          </Button>
        )}
      </div>
    </TableCell>
  </tr>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap">{children}</td>
);

const Button = ({ children, onClick, color, icon }) => {
  const colorClasses = {
    indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    yellow: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    gray: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${colorClasses[color]} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150`}
    >
      {icon}
      {children}
    </button>
  );
};

export default ManageUsers;
