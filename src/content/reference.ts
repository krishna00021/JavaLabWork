import type { Section } from './types'

export const referenceSection: Section = {
  id: 'reference',
  title: 'Reference',
  order: 10,
  description: 'Supporting data files and the compile/run commands recorded in the source document.',
  sourceLine: 2027,
  groups: [
    {
      id: 'supporting-files',
      title: 'Supporting Files',
      sourceLine: 2027,
      blocks: [
        {
          kind: 'prose',
          id: 'byte-stream-supporting-files',
          title: 'Supporting Files',
          paragraphs: ['The file-based programs use these sample files during execution:'],
          listItems: [
            'input.txt — Text file read byte-by-byte in Program 12.',
            'output.txt — Created and verified by Program 13.',
            'source.txt — Source file for Program 14.',
            'destination.txt — Destination file created by Program 14.',
            'input.jpg — Sample JPEG used as the source image in Program 15.',
            'copy.jpg — Destination image created by Program 15.',
          ],
          sourceLine: 2028,
        },
        {
          kind: 'prose',
          id: 'byte-stream-environment-note',
          paragraphs: [
            'The programs were compiled and run using Java 21 in the preparation environment. The screenshots show the corresponding command prompt commands and actual program output.',
          ],
          sourceLine: 2035,
        },
      ],
    },
    {
      id: 'file-setup',
      title: 'File Setup Used by File Programs',
      sourceLine: 2362,
      blocks: [
        {
          kind: 'prose',
          id: 'char-stream-file-setup',
          paragraphs: ['Place the required text files in the same folder as the Java source/class files:'],
          listItems: [
            'input.txt – used by FileReaderDemo and FileCountDemo.',
            'source.txt – used by FileCopyDemo.',
            'output.txt – created by FileWriterDemo.',
          ],
          sourceLine: 2363,
        },
        {
          kind: 'prose',
          id: 'compile-and-run',
          title: 'Compile & Run',
          entries: [
            { type: 'code', code: 'Compile: javac ProgramName.java' },
            { type: 'code', code: 'Run: java ProgramName' },
          ],
          sourceLine: 2367,
        },
      ],
    },
  ],
}
