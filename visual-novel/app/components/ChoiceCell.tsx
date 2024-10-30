import React, { FC } from "react";
import { Choice, StoryBeat } from "../types";

interface ChoiceCellProps {
  choice: Choice;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  index: number;
  storyBeat: StoryBeat;
  storyBeats: StoryBeat[];
  deleteChoice: (storyBeat: StoryBeat, choiceId: string) => void;
}

const ChoiceCell: FC<ChoiceCellProps> = ({
  choice,
  storyBeat,
  updateStoryBeat,
  storyBeats,
  index,
  deleteChoice,
}) => {
  const handleChoiceLabelChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedChoices = [...storyBeat.choices];

    updatedChoices[index] = {
      ...updatedChoices[index],
      label: e.target.value,
    };

    updateStoryBeat(storyBeat.id, {
      ...storyBeat,
      choices: updatedChoices,
    });
  };

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

  return (
    <div key={choice.id} className="border flex gap-2 p-2">
      <label htmlFor={`choiceLabel-${choice.id}`}>Choice text</label>
      <textarea
        name={`choiceLabel-${choice.id}`}
        value={choice.label}
        className="border"
        onChange={(e) => handleChoiceLabelChange(e, index)}
      ></textarea>
      <select
        id="next-beat-id"
        value={choice.nextBeatId}
        name="net-beat-id"
        className="border"
      >
        {possibleNextBeatsContent}
      </select>
      <button
        className="border bg-red-400 p-1"
        onClick={() => deleteChoice(storyBeat, choice.id)}
      >
        X
      </button>
    </div>
  );
};

export default ChoiceCell;
