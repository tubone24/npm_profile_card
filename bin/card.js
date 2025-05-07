#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict"

const chalk = require("chalk");
const boxen = require("boxen");

// アニメーション用の関数
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// コンソールをクリアする関数
function clearConsole() {
    process.stdout.write("\x1Bc");
}

// 文字列を行に分割
function splitIntoLines(text) {
    return text.split("\n");
}

// ボックスを描画する関数
function drawBox(content, borderColor = "white") {
    return boxen(content, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: borderColor
    });
}

// カラーコードを生成
function generateColors(count) {
    const colors = [];
    for (let i = 1; i <= count; i++) {
        // 単純な色の配列を使用
        const baseColors = ["green", "yellow", "blue", "magenta", "cyan", "white", "red"];
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
}

// 最大行長を計算（事前計算用）
function calculateMaxLineLength(lines) {
    let maxLength = 0;
    for (const line of lines) {
        if (line.length > maxLength) {
            maxLength = line.length;
        }
    }
    return maxLength;
}

// 柴犬アート
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
             └-‐''`;

// カードのデータ
const data = {
    name: chalk.white("               Yu Otsubo"),
    handle: chalk.white("tubone24"),
    work: chalk.white("FullCycle Developer") + chalk.cyan("@") + chalk.greenBright("KAG"),
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("meitante1conan"),
    github: chalk.gray("https://github.com/") + chalk.green("tubone24"),
    facebook: chalk.gray("https://www.facebook.com/") + chalk.blueBright("yu.otsubo"),
    portfolio: chalk.cyan("https://portfolio.tubone-project24.xyz"),
    blog: chalk.cyan("https://blog.tubone-project24.xyz"),
    contact: chalk.cyan("https://portfolio.tubone-project24.xyz/#contact"),
    instagram: chalk.gray("https://www.instagram.com/") + chalk.magenta("mugimugi.cutedog/"),
    npx: chalk.red("npx") + " " + chalk.white("tubone24"),
    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelFacebook: chalk.white.bold("   Facebook:"),
    labelInstagram: chalk.white.bold("  Instagram:"),
    labelPortfolio: chalk.white.bold("  Portfolio:"),
    labelBlog: chalk.white.bold("       Blog:"),
    labelContact: chalk.white.bold("    Contact:"),
    labelCard: chalk.white.bold("       Card:")
};

// カードの内容を生成
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

// メイン関数
async function main() {
    try {
        // コンソールをクリア
        clearConsole();
        
        // 出力内容を行に分割
        const lines = splitIntoLines(output);
        
        // 最大行長を計算（事前計算）
        const maxLineLength = calculateMaxLineLength(lines);
        
        // 枠のサイズを固定するために、最初に空の枠を表示
        const emptyBox = drawBox(" ".repeat(maxLineLength));
        clearConsole();
        console.log(emptyBox);
        await sleep(100);
        
        // アニメーション表示用の変数
        let currentContent = "";
        let displayContent = "";
        
        // 1文字ずつ表示（簡略化）
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 空行はそのまま追加
            if (line.trim() === "") {
                currentContent += line + "\n";
                displayContent = currentContent;
                clearConsole();
                console.log(drawBox(displayContent));
                await sleep(10);
                continue;
            }
            
            // 1文字ずつ追加
            for (let j = 0; j < line.length; j++) {
                currentContent += line[j];
                displayContent = currentContent;
                clearConsole();
                console.log(drawBox(displayContent));
                await sleep(3);
            }
            
            // 行の終わりに改行を追加
            currentContent += "\n";
            displayContent = currentContent;
            clearConsole();
            console.log(drawBox(displayContent));
            await sleep(10); // 行の終わりで少し待機
        }
        
        // 柴犬アートを追加
        clearConsole();
        console.log(drawBox(displayContent));
        console.log(chalk.yellow(shibaInuArt));
        await sleep(300);
        
        // ボーダーの色を変化させる
        const colors = ["green", "yellow", "blue", "magenta", "cyan", "red", "white"];
        for (let i = 0; i < 30; i++) {
            const color = colors[i % colors.length];
            clearConsole();
            console.log(drawBox(displayContent, color));
            console.log(chalk.yellow(shibaInuArt));
            await sleep(100);
        }
        
        // 最終的な表示
        clearConsole();
        console.log(drawBox(displayContent, "green"));
        console.log(chalk.yellow(shibaInuArt));
        
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

// メイン関数を実行
main();
