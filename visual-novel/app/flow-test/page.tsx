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

  // when user creates connection
  const onConnect = useCallback(
    (connection: Connection) => {
      setStory((prevStory) => {
        const updatedStoryBeats = prevStory.storyBeats.map((storyBeat) => {
          if (storyBeat.id === connection.source) {
            const newChoice: Choice = {
              id: `${storyBeat.id}-${connection.target}`,
              label: `${storyBeat.id}-${connection.target}`,
              nextBeatId: connection.target,
            };
            const updatedChoices = [...storyBeat.choices, newChoice];
            return { ...storyBeat, choices: updatedChoices };
          }
          return storyBeat;
        });

        return { ...prevStory, storyBeats: updatedStoryBeats };
      });

      // after storybeats are modified, call the createEdgesFromChoices function
      setEdges((existingEdges) =>
        createEdgeFromChoices(story.storyBeats, existingEdges)
      );
    },
    [setEdges, setStory]
  );

  // on startup create edges from story content
  const createEdgeFromChoices = useCallback(
    (storyBeats: StoryBeat[], existingEdges: Edge[]) => {
      const newEdges: Edge[] = [];

      // first loop through each storyBeat in storybeats
      storyBeats.forEach((storyBeat) => {
        //For each choice in the choices array of a storyBeat, check if there’s already an edge that connects from this storyBeat.id to the choice.nextBeatId.
        storyBeat.choices.forEach((choice) => {
          const edgeExists = existingEdges.some(
            (edge) =>
              edge.source === storyBeat.id && edge.target === choice.nextBeatId
          );

          if (!edgeExists) {
            newEdges.push({
              id: `e-${storyBeat.id}-${choice.nextBeatId}`,
              label: choice.label,
              source: storyBeat.id,
              target: choice.nextBeatId,
            });
          }
        });
      });

      return [...existingEdges, ...newEdges];
    },
    []
  );

  // calling function to create edges
  useEffect(() => {
    setEdges((existingEdges) =>
      createEdgeFromChoices(story.storyBeats, existingEdges)
    );
  }, [story, createEdgeFromChoices, setEdges]);

  useEffect(() => {
    console.log(story);
  }, [story]);

  return (
    <div className="h-[50rem] w-full">
      <h1 className="text-3xl mb-3">Flow Test</h1>
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
