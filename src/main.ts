import * as core from '@actions/core'
import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */

type PhraseError = {
  key: string,
  message: string,
}

type PhraseTag = {
  tag: string,
  errors: PhraseError[],
}

export async function run(): Promise<void> {
  const data: PhraseTag[] = require("./phrase-report.json");

  data.forEach(tag => {
    core.summary.addHeading(tag.tag, 3);
  
    tag.errors.forEach(error => {
      core.summary.addHeading(error.message, 4);
    })
  });

  core.summary.write();
}
