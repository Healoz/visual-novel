import React, { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

const StoryBeatNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="border p-3 bg-white flex gap-3">
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" className="nodrag bg-gray-100 p-2" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
};

export default StoryBeatNode;
