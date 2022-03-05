import chalk from "chalk";
import boxen from "boxen";
import { writeFileSync } from "fs";
import { join } from "path";

// Define options for Boxen
const options: boxen.Options = {
    padding: 1,
    margin: 1,
    borderStyle: "round"
};

const data = {
    name: chalk.white("               Yu Otsubo"),
    handle: chalk.white("tubone24"),
    work: chalk.white("FullCycle Developer"),
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("meitante1conan"),
    npm: chalk.gray("https://npmjs.com/") + chalk.red("~tubone24"),
    pypi: chalk.gray("https://pypi.org/user/") + chalk.yellow("tubone24"),
    github: chalk.gray("https://github.com/") + chalk.green("tubone24"),
    wantedly: chalk.gray("https://www.wantedly.com/id/") + chalk.blueBright("yu_otsubo"),
    portfolio: chalk.cyan("https://portfolio.tubone-project24.xyz"),
    blog: chalk.cyan("https://blog.tubone-project24.xyz"),
    npx: chalk.red("npx") + " " + chalk.white("tubone24"),
    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelnpm: chalk.white.bold("        npm:"),
    labelpypi: chalk.white.bold("       PyPI:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelWantedly: chalk.white.bold("   Wantedly:"),
    labelPortfolio: chalk.white.bold("  Portfolio:"),
    labelBlog: chalk.white.bold("       Blog:"),
    labelCard: chalk.white.bold("       Card:")
};

const newline = "\n";
const heading = `${data.name} / ${data.handle}`;
const working = `${data.labelWork}  ${data.work}`;
const twittering = `${data.labelTwitter}  ${data.twitter}`;
const npming = `${data.labelnpm}  ${data.npm}`;
const pyping = `${data.labelpypi}  ${data.pypi}`;
const githubing = `${data.labelGitHub}  ${data.github}`;
const wantedlining = `${data.labelWantedly}  ${data.wantedly}`;
const portfolio = `${data.labelPortfolio}  ${data.portfolio}`;
const bloging = `${data.labelBlog}  ${data.blog}`;
const carding = `${data.labelCard}  ${data.npx}`;

const output = heading +
               newline + newline +
               working + newline + newline +
               twittering + newline +
               npming + newline +
               pyping + newline +
               githubing + newline +
               wantedlining + newline +
               portfolio + newline +
               bloging + newline + newline +
               carding;

writeFileSync(join(__dirname, "../bin/output"), chalk.green(boxen(output, options)));
