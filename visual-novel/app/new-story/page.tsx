"use client";
import { useState } from "react";
import PageContainer from "../components/PageContainer";
import { Character, Choice, Dialogue, Story, StoryBeat } from "../types";
import { v4 as uuidv4 } from "uuid";
import EditStoryBeatCell from "../components/EditStoryBeatCell";
import CharacterDisplay from "../components/CharacterDisplay";

export default function StoryEditorPage() {
  const [story, setStory] = useState<Story>({
    title: "",
    blurb: "",
    characters: [],
    storyBeats: [],
  });

  const [characterName, setCharacterName] = useState("");
  const [characterColor, setCharacterColor] = useState("#000000"); // default color

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

  const deleteStoryBeat = (id: string) => {
    setStory((prevStory) => ({
      ...prevStory,
      storyBeats: prevStory.storyBeats.filter(
        (storyBeat) => storyBeat.id !== id
      ),
    }));
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

  const handleCreateCharacter = () => {
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

  const storyBeatsContent = story.storyBeats.map((storyBeat) => (
    <EditStoryBeatCell
      storyBeat={storyBeat}
      createNewChoice={createNewChoice}
      createNewDialogue={createNewDialogue}
      updateStoryBeat={updateStoryBeat}
      characters={story.characters}
      deleteStoryBeat={deleteStoryBeat}
      storyBeats={story.storyBeats}
    ></EditStoryBeatCell>
  ));

  return (
    <PageContainer>
      <h1 className="text-3xl">Create new story</h1>
      <input placeholder="story name" className="border p-2"></input>
      <CharacterDisplay
        story={story}
        characterColor={characterColor}
        characterName={characterName}
        handleCreateCharacter={handleCreateCharacter}
        setCharacterName={setCharacterName}
        setCharacterColor={setCharacterColor}
      />
      <section>
        <button className="border p-2 mb-4" onClick={createNewStoryBeat}>
          New story beat
        </button>
        <div>{storyBeatsContent}</div>
      </section>
    </PageContainer>
  );
}
