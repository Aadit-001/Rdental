import React, { useContext } from "react";
import { FaUserTie } from "react-icons/fa";
import myContext from "../context/data/myContext";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, product } = context;

  const dashboardCards = [
    { title: "Total Products", count: product?.length || 0 },
    { title: "Total Orders", count: 158 },
    { title: "Total Users", count: 84 },
    { title: "Total Revenue", count: 45600 }
  ];

  const cardStyle = {
    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
    color: mode === "dark" ? "white" : "",
  };

  return (
    <section className="text-gray-600 body-font mt-28 mb-28">
      <div className="container px-5 mx-auto mb-10">
        <div className="flex flex-wrap -m-4 text-center">
          {dashboardCards.map((card, index) => (
            <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={cardStyle}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {card.title === "Total Revenue" ? `₹${card.count}` : card.count}
                </h2>
                <p
                  className="text-purple-500 font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DashboardTab />
    </section>
  );
}

export default Dashboard;

