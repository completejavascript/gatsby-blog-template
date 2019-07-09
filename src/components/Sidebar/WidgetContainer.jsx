import React from "react";

const WidgetContainer = ({ extraClass = "", children }) => (
  <aside className={`${extraClass} padding-top padding-bottom`}>
    {children}
  </aside>
)

export default WidgetContainer;