import React, { FC } from "react";
import { Story } from "../types";

interface CharacterDisplayProps {
  characterName: string;
  characterColor: string;
  handleCreateCharacter: () => void;
  setCharacterColor: (color: string) => void;
  setCharacterName: (name: string) => void;
  story: Story;
}

const CharacterDisplay: FC<CharacterDisplayProps> = ({
  story,
  characterColor,
  characterName,
  handleCreateCharacter,
  setCharacterName,
  setCharacterColor,
}) => {
  const charactersContent = story.characters.map((character) => (
    <div style={{ color: character.color }}>{character.name}</div>
  ));

  return (
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
  );
};

export default CharacterDisplay;
