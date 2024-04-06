#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

async function main() {
  console.log(chalk.red.bold("Currency Converter"));

  const conversionRates: { [key: string]: number } = {
    
    USD: 1,
    INR: 83,
    AED: 4,
    PKR: 278,
  };

  const amount = await inquirer.prompt({
    name: "amount",
    type: "input",
    message: "Enter the amount to convert:",
    validate: function (input) {
      return !isNaN(input) && parseFloat(input) >= 0;
    },
  });

  const fromCurrency = await inquirer.prompt({
    name: "fromCurrency",
    type: "list",
    message: "Select the currency to convert from:",
    choices: Object.keys(conversionRates),
  });

  const toCurrency = await inquirer.prompt({
    name: "toCurrency",
    type: "list",
    message: "Select the currency to convert to:",
    choices: Object.keys(conversionRates),
  });


  const convertedAmount =
    (parseFloat(amount.amount) / conversionRates[fromCurrency.fromCurrency]) *
    conversionRates[toCurrency.toCurrency];

  console.log(
    chalk.greenBright(
      `${amount.amount} ${
        fromCurrency.fromCurrency
      } is approximately ${convertedAmount.toFixed(2)} ${
        toCurrency.toCurrency
      }`
    )
  );
}

main();