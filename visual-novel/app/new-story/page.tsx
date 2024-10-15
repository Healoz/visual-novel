"use client";
import { useState } from "react";
import PageContainer from "../components/PageContainer";
import { Choice, Dialogue, Story, StoryBeat } from "../types";
import { v4 as uuidv4 } from "uuid";
import StoryBeatCell from "../components/StoryBeatCell";

export default function StoryEditorPage() {
  const [storyBeats, setStoryBeats] = useState<StoryBeat[]>([]);

  // Functions for creating and editing storybeats
  const updateStoryBeat = (
    storyBeatId: string,
    updatedStoryBeat: StoryBeat
  ) => {
    setStoryBeats((prevStoryBeats) =>
      prevStoryBeats.map((storyBeat) =>
        storyBeat.id === storyBeatId ? updatedStoryBeat : storyBeat
      )
    );
  };

  const createNewStoryBeat = () => {
    const newStoryBeat: StoryBeat = {
      id: uuidv4(),
      dialogue: [],
      choices: [],
    };

    setStoryBeats([...storyBeats, newStoryBeat]);
  };

  // Creates a blank Choice
  const createNewChoice = (storyBeatId: string) => {
    const newChoice: Choice = {
      id: uuidv4(),
      label: "",
      nextBeatId: "",
    };

    setStoryBeats((prevStoryBeats) =>
      prevStoryBeats.map((storyBeat) => {
        if (storyBeat.id === storyBeatId) {
          return {
            ...storyBeat,
            choices: [...storyBeat.choices, newChoice],
          };
        }
        return storyBeat;
      })
    );
  };

  // Creates a blank Dialogue
  const createNewDialogue = (storyBeatId: string) => {
    const newDialogue: Dialogue = {
      id: uuidv4(),
      line: "",
    };

    setStoryBeats((prevStoryBeats) =>
      prevStoryBeats.map((storyBeat) => {
        if (storyBeat.id === storyBeatId) {
          return {
            ...storyBeat,
            dialogue: [...storyBeat.dialogue, newDialogue],
          };
        }
        return storyBeat;
      })
    );
  };

  const storyBeatsContent = storyBeats.map((storyBeat) => (
    <StoryBeatCell
      storyBeat={storyBeat}
      createNewChoice={createNewChoice}
      createNewDialogue={createNewDialogue}
      updateStoryBeat={updateStoryBeat}
    ></StoryBeatCell>
  ));

  return (
    <PageContainer>
      <h1 className="text-3xl">Create new story</h1>
      <input placeholder="story name" className="border p-2"></input>
      <section>
        <button className="border p-2 mb-4" onClick={createNewStoryBeat}>
          New story beat
        </button>
        <div>{storyBeatsContent}</div>
      </section>
    </PageContainer>
  );
}
