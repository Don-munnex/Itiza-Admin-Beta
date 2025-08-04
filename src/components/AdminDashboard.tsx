

import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ 
  selected, 
  onSelect, 
  onSignOut 
}: { 
  selected: string; 
  onSelect: (key: string) => void;
  onSignOut: () => void;
}) => {
  const navItems = ["Dashboard", "Gifts", "Orders", "Customers"];
  
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">ITIZA ADMIN</h1>
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${
              selected === item ? "bg-gray-800" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <button 
        onClick={onSignOut}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
};

const DashboardOverview = () => {
  const [data, setData] = useState({ orders: 0, customers: 0, gifts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("https://itiza-admin1.vercel.app/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData({
          orders: res.data.totalOrders,
          customers: res.data.totalCustomers,
          gifts: res.data.totalGifts,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading dashboard data...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Total Orders</h2>
        <p className="text-2xl">{data.orders}</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Total Customers</h2>
        <p className="text-2xl">{data.customers}</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Total Gifts</h2>
        <p className="text-2xl">{data.gifts}</p>
      </div>
    </div>
  );
};

const DataTable = ({ data }: { data: any[] }) => {
  if (!data.length) return <p>No data found.</p>;
  
  // Filter out image-related fields
  const keys = Object.keys(data[0]).filter(key => 
    !key.toLowerCase().includes('image') && 
    !key.toLowerCase().includes('img') &&
    !key.toLowerCase().includes('photo') &&
    !key.toLowerCase().includes('picture')
  );
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key} className="border px-2 py-1 bg-gray-100">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {keys.map((key) => (
                <td key={key} className="border px-2 py-1">
                  {typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = ({ setIsLoggedIn }: { setIsLoggedIn: (status: boolean) => void }) => {
  const [selected, setSelected] = useState("Dashboard");
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    
    // Update login state
    setIsLoggedIn(false);
    
    // Redirect to login
    navigate("/login");
  };

  useEffect(() => {
    if (selected === "Dashboard") return;

    let endpoint = "";
    switch (selected) {
      case "Gifts":
        endpoint = "items";
        break;
      case "Orders":
        endpoint = "web3orders";
        break;
      case "Customers":
        endpoint = "web3users";
        break;
      default:
        return;
    }

    setLoading(true);
    const token = localStorage.getItem("authToken");
    
    axios
      .get(`https://itiza-admin1.vercel.app/api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setTableData(res.data))
      .catch((err) => {
        console.error(`Failed to fetch ${endpoint}:`, err);
        setTableData([]);
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          handleSignOut();
        }
      })
      .finally(() => setLoading(false));
  }, [selected]);

  return (
    <div className="flex">
      <Sidebar 
        selected={selected} 
        onSelect={setSelected}
        onSignOut={handleSignOut}
      />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">{selected}</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          selected === "Dashboard" ? <DashboardOverview /> : <DataTable data={tableData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;




