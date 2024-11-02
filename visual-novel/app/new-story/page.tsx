"use client";
import { useState } from "react";
import PageContainer from "../components/PageContainer";
import { Character, Choice, Dialogue, Story, StoryBeat } from "../types";
import { v4 as uuidv4 } from "uuid";
import EditStoryBeatCell from "../components/EditStoryBeatCell";
import CharacterDisplay from "../components/CharacterDisplay";
import storyData from "../data/storyData.json";
import { useStory } from "../utils/StoryContext";

export default function StoryEditorPage() {
  // const [story, setStory] = useState<Story>({
  //   title: "",
  //   blurb: "",
  //   characters: [],
  //   storyBeats: [],
  // });

  // const [story, setStory] = useState<Story>(storyData);

  const [characterName, setCharacterName] = useState("");
  const [characterColor, setCharacterColor] = useState("#000000"); // default color

  const {
    story,
    setStory,
    storyBeats,
    characters,
    createNewStoryBeat,
    updateStoryBeat,
    deleteStoryBeat,
    createNewDialogue,
    deleteDialogue,
    createNewChoice,
    deleteChoice,
    handleCreateCharacter,
  } = useStory();

  const storyBeatsContent = story.storyBeats.map((storyBeat) => (
    <EditStoryBeatCell
      storyBeat={storyBeat}
      createNewChoice={createNewChoice}
      createNewDialogue={createNewDialogue}
      updateStoryBeat={updateStoryBeat}
      characters={story.characters}
      deleteStoryBeat={deleteStoryBeat}
      deleteDialogue={deleteDialogue}
      storyBeats={story.storyBeats}
      deleteChoice={deleteChoice}
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
        handleCreateCharacter={() =>
          handleCreateCharacter(
            characterName,
            characterColor,
            setCharacterName,
            setCharacterColor
          )
        }
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
