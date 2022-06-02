import { ReactNode } from "react";

export interface FlatListProps {
  list: any[];
  renderItem: (listItem: any, index: number, array: any[]) => ReactNode;
  renderWhenEmpty: () => ReactNode;
}

export default function FlatList({
  list,
  renderItem,
  renderWhenEmpty,
}: FlatListProps) {
  if (!list || list.length === 0) {
    return renderWhenEmpty();
  }

  return (
    <div>
      {list.map((listItem, index, array) => renderItem(listItem, index, array))}
    </div>
  );
}
