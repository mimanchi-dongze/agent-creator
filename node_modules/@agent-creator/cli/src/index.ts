#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { indexCommand } from './commands/index_cmd.js';

const program = new Command();

program
    .name('agent-creator')
    .description('Automate AI Agent generation and configuration')
    .version('0.1.0');

program
    .command('init')
    .description('Initialize a new agent.md file')
    .action(initCommand);

program
    .command('index')
    .description('Index current project to create AGENTS.md for AI assistants')
    .action(indexCommand);

program.parse();
