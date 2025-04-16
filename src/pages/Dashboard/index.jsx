import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { getItem, removeItem } = useLocalStorage();
  const user = getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Profile Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900">{user?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user?.email || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="bg-white border border-gray-200 rounded-md divide-y">
                <div className="p-4">
                  <p className="text-gray-900">No recent activity</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-4 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-left">
                  <h3 className="font-medium">Edit Profile</h3>
                  <p className="text-sm text-blue-600">
                    Update your information
                  </p>
                </button>
                <button className="p-4 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors text-left">
                  <h3 className="font-medium">View Bookings</h3>
                  <p className="text-sm text-purple-600">
                    Check your appointments
                  </p>
                </button>
                <button className="p-4 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors text-left">
                  <h3 className="font-medium">Browse Photographers</h3>
                  <p className="text-sm text-green-600">
                    Find the perfect match
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
