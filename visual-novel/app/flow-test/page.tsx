import PageContainer from "../components/PageContainer";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import React, { useCallback } from "react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function FlowTestPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <PageContainer>
      <h1 className="text-3xl">Flow Test</h1>
      <div style={{ width: "100%", height: "100vh", backgroundColor: "grey" }}>
        <ReactFlow nodes={initialNodes} edges={initialEdges} />
      </div>
    </PageContainer>
  );
}
