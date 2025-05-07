#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importStar(require("boxen"));
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const options = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "white"
};
const shibaInuArt = `_                          ,-､
.:ヾ、            ,へ、__ /.  l
.    l            |   /    ｀ヽ|
>､__」       __ 人,/   tｯ  \`ｰ┐
\`  ー―‐r'   :.        _ .. ┴ '′
           ;     :.       \`ｰ-r┘
.           ;      :.､__ ＿ _ﾉ
         ;    ;.    └ー-rｨ
         ',.   ｀'    ,..  -ﾉ
/\`ｰ ､    }      ,:  __, /
       \` -{    ,r‐i´   l
           l    l   ',.   |
            |   |    '   |
            |.  l.    }  l_
             ',  ヽ、\`:､_,.)
             └-‐'`;
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const clearConsole = () => {
    process.stdout.write("\x1Bc");
};
const splitIntoLines = (text) => {
    return text.split("\n");
};
const drawBox = (content, borderColor = "white") => {
    return (0, boxen_1.default)(content, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: borderColor
    });
};
const generateColors = (count) => {
    const colors = [];
    for (let i = 1; i <= count; i++) {
        const baseColors = ["green", "yellow", "blue", "magenta", "cyan", "white", "red"];
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
};
const calculateMaxLineLength = (lines) => {
    let maxLength = 0;
    for (const line of lines) {
        if (line.length > maxLength) {
            maxLength = line.length;
        }
    }
    return maxLength;
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const outputContent = output;
            clearConsole();
            const lines = splitIntoLines(outputContent);
            const maxLineLength = calculateMaxLineLength(lines);
            const emptyBox = drawBox(" ".repeat(maxLineLength));
            clearConsole();
            console.log(emptyBox);
            yield sleep(100);
            let currentContent = "";
            let displayContent = "";
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.trim() === "") {
                    currentContent += line + "\n";
                    displayContent = currentContent;
                    clearConsole();
                    console.log(drawBox(displayContent));
                    yield sleep(50);
                    continue;
                }
                for (let j = 0; j < line.length; j++) {
                    currentContent += line[j];
                    displayContent = currentContent;
                    clearConsole();
                    console.log(drawBox(displayContent));
                    yield sleep(10);
                }
                currentContent += "\n";
                displayContent = currentContent;
                clearConsole();
                console.log(drawBox(displayContent));
                yield sleep(50);
            }
            const generateQRCode = () => {
                return new Promise((resolve) => {
                    let qrString = "";
                    qrcode_terminal_1.default.generate("https://portfolio.tubone-project24.xyz", { small: true }, (qr) => {
                        qrString = qr;
                        resolve(qrString);
                    });
                });
            };
            const qrCodeString = yield generateQRCode();
            const qrCodeLines = qrCodeString.split("\n");
            const shibaInuLines = shibaInuArt.split("\n");
            const combinedArt = [];
            const maxLines = Math.max(shibaInuLines.length, qrCodeLines.length);
            for (let i = 0; i < maxLines; i++) {
                const shibaLine = i < shibaInuLines.length ? shibaInuLines[i] : "";
                const qrLine = i < qrCodeLines.length ? qrCodeLines[i] : "";
                const padding = 5;
                combinedArt.push(qrLine + " ".repeat(padding) + chalk_1.default.yellow(shibaLine));
            }
            clearConsole();
            console.log(drawBox(displayContent));
            console.log(combinedArt.join("\n"));
            yield sleep(300);
            const colors = ["green", "yellow", "blue", "magenta", "cyan", "red", "white"];
            for (let i = 0; i < 30; i++) {
                const color = colors[i % colors.length];
                clearConsole();
                console.log(drawBox(displayContent, color));
                console.log(combinedArt.join("\n"));
                yield sleep(100);
            }
            clearConsole();
            console.log(drawBox(displayContent, "green"));
            console.log(combinedArt.join("\n"));
        }
        catch (error) {
            console.error("エラーが発生しました:", error);
        }
    });
}
exports.main = main;
const data = {
    name: chalk_1.default.white("               Yu Otsubo"),
    handle: chalk_1.default.white("tubone24"),
    work: chalk_1.default.white("FullCycle Developer") + chalk_1.default.cyan("@") + chalk_1.default.greenBright("KAG"),
    twitter: chalk_1.default.gray("https://twitter.com/") + chalk_1.default.cyan("meitante1conan"),
    github: chalk_1.default.gray("https://github.com/") + chalk_1.default.green("tubone24"),
    facebook: chalk_1.default.gray("https://www.facebook.com/") + chalk_1.default.blueBright("yu.otsubo"),
    portfolio: chalk_1.default.cyan("https://portfolio.tubone-project24.xyz"),
    blog: chalk_1.default.cyan("https://blog.tubone-project24.xyz"),
    contact: chalk_1.default.cyan("https://portfolio.tubone-project24.xyz/#contact"),
    instagram: chalk_1.default.gray("https://www.instagram.com/") + chalk_1.default.magenta("mugimugi.cutedog/"),
    npx: chalk_1.default.red("npx") + " " + chalk_1.default.white("tubone24"),
    labelWork: chalk_1.default.white.bold("       Work:"),
    labelTwitter: chalk_1.default.white.bold("    Twitter:"),
    labelGitHub: chalk_1.default.white.bold("     GitHub:"),
    labelFacebook: chalk_1.default.white.bold("   Facebook:"),
    labelInstagram: chalk_1.default.white.bold("  Instagram:"),
    labelPortfolio: chalk_1.default.white.bold("  Portfolio:"),
    labelBlog: chalk_1.default.white.bold("       Blog:"),
    labelContact: chalk_1.default.white.bold("    Contact:"),
    labelCard: chalk_1.default.white.bold("       Card:")
};
const newline = "\n";
const heading = `${data.name} / ${data.handle}`;
const working = `${data.labelWork}  ${data.work}`;
const twittering = `${data.labelTwitter}  ${data.twitter}`;
const instagraming = `${data.labelInstagram}  ${data.instagram}`;
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
    instagraming + newline +
    githubing + newline +
    portfolio + newline +
    bloging + newline +
    contact + newline + newline +
    carding;
const generateQRCodeSync = () => {
    let qrString = "";
    qrcode_terminal_1.default.generate("https://portfolio.tubone-project24.xyz", { small: true }, (qr) => {
        qrString = qr;
    });
    return qrString;
};
const combineArt = (shibaArt, qrCode) => {
    const shibaLines = shibaArt.split("\n");
    const qrLines = qrCode.split("\n");
    const maxLines = Math.max(shibaLines.length, qrLines.length);
    const combined = [];
    for (let i = 0; i < maxLines; i++) {
        const shibaLine = i < shibaLines.length ? shibaLines[i] : "";
        const qrLine = i < qrLines.length ? qrLines[i] : "";
        const padding = 5;
        combined.push(qrLine + " ".repeat(padding) + chalk_1.default.yellow(shibaLine));
    }
    return combined.join("\n");
};
const finalOutput = chalk_1.default.green((0, boxen_1.default)(output, options)) + newline + chalk_1.default.yellow(shibaInuArt);
main();
//# sourceMappingURL=build.js.map