import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { decodeGotoUrl } from "../utils/gotoUrlHelper";
import { affiliateProgram } from "../../data/affiliate";

export default function GotoPage({ location }) {
  useEffect(() => {
    const target = decodeGotoUrl(location.search);
    if (!target) {
      navigate("/");
      return;
    }

    const url = affiliateProgram[target];
    if (!url) {
      navigate("/");
      return;
    }

    navigate(url);
  }, []);

  return <div></div>;
}
