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
    <div className="bg-primary-400 dark:bg-primary-900 rounded">
      <div className="-mb-6 bg-primary-300 rounded-t overflow-hidden">
        {items.current.map((item, index) => {
          const isActive = item === activeItem;

          return (
            <button
              key={index}
              onClick={() => setActiveItem(item)}
              className={cc([
                "appearance-none dark:hover:text-white focus:outline-none text-sm py-2 px-5 font-medium duration-100 ease-in-out transition-opacity",
                {
                  "text-white dark:text-white dark:hover:text-white bg-primary-400": isActive,
                },
                {
                  "text-white opacity-75 hover:opacity-100": !isActive,
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
