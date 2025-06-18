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
        const productsData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
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

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "Product", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditedData({
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedData({});
  };

  const saveEdit = async (id) => {
    try {
      await updateDoc(doc(db, "Product", id), {
        name: editedData.name,
        price: Number(editedData.price),
        discount: Number(editedData.discount),
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...editedData } : p))
      );
      cancelEdit();
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  if (userData?.role !== "admin") {
    return <p className="p-4 text-red-500">Access denied. Admins only.</p>;
  }

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Discount</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border px-4 py-2">
                {editingId === p.id ? (
                  <input
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                    className="border px-2 py-1"
                  />
                ) : (
                  p.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editedData.price}
                    onChange={(e) =>
                      setEditedData({ ...editedData, price: e.target.value })
                    }
                    className="border px-2 py-1"
                  />
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editedData.discount}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        discount: e.target.value,
                      })
                    }
                    className="border px-2 py-1"
                  />
                ) : (
                  `${p.discount || 0}%`
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editingId === p.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(p.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(p)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
