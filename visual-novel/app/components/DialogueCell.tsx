import React, { FC } from "react";
import { Dialogue, StoryBeat } from "../types";

interface DialogueCellProps {
  dialogue: Dialogue;
  storyBeat: StoryBeat;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  index: number;
}

const DialogueCell: FC<DialogueCellProps> = ({
  dialogue,
  updateStoryBeat,
  storyBeat,
  index,
}) => {
  // handle dialogue change
  const handleDialogueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedDialogue = [...storyBeat.dialogue];
    updatedDialogue[index] = {
      ...dialogue,
      line: e.target.value,
    };

    updateStoryBeat(storyBeat.id, {
      ...storyBeat,
      dialogue: updatedDialogue,
    });
  };
  // moving dialogue up and down
  const moveDialogueUp = (index: number) => {
    if (index > 0) {
      const updatedDialogue = [...storyBeat.dialogue];
      [updatedDialogue[index - 1], updatedDialogue[index]] = [
        updatedDialogue[index],
        updatedDialogue[index - 1],
      ];
      updateStoryBeat(storyBeat.id, {
        ...storyBeat,
        dialogue: updatedDialogue,
      });
    }
  };

  // Function to move a dialogue down
  const moveDialogueDown = (index: number) => {
    if (index < storyBeat.dialogue.length - 1) {
      const updatedDialogue = [...storyBeat.dialogue];
      [updatedDialogue[index + 1], updatedDialogue[index]] = [
        updatedDialogue[index],
        updatedDialogue[index + 1],
      ];
      updateStoryBeat(storyBeat.id, {
        ...storyBeat,
        dialogue: updatedDialogue,
      });
    }
  };
  return (
    <div key={dialogue.id} className="  flex gap-3">
      <div className="flex flex-col">
        <button className="w-20 border" onClick={() => moveDialogueUp(index)}>
          ^
        </button>
        <button className="w-20 border" onClick={() => moveDialogueDown(index)}>
          v
        </button>
      </div>
      <div className="flex flex-col w-full">
        <select
          id="character-speaking"
          name="character-speaking"
          className="border"
        >
          <option value="" disabled selected>
            Select a character
          </option>
          <option value="narrator">Narrator</option>
          <option value="bob">Bob</option>
          <option value="jim">Jim</option>
        </select>
        <textarea
          className="border flex p-2"
          value={dialogue.line}
          onChange={handleDialogueChange}
          placeholder="dialogue"
        ></textarea>
      </div>
    </div>
  );
};

export default DialogueCell;
