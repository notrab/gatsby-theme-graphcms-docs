import React, { useEffect, useRef, useState } from "react";
import cc from "classcat";

function TabsItem() {
  return null;
}

function Tabs({ children }) {
  const items = useRef(
    React.Children.toArray(children).filter(
      (i) => i.props.mdxType === "TabsItem"
    )
  );
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    if (items) {
      const [firstItem] = items.current;

      setActiveItem(firstItem);
    }
  }, []);

  if (!(items || items.length)) return null;

  return (
    <div>
      <ul>
        {items.current.map((item) => (
          <li>
            <button onClick={() => setActiveItem(item)}>
              {item.props.label}
            </button>
          </li>
        ))}
      </ul>
      {items.current.map((item) => {
        const isActive = item === activeItem;

        return (
          <div className={cc({ hidden: !isActive })}>{item.props.children}</div>
        );
      })}
    </div>
  );
}

export { Tabs, TabsItem };
