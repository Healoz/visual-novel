"use client";
import { useState } from "react";
import PageContainer from "../components/PageContainer";
import { Character, Choice, Dialogue, Story, StoryBeat } from "../types";
import { v4 as uuidv4 } from "uuid";
import StoryBeatCell from "../components/StoryBeatCell";

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
    <StoryBeatCell
      storyBeat={storyBeat}
      createNewChoice={createNewChoice}
      createNewDialogue={createNewDialogue}
      updateStoryBeat={updateStoryBeat}
      characters={story.characters}
    ></StoryBeatCell>
  ));

  const charactersContent = story.characters.map((character) => (
    <div style={{ color: character.color }}>{character.name}</div>
  ));

  return (
    <PageContainer>
      <h1 className="text-3xl">Create new story</h1>
      <input placeholder="story name" className="border p-2"></input>
      <section>
        <h2>Characters</h2>
        <input
          placeholder="character name"
          className="border p-2"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          style={{ color: characterColor }}
        ></input>
        <input
          type="color"
          value={characterColor}
          onChange={(e) => setCharacterColor(e.target.value)}
        ></input>
        <button className="border p-2" onClick={handleCreateCharacter}>
          Create character
        </button>
        {story.characters.length >= 1 ? (
          <div className="flex gap-2">{charactersContent}</div>
        ) : (
          <p>There are no characters, create one</p>
        )}
      </section>
      <section>
        <button className="border p-2 mb-4" onClick={createNewStoryBeat}>
          New story beat
        </button>

        <div>{storyBeatsContent}</div>
      </section>
    </PageContainer>
  );
}
