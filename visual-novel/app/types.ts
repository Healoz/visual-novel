// types.ts
export interface Character {
    name: string;
    color: string;
  }
  
  export interface Choice {
    label: string;
    nextBeatId: number; // ID of the next story beat to go to
  }

  export interface Dialogue {
    character?: Character;
    line: string;
  }
  
  export interface StoryBeat {
    id: number;
    dialogue: Dialogue[]; // Now contains multiple dialogues
    choices: Choice[];
  }
  
  export interface Story {
    title: string;
    blurb: string;
    storySequence: StoryBeat[];
  }
  