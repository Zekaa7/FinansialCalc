import { useState } from "react";

const input = {
  "current-savings": "",
  "yearly-contribution": ``,
  "expected-return": ``,
  duration: ``,
};

export const UserInput = (props) => {
  const [user, setUser] = useState(input);
  const [isClicked, setIsClicked] = useState(true);

  const submitFormHandler = (e) => {
    e.preventDefault();
    props.getUserInput(user);
    props.checkIsClicked(!isClicked);
  };

  const inputChangeHandler = function (input, value) {
    setUser((prevValue) => {
      return {
        ...prevValue,
        [input]: +value,
      };
    });
  };

  const resetInputHandler = (e) => {
    e.preventDefault();
    setUser(input);

    props.checkIsClicked(isClicked);
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings (€)</label>
          <input
            onChange={(e) =>
              inputChangeHandler("current-savings", e.target.value)
            }
            type="number"
            id="current-savings"
            value={user["current-savings"]}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings (€)</label>
          <input
            onChange={(e) =>
              inputChangeHandler("yearly-contribution", e.target.value)
            }
            type="number"
            id="yearly-contribution"
            value={user["yearly-contribution"]}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(e) =>
              inputChangeHandler("expected-return", e.target.value)
            }
            type="number"
            id="expected-return"
            value={user["expected-return"]}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(e) => inputChangeHandler("duration", e.target.value)}
            type="number"
            id="duration"
            value={user.duration}
          />
        </p>
      </div>
      <p className="actions">
        <button onClick={resetInputHandler} type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};
