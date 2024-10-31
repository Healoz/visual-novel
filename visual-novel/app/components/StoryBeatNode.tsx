import React, { useCallback } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import { Character, StoryBeat } from "../types";

interface StoryBeatNodeData {
  storyBeat: StoryBeat;
  characters: Character[];
  storyBeats: StoryBeat[];
  createNewDialogue: (storyBeatId: string) => void;
  createNewChoice: (storyBeatId: string) => void;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  deleteStoryBeat: (id: string) => void;
  deleteDialogue: (storyBeat: StoryBeat, dialogueId: string) => void;
  deleteChoice: (storyBeat: StoryBeat, choiceId: string) => void;
}

// creating custom node type that extends Node

type StoryBeatNode = Node<
  {
    storyBeat: StoryBeat;
    characters: Character[];
    storyBeats: StoryBeat[];
    createNewDialogue: (storyBeatId: string) => void;
    createNewChoice: (storyBeatId: string) => void;
    updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
    deleteStoryBeat: (id: string) => void;
    deleteDialogue: (storyBeat: StoryBeat, dialogueId: string) => void;
    deleteChoice: (storyBeat: StoryBeat, choiceId: string) => void;
  },
  "storyBeatNode"
>;

const StoryBeatNode = (props: NodeProps<StoryBeatNode>) => {
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
