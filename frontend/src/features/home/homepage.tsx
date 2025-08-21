import { useState, useEffect } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

import { userSearchApi } from "../../shared/config/api";

interface IUser {
  _id: string;
  username: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/");
  };

  // Fetch users from backend based on search
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        userSearchApi(search).then((res) => {
          setUsers(res.data);
        });
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [search]);

  return (
    <>
      <div className="header">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="search-bar"
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="home-container">
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user._id}
              className="user-card"
              onClick={() => navigate(`/profile/${user._id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>{user.username}</h3>
              <p>{user.email || "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}