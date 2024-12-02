import * as core from '@actions/core'
import { wait } from './wait'
import * as data from './sample.json';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  core.summary.addHeading(data.name, 2);
  core.summary.write();
}
