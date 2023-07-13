export const Table = (props) => {
  const formatNumber = new Intl.NumberFormat(`de-DE`, {
    style: `currency`,
    currency: `EUR`,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((input) => (
          <tr key={input.year}>
            <td>{input.year}</td>
            <td>{formatNumber.format(input.savingsEndOfYear)}</td>
            <td>{formatNumber.format(input.yearlyInterest)}</td>
            <td>
              {formatNumber.format(
                input.savingsEndOfYear -
                  props.initialInvestment -
                  input.yearlyContribution * input.year
              )}
            </td>
            <td>
              {formatNumber.format(
                props.initialInvestment + input.yearlyContribution * input.year
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
