import { useState } from "react";
import { Header } from "./Components/Header/Header";
import { Table } from "./Components/Table/Table";
import { UserInput } from "./Components/UserInput/UserInput";

let value;

function App() {
  const [userInput, setUserInput] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
    //Check if the object is fully filled
    value = Object.values(userInput).every((el) => el !== ``);
  };

  const yearlyData = []; // per-year results
  if (value) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  //Check if reset button is clicked
  const renderText = function (input) {
    setIsClicked(input);
  };

  return (
    <div>
      <Header />
      <UserInput getUserInput={calculateHandler} checkIsClicked={renderText} />
      {!value || isClicked ? (
        <p
          style={{
            textAlign: "center",
            fontSize: `2rem`,
            color: `#910000`,
            fontWeight: `bold`,
          }}
        >
          Fill every field
        </p>
      ) : null}
      {value && !isClicked ? (
        <Table
          items={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      ) : null}
    </div>
  );
}

export default App;
