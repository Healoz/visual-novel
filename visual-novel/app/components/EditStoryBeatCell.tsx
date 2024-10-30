import React, { FC } from "react";
import { Character, StoryBeat } from "../types";
import DialogueCell from "./DialogueCell";
import ChoiceCell from "./ChoiceCell";

interface EditStoryBeatCellProps {
  storyBeat: StoryBeat;
  createNewDialogue: (storyBeatId: string) => void;
  createNewChoice: (storyBeatId: string) => void;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  characters: Character[];
  deleteStoryBeat: (id: string) => void;
  storyBeats: StoryBeat[];
  deleteDialogue: (storyBeat: StoryBeat, dialogueId: string) => void;
  deleteChoice: (storyBeat: StoryBeat, choiceId: string) => void;
}

const StoryBeatCell: FC<EditStoryBeatCellProps> = ({
  storyBeat,
  createNewDialogue,
  createNewChoice,
  updateStoryBeat,
  characters,
  deleteStoryBeat,
  storyBeats,
  deleteDialogue,
  deleteChoice,
}) => {
  const dialogueContent = storyBeat.dialogue.map((singleDialogue, index) => (
    <DialogueCell
      dialogue={singleDialogue}
      storyBeat={storyBeat}
      updateStoryBeat={updateStoryBeat}
      index={index}
      characters={characters}
      deleteDialogue={deleteDialogue}
    ></DialogueCell>
  ));

  const choiceContent = storyBeat.choices.map((choice, index) => (
    <ChoiceCell
      choice={choice}
      updateStoryBeat={updateStoryBeat}
      index={index}
      storyBeat={storyBeat}
      storyBeats={storyBeats}
      deleteChoice={deleteChoice}
    />
  ));

  return (
    <div
      key={storyBeat.id}
      className="border p-3 gap-3 flex flex-col align-baseline"
    >
      <h2>Id: {storyBeat.id}</h2>
      <button
        className="border flex w-20"
        onClick={() => deleteStoryBeat(storyBeat.id)}
      >
        Delete StoryBeat
      </button>
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
      <div>{choiceContent}</div>
    </div>
  );
};

export default StoryBeatCell;
