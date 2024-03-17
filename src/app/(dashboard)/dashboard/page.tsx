import Information from "@/components/dashboard/Information";
import PerformanceTasks from "@/components/dashboard/PerformanceTasks";
import Questions from "@/components/dashboard/Questions";
import WeeklyTasks from "@/components/dashboard/WeeklyTasks";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col px-3 sm:px-16 lg:px-32 py-3 sm:py-10 gap-4">
      <Information />

      {/* <Questions />

      <PerformanceTasks /> */}

      <WeeklyTasks />
    </div>
  );
};

export default DashboardPage;
