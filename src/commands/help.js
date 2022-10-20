import Table from 'cli-table2';

const help = () => {
  const commands = [
    {
      name: 'start',
      description: 'Start exposing localhost via exposy server',
      usage: 'exposy start [options]',
      options: [
        {
          name: 'port',
          alias: '-p',
          description: 'Define the localhost port to be exposed via exposy server',
        },
        {
          name: 'exposyServer',
          alias: '-e',
          description: 'Override globally configured exposy server host url',
        },
        {
          name: 'exposyServerSSL',
          alias: '-s',
          description: 'Override globally configured exposy server host ssl config',
        },
      ],
    },
    {
      name: 'config',
      description: 'Configure exposy options globally',
      usage: 'exposy config',
      options: [],
    },
  ];

  const table = new Table({
    head: ['Command', 'Description', 'Usage', 'Options'],
    colWidths: [15, 30, 30, 40],
    wordWrap: true,
  });
  commands.forEach(({ name, description, usage, options }) => {
    // TODO: Color these option names and aliases so that they are easy to read. Coming in next PR.
    const optionsData = options.map(({ name: optionName, alias: optionAlias, description: optionDescription }) => `--${optionName}/ --${optionAlias} \n ${optionDescription}\n`);
    table.push(
      [name, description, usage, optionsData.toString().replace(/,/g, '\n')],
    );
  });

  console.log(table.toString());
};

export default help;
