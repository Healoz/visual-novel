import React, { FC } from "react";
import { Character, StoryBeat } from "../types";
import DialogueCell from "./DialogueCell";

interface StoryBeatCellProps {
  storyBeat: StoryBeat;
  createNewDialogue: (storyBeatId: string) => void;
  createNewChoice: (storyBeatId: string) => void;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  characters: Character[];
  deleteStoryBeat: (id: string) => void;
  storyBeats: StoryBeat[];
}

const StoryBeatCell: FC<StoryBeatCellProps> = ({
  storyBeat,
  createNewDialogue,
  createNewChoice,
  updateStoryBeat,
  characters,
  deleteStoryBeat,
  storyBeats,
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

  const getPossibleStoryBeats = (thisStoryBeatId: string): StoryBeat[] => {
    return storyBeats.filter((storyBeat) => storyBeat.id !== thisStoryBeatId);
  };

  const possibleNextBeatsContent = getPossibleStoryBeats(storyBeat.id).map(
    (storyBeat) => (
      <option key={storyBeat.id} value={storyBeat.id}>
        {storyBeat.id}
      </option>
    )
  );

  const choiceContent = storyBeat.choices.map((choice, index) => (
    <div key={choice.id} className="border">
      <label htmlFor={`choiceLabel-${choice.id}`}>Choice text</label>
      <textarea name={`choiceLabel-${choice.id}`} className="border"></textarea>
      <select id="next-beat-id" name="net-beat-id" className="border">
        {possibleNextBeatsContent}
      </select>
    </div>
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
