import React, { useState , useEffect} from "react";
import * as tf from "@tensorflow/tfjs";
import Board from "./Board";
import "./DigitRecogniser.css";
// import * as tfvis from "@tensorflow/tfjs-vis";

export default function DigitRecogniser() {
  const [probabilities, setProbabilities] = useState<number[]>(
    Array(10).fill(0.33)
  );
  const [model, setModel] = useState<Promise<tf.LayersModel> | null>(null);

  // useEffect(()=>{
  //   async function loadMnistModel() {
  //     console.log("Loading a pre-trained MNIST model...");

  //     try {
  //       const model = await tf.loadLayersModel(
  //         "https://tfhub.dev/google/tfjs-model/mnist/classification/1/default/1/model.json"
  //       );
  //       console.log("MNIST model loaded!");
  //       return model;
  //     } catch (error) {
  //       console.error("Error loading model:", error);
  //     }
  //   }

  //   const mnist = loadMnistModel();
  //   setModel(mnist);

  // },[])

  function guessNumber(){
    
  }

  return (
    <div className="main-container">
      <Board />
      <div className="guess-container">
        <div className="guess-title">
          These are the probabilities of every number:-
        </div>
        <div className="guess-bars">
          {probabilities.map((probability, index) => {
            return (
              <ProbabilityBar
                key={index}
                number={index}
                probability={probability}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

type ProbabilityBarArgs = {
  number: number;
  probability: number;
};

function ProbabilityBar({ number, probability }: ProbabilityBarArgs) {
  return (
    <div className="probabilty-container">
      {number}
      <div className="probability-bar">
        <div
          style={{ height: `${probability * 100}%`, backgroundColor: "grey" }}
        ></div>
      </div>
      {probability * 100}%
    </div>
  );
}
