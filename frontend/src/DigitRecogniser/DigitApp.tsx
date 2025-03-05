import { Route } from "react-router";
import React from "react";
import DigitRecogniser from "./DigitRecogniser";

export default function DigitApp() {
  return (
    <React.Fragment>
      <Route path="/digitRecognizer" element={<DigitRecogniser />} />
    </React.Fragment>
  );
}
