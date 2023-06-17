import React from "react";
import TrainingDetail from "./TrainingDetail";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen">
      <TrainingDetail id={Number(id)}></TrainingDetail>
    </div>
  );
}

export default Index;
