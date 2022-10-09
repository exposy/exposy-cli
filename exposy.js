#! /usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import config from './src/commands/config.js';
import start from './src/commands/start.js';

const { argv } = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .example('$0 <command> -h', 'See command specific help')

  .command('start', 'Start exposing localhost via exposy server', (args) => {
    const portOption = {
      alias: 'p',
      type: 'number',
      description: 'Define the localhost port to be exposed via exposy server',
      nargs: 1,
      demandOption: true,
    };

    const serverUrlOption = {
      alias: 'e',
      type: 'string',
      description: 'Override globally configured exposy server host url',
      nargs: 1,
      demandOption: false,
    };

    const serverSslOption = {
      alias: 's',
      type: 'boolean',
      description: 'Override globally configured exposy server host ssl config',
      nargs: 1,
      demandOption: false,
    };
    const authToken = {
      alias: 't',
      type: 'string',
      description: 'Override globally configured exposy authentication token',
      nargs: 1,
      demandOption: false,
    };

    return args
      .option('port', portOption)
      .option('exposyServer', serverUrlOption)
      .option('exposyServerSSL', serverSslOption)
      .option('authToken', authToken);
  })
  .example('$0 start -p 3000', 'Expose localhost:3000 via exposy server')

  .command('config', 'Configure exposy options globally')
  .example('$0 config', 'This will launch a questionnaire.')

  .help('h')
  .alias('h', 'help');

(() => {
  const { _, ...params } = argv;
  const command = _.join(' ');

  if (command === 'start') {
    start(params);
  } else if (command === 'config') {
    config();
  }
})();
