import React, { FC } from "react";
import { Character, StoryBeat } from "../types";
import DialogueCell from "./DialogueCell";

interface StoryBeatCellProps {
  storyBeat: StoryBeat;
  createNewDialogue: (storyBeatId: string) => void;
  createNewChoice: (storyBeatId: string) => void;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  characters: Character[];
}

const StoryBeatCell: FC<StoryBeatCellProps> = ({
  storyBeat,
  createNewDialogue,
  createNewChoice,
  updateStoryBeat,
  characters,
}) => {
  const dialogueContent = storyBeat.dialogue.map((singleDialogue, index) => (
    <DialogueCell
      dialogue={singleDialogue}
      storyBeat={storyBeat}
      updateStoryBeat={updateStoryBeat}
      index={index}
      characters={characters}
    ></DialogueCell>
  ));

  return (
    <div
      key={storyBeat.id}
      className="border p-3 gap-3 flex flex-col align-baseline"
    >
      <button
        className="border flex w-20"
        onClick={() => createNewDialogue(storyBeat.id)}
      >
        New dialogue
      </button>
      <div className="flex flex-col gap-4">{dialogueContent}</div>
      <button
        className="border flex w-20"
        onClick={() => createNewChoice(storyBeat.id)}
      >
        New choice
      </button>
    </div>
  );
};

export default StoryBeatCell;
