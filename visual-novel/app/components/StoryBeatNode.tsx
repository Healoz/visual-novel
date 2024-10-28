import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

// Define the props type
interface CustomNodeProps {
  data: {
    color: string;
  };
  isConnectable: boolean;
}

const CustomColorPickerNode: React.FC<CustomNodeProps> = ({
  data,
  isConnectable,
}) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>
        Custom Color Picker Node: <strong>{data.color}</strong>
      </div>
      <input className="nodrag" type="color" defaultValue={data.color} />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(CustomColorPickerNode);
