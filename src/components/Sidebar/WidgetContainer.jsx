import React from "react";

const WidgetContainer = ({ extraClass, children }) => (
  <aside className={`${extraClass} padding-top-2`}>
    {children}
  </aside>
)

export default WidgetContainer;