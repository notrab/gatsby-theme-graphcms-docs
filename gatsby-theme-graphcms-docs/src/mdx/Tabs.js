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
    <div className=" rounded">
      <div className="space-x-3">
        {items.current.map((item, index) => {
          const isActive = item === activeItem;

          return (
            <button
              key={index}
              onClick={() => setActiveItem(item)}
              className={cc([
                "appearance-none py-1 px-2 hover:text-primary-500 dark:hover:text-white",
                {
                  "text-primary-500 dark:text-white hover:text-primary-500 rounded bg-primary-100 dark:bg-primary-700 dark:hover:text-white": isActive,
                },
              ])}
            >
              {item.props.label}
            </button>
          );
        })}
      </div>
      {items.current.map((item, index) => {
        const isActive = item === activeItem;

        return (
          <div key={index} className={cc({ hidden: !isActive })}>
            {item.props.children}
          </div>
        );
      })}
    </div>
  );
}

export { Tabs, TabsItem };
