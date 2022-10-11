#! /usr/bin/env node

import inquirer from 'inquirer';
import { saveConfig } from '../util/utils.js';

const questions = [
  {
    type: 'input',
    name: 'SERVER_HOST',
    message: 'Where is your exposy server hosted?',
    prefix: '',
    suffix: ' (e.g. apps.example.com, localhost:4000 etc.)',
  },
  {
    type: 'confirm',
    name: 'SERVER_SSL_VERIFY',
    message: 'is SSL(https) enabled on your server?',
    prefix: '',
    suffix: '',
  },
  {
    type: 'input',
    name: 'AUTH_TOKEN',
    message: 'Enter authentication token (if you have it)',
    prefix: '',
    suffix: '',
  },
];

const configure = () => {
  inquirer
    .prompt(questions)
    .then((answers) => {
      // eslint-disable-next-line prefer-const
      let { SERVER_HOST, SERVER_SSL_VERIFY, AUTH_TOKEN } = answers;
      if (!SERVER_HOST) {
        console.error('Please provide valid exposy server host!');
        process.exit(1);
      }

      // remove protocol, if included
      SERVER_HOST = SERVER_HOST.split('://').pop();

      saveConfig({
        SERVER_HOST,
        SERVER_SSL_VERIFY,
        AUTH_TOKEN,
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
};

export default configure;
