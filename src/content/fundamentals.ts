import type { Program, Section } from './types'
import { image } from './images'

const groupId = 'fundamentals-exercises'

/**
 * The source document provides no heading for this block and no source-code text.
 * Each exercise is a problem statement followed by a single Command Prompt screenshot
 * that contains both the code and its output. `image17.PNG` is genuinely reused by the
 * document for exercises 4 and 5, so the same asset is referenced by both records.
 */
const raw: Array<{ title: string; statement: string; image: number; sourceLine: number }> = [
  {
    title: 'Hello, Java! and Basic Program Structure',
    statement:
      'Write a Java program to display "Hello, Java!" and demonstrate the basic structure of a Java program.',
    image: 14,
    sourceLine: 157,
  },
  {
    title: 'Primitive Data Type Variables',
    statement:
      '2.\tWrite a Java program to declare variables of different primitive data types (byte, short, int, long, float, double, char, and boolean) and display their values.',
    image: 15,
    sourceLine: 160,
  },
  {
    title: 'Arithmetic Operations on Integers',
    statement:
      'Write a Java program to perform arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two integer variables.',
    image: 16,
    sourceLine: 163,
  },
  {
    title: 'Arithmetic Operations on Floating-Point Numbers',
    statement:
      'Write a Java program to perform arithmetic operations on floating-point numbers and display the results.',
    image: 17,
    sourceLine: 166,
  },
  {
    title: 'Character Data Type and ASCII/Unicode Value',
    statement:
      'Write a Java program to demonstrate character data type by displaying a character and its corresponding ASCII/Unicode value.',
    image: 17,
    sourceLine: 169,
  },
  {
    title: 'Boolean Variables and Boolean Expressions',
    statement:
      'Write a Java program to demonstrate the use of Boolean variables and Boolean expressions.',
    image: 18,
    sourceLine: 172,
  },
  {
    title: 'Declaring and Initializing Variables',
    statement:
      'Write a Java program to declare and initialize different types of variables and display their values.',
    image: 19,
    sourceLine: 175,
  },
  {
    title: 'Swapping Two Variables Using a Temporary Variable',
    statement:
      'Write a Java program to swap the values of two variables using a temporary variable.',
    image: 20,
    sourceLine: 178,
  },
  {
    title: 'Automatic (Widening) Type Conversion',
    statement:
      'Write a Java program to demonstrate automatic (widening) type conversion between primitive data types.',
    image: 21,
    sourceLine: 181,
  },
  {
    title: 'Explicit (Narrowing) Type Casting',
    statement:
      'Write a Java program to demonstrate explicit (narrowing) type casting from one primitive data type to another.',
    image: 22,
    sourceLine: 184,
  },
  {
    title: 'Character to ASCII/Unicode Conversion Using Type Casting',
    statement:
      'Write a Java program to convert a character to its ASCII/Unicode value and vice versa using type casting.',
    image: 23,
    sourceLine: 187,
  },
  {
    title: 'Even or Odd Check Using if-else',
    statement:
      'Write a Java program to check whether a given number is even or odd using the if-else control statement.',
    image: 24,
    sourceLine: 190,
  },
  {
    title: 'Largest of Two Numbers Using if-else',
    statement: ' Write a Java program to find the largest of two numbers using the if-else statement',
    image: 25,
    sourceLine: 193,
  },
  {
    title: 'Reserved Keywords and Valid Identifiers',
    statement:
      'Wirte a Java program to demonstrate the use of Java reserved keywords by creating valid identifiers and explaining why keywords cannot be used as variable names.',
    image: 26,
    sourceLine: 196,
  },
  {
    title: 'for Loop Displaying Numbers from 1 to 10',
    statement:
      'Write a Java program to demonstrate the use of the for loop by displaying numbers from 1 to 10.',
    image: 27,
    sourceLine: 199,
  },
]

export const fundamentalsPrograms: Program[] = raw.map((r, i) => ({
  id: `fundamentals-${String(i + 1).padStart(2, '0')}`,
  title: r.title,
  titleDerived: true,
  groupId,
  problemStatement: r.statement,
  outputs: [],
  screenshots: [image(r.image)],
  notes: [],
  screenshotOnlySource: true,
  sourceLine: r.sourceLine,
}))

export const fundamentalsSection: Section = {
  id: 'fundamentals',
  title: 'Fundamentals Exercises',
  order: 3,
  description: 'Fifteen introductory Java exercises covering data types, operators, conversions and control flow.',
  sourceLine: 157,
  groups: [
    {
      id: groupId,
      title: 'Exercises',
      sourceLine: 157,
      blocks: [
        {
          kind: 'prose',
          id: 'fundamentals-note',
          callouts: [
            {
              tone: 'source',
              title: 'Screenshot-only source',
              body: 'The source document gives no heading and no source-code text for this block. Each exercise is a problem statement followed by a single Command Prompt screenshot in which the code and its output both appear. The screenshots are the only record of the code, so the code is not reproduced here as text.',
            },
            {
              tone: 'source',
              title: 'Transcribed verbatim',
              body: 'Exercise statements are reproduced exactly as written in the source document, including original spelling and numbering (for example "Wirte a Java program..." in exercise 14 and the "2." prefix on exercise 2). Exercise 4 and exercise 5 share a single screenshot in the document; the same asset is referenced by both.',
            },
          ],
          sourceLine: 157,
        },
        {
          kind: 'programs',
          id: 'fundamentals-programs',
          programIds: fundamentalsPrograms.map((p) => p.id),
          sourceLine: 157,
        },
      ],
    },
  ],
}
