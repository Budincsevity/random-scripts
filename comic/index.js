#!/usr/bin/env node

const fs = require('fs')
const cheerio = require('cheerio')
const rp = require('request-promise')
const {
  exec
} = require('child_process');
var program = require('commander');

program
  .version('1.0.0')
  .command('download <url>')
  .alias('d')
  .option('-p, --pdf', 'Generate pdf file from images')
  .action(function (url, args) {
    downloadComic(url, args);
  });
program.parse(process.argv);

const halozsak = { 
  className: ".thickbox",
}

function downloadComic(url, args) {
  rp(url)
    .then(function (html) {
      const name = url.split('/').pop();
      const $ = cheerio.load(html);

      $(halozsak.className).each(function (i, element) {
        const uri = element.attribs.href;
        const options = {
          url: uri,
          encoding: null
        };

        rp.get(options).then(function (data) {
          const buffer = Buffer.from(data, 'utf8');
          fs.writeFileSync(`${name}_${i}.png`, buffer);
        });

      });

      if (args.pdf) {
        exec(`convert *.png ${name}.pdf`)
      }
    });
}
