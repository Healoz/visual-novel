// types.ts
export interface Character {
    id: string;
    name: string;
    color: string;
  }
  
  export interface Choice {
    id: string,
    label: string;
    nextBeatId: string; // ID of the next story beat to go to
  }

  export interface Dialogue {
    id: string;
    character?: Character;
    line: string;
  }
  
  export interface StoryBeat {
    id: string;
    dialogue: Dialogue[]; // Now contains multiple dialogues
    choices: Choice[];
  }
  
  export interface Story {
    title: string;
    blurb: string;
    storyBeats: StoryBeat[];
    characters: Character[];
  }
  