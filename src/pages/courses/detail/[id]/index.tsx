import React from "react";
import { useRouter } from "next/router";
import CourseDetail from "./CourseDetail";

function Index() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen">
      <CourseDetail id={Number(id)}></CourseDetail>
    </div>
  );
}

export default Index;
