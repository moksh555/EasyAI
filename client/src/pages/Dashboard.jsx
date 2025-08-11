import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  const getDashBoardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creation);
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashBoardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-x1 border border-gray-200">
          <div className="text-slice-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-x1 border border-gray-200">
          <div className="text-slice-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
      </div>
      {/* recent creation */}

      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <span className="w-10 h-10 my-1 rounded-full border-3 border-pruple border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4">Recent Cretaions</p>
          {creations.map((item) => {
            return <CreationItem key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
