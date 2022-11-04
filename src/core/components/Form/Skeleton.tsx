import React from "react";

export default function Skeleton() {
  return (
    <div role="status" className="w-full animate-pulse ">
      <div className="w-full px-3  text-sm">
        <div className="h-10 w-full rounded-2xl bg-base-300"></div>
      </div>
    </div>
  );
}
