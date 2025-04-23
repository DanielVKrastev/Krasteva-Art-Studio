import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AdminContext } from "../contexts/AdminContext";

export default function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminData = { uid: user.uid, email: user.email };
        setAdmin(adminData);
        localStorage.setItem("admin", JSON.stringify(adminData));
      } else {
        setAdmin(null);
        localStorage.removeItem("admin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
}
