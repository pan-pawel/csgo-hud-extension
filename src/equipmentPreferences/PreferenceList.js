import React, { useState } from "react";
import Card from "./Card";
import update from "immutability-helper";
const style = {
  width: 400
};
const PreferenceList = ({ preferenceList, updatePreference }) => {
  {
    const [cards, setCards] = useState(preferenceList);
    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        })
      );
    };
    updatePreference(cards);
    return (
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        ))}
      </div>
    );
  }
};
export default PreferenceList;
