#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

'use strict'

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');

// アニメーション用の関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// コンソールをクリアする関数
function clearConsole() {
  process.stdout.write('\x1Bc');
}

// 文字列を行に分割
function splitIntoLines(text) {
  return text.split('\n');
}

// ボックスを描画する関数
function drawBox(content, borderColor = 'white') {
  return boxen(content, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: borderColor
  });
}

// カラーコードを生成
function generateColors(count) {
  const colors = [];
  for (let i = 1; i <= count; i++) {
    // 単純な色の配列を使用
    const colors = ['green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'red'];
    colors.push(colors[i % colors.length]);
  }
  return colors;
}

// メイン関数
async function main() {
  try {
    // 出力ファイルを読み込む
    const outputContent = fs.readFileSync(path.join(__dirname, 'output'), 'utf8');
    
    // コンソールをクリア
    clearConsole();
    
    // 出力内容を行に分割
    const lines = splitIntoLines(outputContent);
    
    // 柴犬アートを分離（最後の部分）
    const shibaInuArtStartIndex = lines.findIndex(line => line.includes('_                          ,-､'));
    const shibaInuArt = lines.slice(shibaInuArtStartIndex).join('\n');
    const cardContent = lines.slice(0, shibaInuArtStartIndex).join('\n');
    
    // カード内容を行に分割（ANSIエスケープコードを含む）
    const cardLines = splitIntoLines(cardContent);
    
    // アニメーション表示用の変数
    let currentContent = '';
    let displayContent = '';
    
    // 1文字ずつ表示（簡略化）
    for (let i = 0; i < cardLines.length; i++) {
      const line = cardLines[i];
      
      // 空行はそのまま追加
      if (line.trim() === '') {
        currentContent += line + '\n';
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
      currentContent += '\n';
      displayContent = currentContent;
      clearConsole();
      console.log(drawBox(displayContent));
      await sleep(50); // 行の終わりで少し待機
    }
    
    // 柴犬アートを追加
    clearConsole();
    console.log(drawBox(displayContent));
    console.log(chalk.yellow(shibaInuArt));
    await sleep(300);
    
    // ボーダーの色を変化させる
    const colors = ['green', 'yellow', 'blue', 'magenta', 'cyan', 'red', 'white'];
    for (let i = 0; i < 30; i++) {
      const color = colors[i % colors.length];
      clearConsole();
      console.log(drawBox(displayContent, color));
      console.log(chalk.yellow(shibaInuArt));
      await sleep(100);
    }
    
    // 最終的な表示
    clearConsole();
    console.log(drawBox(displayContent, 'green'));
    console.log(chalk.yellow(shibaInuArt));
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// メイン関数を実行
main();
