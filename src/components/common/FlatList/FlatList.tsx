import React, { ReactNode, ReactElement } from "react";

export interface FlatListProps {
  list: any[];
  renderItem: (listItem: any, index: number, array: any[]) => ReactNode;
  renderWhenEmpty: () => ReactElement;
}

export default function FlatList({
  list,
  renderItem,
  renderWhenEmpty,
}: FlatListProps): ReactElement  {
  if (!list || list.length === 0) {
    return renderWhenEmpty();
  }

  return (
    <div>
      {list.map((listItem, index, array) => renderItem(listItem, index, array))}
    </div>
  );
}
