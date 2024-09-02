import React, { useState } from "react";
import Sidebar from "@/components/my_component/Sidebar/sidebar";
import Navbar from "@/components/my_component/Navbar/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"; 
import Dashboard from "../Dashboard/Dashboard";
import Jobs from "../Jobs/Jobs";

function Hr() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        setSelectedKey={setSelectedKey} 
      />
      <div className="flex-1 p-4">
        <Navbar />
        <Button
          variant="outline"
          onClick={toggleCollapsed}
          className="-mt-2 ml-5 flex items-center text-xl dark:bg-[#7e51d1]"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <motion.div
          className="mt-4 rounded-lg shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Render the appropriate content based on selectedKey */}
          {renderContent(selectedKey)}
        </motion.div>
      </div>
    </div>
  );
}

// Function to render content based on selected key
const renderContent = (selectedKey) => {
  switch (selectedKey) {
    case "1":
      return <Dashboard />;
    case "2":
      return <Jobs />;
    case "3":
      return <Dashboard />;
    case "4":
      return <Dashboard />;
    default:
      return <Dashboard />;
  }
};

export default Hr;
