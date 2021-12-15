import React, { Component } from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { searchConfig } from "../../../data/config";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";

class WidgetSearch extends Component {
  render() {
    return (
      <>
        {searchConfig.hasSearch && (
          <WidgetContainer extraClass="search-container sidebar-widget">
            <WidgetTitle title={searchConfig.searchWidgetTitle} />
            <form className="margin-bottom-none" action="/search/" method="get">
              <div className="container-full row padding-none margin-bottom-none">
                <div className="padding-none padding-right-half col-xs-10">
                  <input
                    className="margin-bottom-none"
                    type="text"
                    name="q"
                    placeholder={searchConfig.searchWidgetPlaceHolder}
                    required
                    spellCheck="false"
                  />
                </div>
                <div className="padding-none padding-left-half col-xs-2">
                  <button type="submit" className="btn-search">
                    <FontAwesomeIcon className="icon-search color-white" />
                  </button>
                </div>
              </div>
            </form>
          </WidgetContainer>
        )}
      </>
    );
  }
}

export default WidgetSearch;
