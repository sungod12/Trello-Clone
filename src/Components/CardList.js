import React, { useState } from "react";
import "../css/index.css";
import { Draggable } from "react-beautiful-dnd";
// console.log(tempCards);

const Card = ({ name, isToggled, idx, setToggledCard, dragHandleProps }) => {
  // console.log(index);
  return (
    <div className="card" {...dragHandleProps}>
      <input
        type="text"
        hidden={!isToggled}
        onMouseLeave={() => setToggledCard("")}
        defaultValue={name}
      />
      <p
        onClick={() => setToggledCard(idx)}
        hidden={isToggled}
        className="card-name"
      >
        {name}
      </p>
    </div>
  );
};

const CardList = ({ cards, cardName }) => {
  const [toggledCard, setToggledCard] = useState("");

  return cards.map((val, idx) => {
    const cardID = JSON.stringify(val._id);
    const index = val.index;
    const isToggled = idx === toggledCard;
    return (
      <Draggable key={cardID} draggableId={cardID} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <Card
              name={val.name}
              isToggled={isToggled}
              setToggledCard={setToggledCard}
              dragHandleProps={provided.dragHandleProps}
            />
          </div>
        )}
      </Draggable>
    );
  });
};

export default CardList;
