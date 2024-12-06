import * as core from '@actions/core'
import { wait } from './wait'
import { SummaryTableCell, SummaryTableRow } from '@actions/core/lib/summary'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */

type PhraseError = {
  key: string
  message: string
}

type PhraseTag = {
  tag: string
  errors: PhraseError[]
}

export async function run(): Promise<void> {
  const filename = core.getInput("file")
  const data: PhraseTag[] = require(filename)

  if (data.length == 0) {
    core.summary.addHeading("No problems", 3)
  } else {
    data.forEach(tag => {
      core.summary.addHeading(tag.tag, 3)
      let rows: SummaryTableRow[] = []

      tag.errors.forEach(error => {
        let cells: SummaryTableCell[] = []
        cells[0] = {
          data: error.key
        }
        cells[1] = {
          data: error.message
        }
        rows.push(cells)
      })

      core.summary.addTable(rows)
    })
  }

  core.summary.write()
}
