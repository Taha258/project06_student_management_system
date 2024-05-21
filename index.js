import inquirer from "inquirer";
import chalk from "chalk";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: chalk.green("Enter the student name:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "please enter a non-empty value.";
        }
    },
    {
        name: "courses",
        type: "list",
        message: chalk.redBright("Select the course to enrolle."),
        choices: ["MS.Office", "HTML", "Javascript", "Typescript", "Phython"]
    }
]);
const tutionFee = {
    "MS.Office": 2000,
    "HTML": 2500,
    "Javascript": 5000,
    "Typescript": 6000,
    "Phython": 8000
};
console.log(chalk.yellow(`\nTution Fees: ${tutionFee[answer.courses]}/-\n`)); //frfd
console.log(chalk.red.bold(`Balance:${myBalance}\n`));
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: chalk.gray("Please select payment Method"),
        choices: [chalk.blue("Bank Transfer"), chalk.green("Easypaisa"), chalk.red("Jazzcase")]
    },
    {
        name: "amount",
        type: "input",
        message: "Transfer Money:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    }
]);
console.log(`\n You have selected payment method ${paymentType.payment}\n`);
const tutionfees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionfees === paymentAmount) {
    console.log(chalk.green(`💐Congratulation,You have successfully enroll in ${answer.courses}.\n`));
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"]
        }
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.yellow("\n*********Status********\n"));
        console.log(chalk.greenBright(`Student Name : ${answer.student}`));
        console.log(chalk.greenBright(`Student ID : ${randomNumber}`));
        console.log(chalk.greenBright(`Course : ${answer.courses}`));
        console.log(chalk.greenBright(`Tution Fees paid : ${paymentAmount}`));
        console.log(chalk.greenBright(`Balance :${myBalance += paymentAmount}`));
    }
    else {
        console.log("\nExiting Student Management System\n");
    }
}
else {
    console.log(chalk.red("Invalid amount due to course\n"));
}
