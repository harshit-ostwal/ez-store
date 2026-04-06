import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-90">
      <Loader2 className="animate-spin" size={32} />
    </div>
  );
}

export default Loading;
