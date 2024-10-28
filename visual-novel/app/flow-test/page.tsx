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
  Controls,
  MiniMap,
} from "@xyflow/react";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "@xyflow/react/dist/style.css";
import { Choice, Story, StoryBeat } from "../types";
import storyData from "../data/storyData.json";
import StoryBeatNode from "../components/StoryBeatNode";

//DOCUMENTATION: https://reactflow.dev/learn

export default function FlowTestPage() {
  const [story, setStory] = useState<Story>(storyData);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const createNewStoryBeat = () => {
    const newStoryBeat: StoryBeat = {
      id: uuidv4(),
      dialogue: [],
      choices: [],
    };

    setStory({ ...story, storyBeats: [...story.storyBeats, newStoryBeat] });
  };

  // creating nodes functions
  const createNodesFromStoryBeats = useCallback(
    (storyBeats: StoryBeat[], existingNodes: Node[]) => {
      // You had "StoryBeat[] =>" which is incorrect
      const minX = 0;
      const maxX = 800;
      const minY = 0;
      const maxY = 600;

      const getRandomPosition = () => ({
        x: Math.floor(Math.random() * (maxX - minX)) + minX,
        y: Math.floor(Math.random() * (maxY - minY)) + minY,
      });

      // filter out storyBeats that already have existing nodes
      const newStoryBeats = storyBeats.filter(
        (storyBeat) => !existingNodes.some((node) => node.id === storyBeat.id)
      );

      const newNodes: Node[] = newStoryBeats.map((storyBeat) => {
        const position = getRandomPosition();
        return {
          id: storyBeat.id,
          position: position,
          data: {
            label: storyBeat.id,
          },
        };
      });

      return [...existingNodes, ...newNodes];
    },
    []
  );

  useEffect(() => {
    if (story.storyBeats.length > 0) {
      setNodes((existingNodes) =>
        createNodesFromStoryBeats(story.storyBeats, existingNodes)
      );
    }
  }, [story, createNodesFromStoryBeats, setNodes]);

  // creating edges function

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const createEdgeFromChoices = useCallback(
    (storyBeats: StoryBeat[], existingEdges: Edge[]) => {
      return [...existingEdges];
    },
    []
  );

  return (
    <div className="h-[50rem] w-full">
      <h1 className="text-3xl">Flow Test</h1>
      <button className="border p-3 mb-3" onClick={createNewStoryBeat}>
        Create new story beat
      </button>
      <div className="w-full h-full border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
