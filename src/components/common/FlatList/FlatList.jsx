import React from "react";

export default function FlatList({ list, renderItem, renderWhenEmpty }) {
  if (!list || list.length === 0) {
    return renderWhenEmpty();
  }

  return (
    <div>
      {list.map((listItem, index, array) => renderItem(listItem, index))}
    </div>
  );
}