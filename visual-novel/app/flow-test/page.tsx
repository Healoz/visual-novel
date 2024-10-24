"use client";
import PageContainer from "../components/PageContainer";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import React, { useCallback } from "react";

import "@xyflow/react/dist/style.css";

//DOCUMENTATION: https://reactflow.dev/learn
const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

export default function FlowTestPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <PageContainer>
      <h1 className="text-3xl">Flow Test</h1>
      <div className="w-full h-screen bg-gray-300">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </PageContainer>
  );
}
