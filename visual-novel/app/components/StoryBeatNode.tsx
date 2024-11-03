import React, { useCallback } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import { Character, StoryBeat } from "../types";
import DialogueCell from "./DialogueCell";

// creating custom node type that extends Node

export type StoryBeatNode = Node<
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
  const data = props.data;
  const {
    storyBeat,
    characters,
    storyBeats,
    createNewDialogue,
    createNewChoice,
    updateStoryBeat,
    deleteStoryBeat,
    deleteDialogue,
    deleteChoice,
  } = data;

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="border p-3 bg-white">
        <h4 className="mb-2">{storyBeat.id}</h4>
        <button
          onClick={() => createNewDialogue(storyBeat.id)}
          className="border p-2 mb-2"
        >
          Add Dialogue
        </button>
        <div className="flex flex-col gap-2">
          {storyBeat.dialogue.map((dialogue, index) => (
            <DialogueCell
              key={dialogue.id}
              dialogue={dialogue}
              storyBeat={storyBeat}
              updateStoryBeat={updateStoryBeat}
              index={index}
              characters={characters}
              deleteDialogue={deleteDialogue}
            />
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default StoryBeatNode;
