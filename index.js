import chalk from 'chalk';
import {exec} from "child_process"
import {formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set} from 'date-fns'
import { compareAsc, } from 'date-fns'
import util from 'util'
import fs from 'fs/promises'
import {Command} from 'commander';


const asyncExec = util.promisify(exec);

const {stdout: gitVersion,} = await asyncExec('git --version');
console.log(`git version: ${gitVersion}`);

console.log(chalk.blue('Alisiia Ryzhykova'))


const first = 'Alisiia'
const last = 'Ryzhykova'

const name = `${chalk.blue(first)} ${chalk.blue(last)}`

console.log(`npm & node: ${process.env.npm_config_user_agent}`)


//current date
console.log(format(new Date(), 'yyyy-MM-dd'))


const startOfCourse = new Date(2023, 0, 31)
const result = formatDistanceToNow(
    startOfCourse
)

console.log(result)

const dates = [
    new Date(),
  ]
  dates.sort(compareAsc)

console.log(dates)


const fileContent = `
name: ${first} ${last}
npm & node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}
`;

await fs.writeFile('index.md', fileContent);


const program = new Command();

/*
program
  .option('--date')
  
  program.parse();

  const options = program.opts();
  const limit = options.first ? 1 : undefined;

  console.log(options);
  console.log(program.args);

  */

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0})

console.log('isToday', isToday(dateSentAsArgument))
console.log('isAfter', isAfter(dateSentAsArgument, currentDate))
console.log('isBefore', isBefore(dateSentAsArgument, currentDate))



