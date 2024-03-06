import chalk from "chalk";
import boxen, { Options, BorderStyle } from "boxen";
import { writeFileSync } from "fs";
import { join } from "path";

// Define options for Boxen
const options: Options = {
    padding: 1,
    margin: 1,
    borderStyle: BorderStyle.Round
};

const data = {
    name: chalk.white("               Yu Otsubo"),
    handle: chalk.white("tubone24"),
    work: chalk.white("FullCycle Developer") + chalk.cyan("@") + chalk.greenBright("KAG"),
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("meitante1conan"),
    npm: chalk.gray("https://npmjs.com/") + chalk.red("~tubone24"),
    pypi: chalk.gray("https://pypi.org/user/") + chalk.yellow("tubone24"),
    github: chalk.gray("https://github.com/") + chalk.green("tubone24"),
    facebook: chalk.gray("https://www.facebook.com/") + chalk.blueBright("yu.otsubo"),
    portfolio: chalk.cyan("https://portfolio.tubone-project24.xyz"),
    blog: chalk.cyan("https://blog.tubone-project24.xyz"),
    contact: chalk.cyan("https://portfolio.tubone-project24.xyz/#contact"),
    npx: chalk.red("npx") + " " + chalk.white("tubone24"),
    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelnpm: chalk.white.bold("        npm:"),
    labelpypi: chalk.white.bold("       PyPI:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelFacebook: chalk.white.bold("   Facebook:"),
    labelPortfolio: chalk.white.bold("  Portfolio:"),
    labelBlog: chalk.white.bold("       Blog:"),
    labelContact: chalk.white.bold("    Contact:"),
    labelCard: chalk.white.bold("       Card:")
};

const newline = "\n";
const heading = `${data.name} / ${data.handle}`;
const working = `${data.labelWork}  ${data.work}`;
const twittering = `${data.labelTwitter}  ${data.twitter}`;
const npming = `${data.labelnpm}  ${data.npm}`;
const pyping = `${data.labelpypi}  ${data.pypi}`;
const githubing = `${data.labelGitHub}  ${data.github}`;
const facebooking = `${data.labelFacebook}  ${data.facebook}`;
const portfolio = `${data.labelPortfolio}  ${data.portfolio}`;
const bloging = `${data.labelBlog}  ${data.blog}`;
const contact = `${data.labelContact}  ${data.contact}`;
const carding = `${data.labelCard}  ${data.npx}`;

const output = heading +
               newline + newline +
               working + newline + newline +
               twittering + newline +
               facebooking + newline +
               npming + newline +
               pyping + newline +
               githubing + newline +
               portfolio + newline +
               bloging + newline +
               contact + newline + newline +
               carding;

writeFileSync(join(__dirname, "../bin/output"), chalk.green(boxen(output, options)));
