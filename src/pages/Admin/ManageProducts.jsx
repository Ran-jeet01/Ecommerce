import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../components/AuthProvider";

// Theme constants
const theme = {
  colors: {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    secondary: "bg-emerald-500 hover:bg-emerald-600",
    danger: "bg-rose-500 hover:bg-rose-600",
    warning: "bg-amber-500 hover:bg-amber-600",
    muted: "bg-slate-500 hover:bg-slate-600",
  },
  text: {
    light: "text-white",
    dark: "text-slate-800",
  },
  spacing: {
    small: "px-3 py-1.5",
    medium: "px-4 py-2",
    large: "px-5 py-2.5",
  },
  rounded: {
    small: "rounded",
    medium: "rounded-md",
    large: "rounded-lg",
  },
  shadow: "shadow-sm hover:shadow-md",
  transition: "transition-all duration-200 ease-in-out",
};

const ManageProducts = () => {
  const { userData } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Product"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "Product", id));
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setEditedData({
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateDoc(doc(db, "Product", id), {
        name: editedData.name,
        price: Number(editedData.price),
        discount: Number(editedData.discount),
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...editedData } : product
        )
      );
      handleCancelEdit();
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (userData?.role !== "admin") {
    return <AccessDenied />;
  }

  if (loading) return <LoadingMessage />;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">
        Manage Products
      </h2>
      <ProductsTable
        products={products}
        editingId={editingId}
        editedData={editedData}
        onInputChange={handleInputChange}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

// Extracted components
const AccessDenied = () => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center p-6 bg-rose-50 rounded-lg max-w-md">
      <svg
        className="w-12 h-12 mx-auto text-rose-500"
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
      <h3 className="text-xl font-medium text-rose-800 mt-4">Access Denied</h3>
      <p className="mt-2 text-rose-600">
        This area is restricted to administrators only.
      </p>
    </div>
  </div>
);

const LoadingMessage = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex items-center space-x-2">
      <svg
        className="animate-spin h-8 w-8 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="text-lg font-medium text-slate-700">
        Loading products...
      </span>
    </div>
  </div>
);

const ProductsTable = ({
  products,
  editingId,
  editedData,
  onInputChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-slate-50">
          <TableHeader>Product Name</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Discount</TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            isEditing={editingId === product.id}
            editedData={editedData}
            onInputChange={onInputChange}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
    {children}
  </th>
);

const ProductRow = ({
  product,
  isEditing,
  editedData,
  onInputChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) => {
  // Safely format the price
  const formatPrice = (price) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  return (
    <tr className="hover:bg-slate-50">
      <TableCell>
        {isEditing ? (
          <input
            name="name"
            value={editedData.name}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        ) : (
          <span className="font-medium text-slate-800">{product.name}</span>
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <input
            type="number"
            name="price"
            value={editedData.price}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        ) : (
          <span className="text-slate-700">{formatPrice(product.price)}</span>
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <input
            type="number"
            name="discount"
            value={editedData.discount}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        ) : (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              (product.discount || 0) > 0
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-100 text-slate-800"
            }`}
          >
            {product.discount || 0}%
          </span>
        )}
      </TableCell>

      <TableCell>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                onClick={() => onSaveEdit(product.id)}
                color="secondary"
                size="small"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                }
              >
                Save
              </Button>
              <Button
                onClick={onCancelEdit}
                color="muted"
                size="small"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                }
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => onStartEdit(product)}
                color="warning"
                size="small"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                }
              >
                Edit
              </Button>
              <Button
                onClick={() => onDelete(product.id)}
                color="danger"
                size="small"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                }
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </tr>
  );
};

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap">{children}</td>
);

const Button = ({ children, onClick, color, size = "medium", icon }) => {
  const sizeClasses = {
    small: "text-xs px-3 py-1.5",
    medium: "text-sm px-4 py-2",
    large: "text-base px-5 py-2.5",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center ${theme.colors[color]} ${sizeClasses[size]} ${theme.rounded.medium} ${theme.shadow} ${theme.transition} text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {icon}
      {children}
    </button>
  );
};

export default ManageProducts;
