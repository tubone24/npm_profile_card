#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

import chalk from "chalk";
import boxen, { Options, BorderStyle } from "boxen";
import { readFileSync, writeFileSync, chmodSync } from "fs";
import { join } from "path";
import qrcode from "qrcode-terminal";

// Define options for Boxen
const options: Options = {
    padding: 1,
    margin: 1,
    borderStyle: BorderStyle.Round,
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

// アニメーション用の関数
const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// コンソールをクリアする関数
const clearConsole = (): void => {
    process.stdout.write("\x1Bc");
};

// 文字列を行に分割
const splitIntoLines = (text: string): string[] => {
    return text.split("\n");
};

// ボックスを描画する関数
const drawBox = (content: string, borderColor = "white"): string => {
    return boxen(content, {
        padding: 1,
        margin: 1,
        borderStyle: BorderStyle.Round,
        borderColor: borderColor
    });
};

// カラーコードを生成
const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 1; i <= count; i++) {
        // 単純な色の配列を使用
        const baseColors = ["green", "yellow", "blue", "magenta", "cyan", "white", "red"];
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
};

// 最大行長を計算（事前計算用）
const calculateMaxLineLength = (lines: string[]): number => {
    let maxLength = 0;
    for (const line of lines) {
        if (line.length > maxLength) {
            maxLength = line.length;
        }
    }
    return maxLength;
};

// メイン関数
async function main(): Promise<void> {
    try {
        // 出力内容を直接使用
        const outputContent = output;
        
        // コンソールをクリア
        clearConsole();
        
        // 出力内容を行に分割
        const lines = splitIntoLines(outputContent);
        
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
                await sleep(50);
                continue;
            }
            
            // 1文字ずつ追加
            for (let j = 0; j < line.length; j++) {
                currentContent += line[j];
                displayContent = currentContent;
                clearConsole();
                console.log(drawBox(displayContent));
                await sleep(10); // 速度を上げる
            }
            
            // 行の終わりに改行を追加
            currentContent += "\n";
            displayContent = currentContent;
            clearConsole();
            console.log(drawBox(displayContent));
            await sleep(50); // 行の終わりで少し待機
        }
        
        // QRコードを生成
        const generateQRCode = (): Promise<string> => {
            return new Promise((resolve) => {
                let qrString = "";
                // qrcode-terminalの出力をキャプチャするためのカスタム関数
                qrcode.generate("https://portfolio.tubone-project24.xyz", { small: true }, (qr) => {
                    qrString = qr;
                    resolve(qrString);
                });
            });
        };

        // QRコードを取得
        const qrCodeString = await generateQRCode();
        const qrCodeLines = qrCodeString.split("\n");

        // 柴犬アートとQRコードを横に並べる
        const shibaInuLines = shibaInuArt.split("\n");
        const combinedArt: string[] = [];
        
        // 2つのアートの最大行数を取得
        const maxLines = Math.max(shibaInuLines.length, qrCodeLines.length);
        
        // 各行を結合（QRコードを左、柴犬アートを右に配置）
        for (let i = 0; i < maxLines; i++) {
            const shibaLine = i < shibaInuLines.length ? shibaInuLines[i] : "";
            const qrLine = i < qrCodeLines.length ? qrCodeLines[i] : "";
            // QRコードと柴犬アートの間のスペース
            const padding = 5;
            combinedArt.push(qrLine + " ".repeat(padding) + chalk.yellow(shibaLine));
        }
        
        // 結合したアートを表示
        clearConsole();
        console.log(drawBox(displayContent));
        console.log(combinedArt.join("\n"));
        await sleep(300);
        
        // ボーダーの色を変化させる
        const colors = ["green", "yellow", "blue", "magenta", "cyan", "red", "white"];
        for (let i = 0; i < 30; i++) {
            const color = colors[i % colors.length];
            clearConsole();
            console.log(drawBox(displayContent, color));
            console.log(combinedArt.join("\n"));
            await sleep(100);
        }
        
        // 最終的な表示
        clearConsole();
        console.log(drawBox(displayContent, "green"));
        console.log(combinedArt.join("\n"));
        
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

const data = {
    name: chalk.white("               Yu Otsubo"),
    handle: chalk.white("tubone24"),
    work: chalk.white("FullCycle Developer") + chalk.cyan("@") + chalk.greenBright("KAG"),
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("tubone24"),
    github: chalk.gray("https://github.com/") + chalk.green("tubone24"),
    facebook: chalk.gray("https://www.facebook.com/") + chalk.blueBright("yu.otsubo"),
    portfolio: chalk.cyan("https://portfolio.tubone-project24.xyz"),
    blog: chalk.cyan("https://blog.tubone-project24.xyz"),
    contact: chalk.cyan("https://portfolio.tubone-project24.xyz/#contact"),
    instagram: chalk.gray("https://www.instagram.com/") + chalk.magenta("mugimugi.cutedog/"),
    sottome: chalk.cyan("https://sottome.digital/"),
    npx: chalk.red("npx") + " " + chalk.white("tubone24"),
    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelFacebook: chalk.white.bold("   Facebook:"),
    labelInstagram: chalk.white.bold("  Instagram:"),
    labelSottoMe: chalk.white.bold("    SottoMe:"),
    labelPortfolio: chalk.white.bold("  Portfolio:"),
    labelBlog: chalk.white.bold("       Blog:"),
    labelContact: chalk.white.bold("    Contact:"),
    labelCard: chalk.white.bold("       Card:")
};

const newline = "\n";
const heading = `${data.name} / ${data.handle}`;
const working = `${data.labelWork}  ${data.work}`;
const twittering = `${data.labelTwitter}  ${data.twitter}`;
const instagraming = `${data.labelInstagram}  ${data.instagram}`;
const githubing = `${data.labelGitHub}  ${data.github}`;
const facebooking = `${data.labelFacebook}  ${data.facebook}`;
const sottomeing = `${data.labelSottoMe}  ${data.sottome}`;
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
               sottomeing + newline +
               portfolio + newline +
               bloging + newline +
               contact + newline + newline +
               carding;

// QRコードを生成
const generateQRCodeSync = (): string => {
    let qrString = "";
    // qrcode-terminalの出力をキャプチャするためのカスタム関数
    qrcode.generate("https://portfolio.tubone-project24.xyz", { small: true }, (qr) => {
        qrString = qr;
    });
    return qrString;
};

// 柴犬アートとQRコードを横に並べる関数（QRコードを左、柴犬アートを右に配置）
const combineArt = (shibaArt: string, qrCode: string): string => {
    const shibaLines = shibaArt.split("\n");
    const qrLines = qrCode.split("\n");
    const maxLines = Math.max(shibaLines.length, qrLines.length);
    const combined: string[] = [];
    
    for (let i = 0; i < maxLines; i++) {
        const shibaLine = i < shibaLines.length ? shibaLines[i] : "";
        const qrLine = i < qrLines.length ? qrLines[i] : "";
        const padding = 5; // QRコードと柴犬アートの間のスペース
        combined.push(qrLine + " ".repeat(padding) + chalk.yellow(shibaLine));
    }
    
    return combined.join("\n");
};

// 注意: この部分は実際には使用されていないようですが、
// 必要に応じて以下のようにfinalOutputを更新できます
// const qrCode = generateQRCodeSync();
// const finalOutput = chalk.green(boxen(output, options)) + newline + combineArt(shibaInuArt, qrCode);
const finalOutput = chalk.green(boxen(output, options)) + newline + chalk.yellow(shibaInuArt);


// メイン関数を実行
main();

// エクスポート（必要に応じて）
export { main };
