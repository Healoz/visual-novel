import React, { FC } from "react";
import { Character, Dialogue, StoryBeat } from "../types";

interface DialogueCellProps {
  dialogue: Dialogue;
  storyBeat: StoryBeat;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  index: number;
  characters: Character[];
  deleteDialogue: (storyBeat: StoryBeat, dialogueId: string) => void;
}

const DialogueCell: FC<DialogueCellProps> = ({
  dialogue,
  updateStoryBeat,
  storyBeat,
  index,
  characters,
  deleteDialogue,
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

  // handle character change
  const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedDialogue = [...storyBeat.dialogue];
    const selectedCharacterName = e.target.value;

    // Check if narrator is selected
    if (selectedCharacterName === "narrator") {
      updatedDialogue[index] = {
        ...dialogue,
        character: undefined, // No character associated with narrator
      };
    } else {
      const character = characters.find(
        (character) => character.name === selectedCharacterName
      );

      if (character) {
        updatedDialogue[index] = {
          ...dialogue,
          character: character, // Store the whole character object
        };
      }
    }

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

  const characterOptions = characters.map((character) => (
    <option
      key={character.id}
      style={{ color: character.color }}
      value={character.name}
    >
      {character.name}
    </option>
  ));

  return (
    <div key={dialogue.id} className="flex gap-3">
      <div className="flex flex-col">
        <button
          className="w-20 border nodrag"
          onClick={() => moveDialogueUp(index)}
        >
          ^
        </button>
        <button
          className="w-20 border nodrag"
          onClick={() => moveDialogueDown(index)}
        >
          v
        </button>
      </div>
      <div className="flex flex-col w-full">
        <select
          id="character-speaking"
          name="character-speaking"
          className="border nodrag"
          onChange={handleCharacterChange}
          value={dialogue.character ? dialogue.character.name : "narrator"} // Set value to narrator if no character is selected
          style={{ color: dialogue.character?.color }}
        >
          <option value="" disabled>
            Select a character
          </option>
          <option value="narrator" style={{ color: "#000" }}>
            Narrator
          </option>
          {characterOptions}
        </select>
        <textarea
          className="border flex p-2 nodrag"
          value={dialogue.line || ""}
          onChange={handleDialogueChange}
          placeholder="dialogue"
        ></textarea>
      </div>
      <div>
        <button
          className="border p-1"
          onClick={() => deleteDialogue(storyBeat, dialogue.id)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default DialogueCell;
