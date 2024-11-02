"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { StoryBeat, Character, Story, Choice, Dialogue } from "../types";
import storyData from "../data/storyData.json";
import { v4 as uuidv4 } from "uuid";

interface StoryContextType {
  story: Story;
  setStory: React.Dispatch<React.SetStateAction<Story>>;
  storyBeats: StoryBeat[];
  characters: Character[];
  createNewStoryBeat: () => void;
  deleteStoryBeat: (id: string) => void;
  updateStoryBeat: (storyBeatId: string, updatedStoryBeat: StoryBeat) => void;
  createNewDialogue: (storyBeatId: string) => void;
  deleteDialogue: (storyBeat: StoryBeat, dialogueId: string) => void;
  createNewChoice: (storyBeatId: string) => void;
  deleteChoice: (storyBeat: StoryBeat, choiceId: string) => void;
  handleCreateCharacter: (
    characterName: string,
    characterColor: string,
    setCharacterName: (name: string) => void,
    setCharacterColor: (color: string) => void
  ) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [story, setStory] = useState<Story>(storyData);

  // Functions for creating and editing storybeats
  const updateStoryBeat = (
    storyBeatId: string,
    updatedStoryBeat: StoryBeat
  ) => {
    const updatedStoryBeats = story.storyBeats.map((storyBeat) =>
      storyBeat.id === storyBeatId ? updatedStoryBeat : storyBeat
    );
    setStory({ ...story, storyBeats: updatedStoryBeats });
  };

  const createNewStoryBeat = () => {
    const newStoryBeat: StoryBeat = {
      id: uuidv4(),
      dialogue: [],
      choices: [],
    };

    setStory({ ...story, storyBeats: [...story.storyBeats, newStoryBeat] });
  };

  // delete storyBeat
  const deleteStoryBeat = (id: string) => {
    setStory((prevStory) => ({
      ...prevStory,
      storyBeats: prevStory.storyBeats.filter(
        (storyBeat) => storyBeat.id !== id
      ),
    }));
  };

  // delete dialogue
  const deleteDialogue = (storyBeat: StoryBeat, dialogueId: string) => {
    const updatedDialogue = storyBeat.dialogue.filter(
      (singleDialogue) => singleDialogue.id !== dialogueId
    );

    updateStoryBeat(storyBeat.id, {
      ...storyBeat,
      dialogue: updatedDialogue,
    });
  };

  // delete choice
  const deleteChoice = (storyBeat: StoryBeat, choiceId: string) => {
    const updatedChoices = storyBeat.choices.filter(
      (choice) => choice.id !== choiceId
    );

    updateStoryBeat(storyBeat.id, {
      ...storyBeat,
      choices: updatedChoices,
    });
  };

  // Creates a blank Choice
  const createNewChoice = (storyBeatId: string) => {
    const newChoice: Choice = {
      id: uuidv4(),
      label: "",
      nextBeatId: "",
    };

    const updatedStoryBeats = story.storyBeats.map((storyBeat) => {
      if (storyBeat.id === storyBeatId) {
        return {
          ...storyBeat,
          choices: [...storyBeat.choices, newChoice],
        };
      }
      return storyBeat;
    });

    setStory({ ...story, storyBeats: updatedStoryBeats });
  };

  // Creates a blank Dialogue
  const createNewDialogue = (storyBeatId: string) => {
    const newDialogue: Dialogue = {
      id: uuidv4(),
      line: "",
    };

    const updatedStoryBeats = story.storyBeats.map((storyBeat) => {
      if (storyBeat.id === storyBeatId) {
        return {
          ...storyBeat,
          dialogue: [...storyBeat.dialogue, newDialogue],
        };
      }
      return storyBeat;
    });

    setStory({ ...story, storyBeats: updatedStoryBeats });
  };

  const handleCreateCharacter = (
    characterName: string,
    characterColor: string,
    setCharacterName: (name: string) => void,
    setCharacterColor: (color: string) => void
  ) => {
    // dont allow empty names
    if (characterName.trim() === "") return;

    const newCharacter: Character = {
      id: uuidv4(),
      name: characterName,
      color: characterColor,
    };

    setStory({ ...story, characters: [...story.characters, newCharacter] });

    // reset inputs
    setCharacterName("");
    setCharacterColor("#000000");
  };

  const value = {
    story,
    setStory,
    storyBeats: story.storyBeats,
    characters: story.characters,
    updateStoryBeat,
    createNewStoryBeat,
    deleteStoryBeat,
    deleteDialogue,
    deleteChoice,
    createNewChoice,
    createNewDialogue,
    handleCreateCharacter,
  };

  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
