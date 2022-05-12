import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { decodeGotoUrl } from "../utils/gotoUrlHelper";
import { affiliateProgram } from "../../data/affiliate";

export default function GotoPage({ location }) {
  useEffect(() => {
    const target = decodeGotoUrl(location.search);
    const options = {
      replace: true,
    };

    if (!target) {
      navigate("/", options);
      return;
    }

    const url = affiliateProgram[target];
    if (!url) {
      navigate("/", options);
      return;
    }

    navigate(url, options);
  }, []);

  return <div></div>;
}
