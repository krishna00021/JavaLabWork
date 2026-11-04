import type { Program, Section } from './types'
import { image } from './images'

const groupId = 'string-classes'

const raw: Array<{
  ref: string
  title: string
  fileName: string
  code: string
  screenshot: number
  sourceLine: number
}> = [
  {
    ref: 'Experiment 1',
    title: 'String Constructors',
    fileName: 'StringConstructorsDemo.java',
    screenshot: 28,
    sourceLine: 1230,
    code: `import java.util.Scanner;

public class StringConstructorsDemo {
    public static void main(String[] args) {
        // String using a string literal
        String literal = "Hello Java";

        // String using new String()
        String newString = new String("Hello Java");

        // String from a character array
        char[] chars = {'J', 'a', 'v', 'a'};
        String charString = new String(chars);

        // String from a byte array
        byte[] bytes = {72, 101, 108, 108, 111};
        String byteString = new String(bytes);

        System.out.println("String using literal       : " + literal);
        System.out.println("String using new           : " + newString);
        System.out.println("String from char array     : " + charString);
        System.out.println("String from byte array     : " + byteString);

        // Demonstrating literal and new String objects
        String literal2 = "Hello Java";
        String newString2 = new String("Hello Java");

        System.out.println("\\nComparison of String objects:");
        System.out.println("literal == literal2        : " + (literal == literal2));
        System.out.println("literal == newString2      : " + (literal == newString2));
        System.out.println("literal.equals(newString2) : " +
                           literal.equals(newString2));
    }
}`,
  },
  {
    ref: 'Experiment 2',
    title: 'StringBuffer Class',
    fileName: 'StringBufferDemo.java',
    screenshot: 29,
    sourceLine: 1271,
    code: `public class StringBufferDemo {
    public static void main(String[] args) {
        StringBuffer buffer = new StringBuffer("Hello");

        System.out.println("Initial buffer : " + buffer);

        // Append text
        buffer.append(" Java");
        System.out.println("After append   : " + buffer);

        // Insert text
        buffer.insert(6, "World ");
        System.out.println("After insert   : " + buffer);

        // Replace a portion
        buffer.replace(6, 12, "Beautiful");
        System.out.println("After replace  : " + buffer);

        // Delete characters
        buffer.delete(6, 16);
        System.out.println("After delete   : " + buffer);

        // Reverse the contents
        buffer.reverse();
        System.out.println("After reverse  : " + buffer);

        System.out.println("Current length : " + buffer.length());
        System.out.println("Current capacity: " + buffer.capacity());
    }
}`,
  },
  {
    ref: 'Experiment 3',
    title: 'StringTokenizer Class',
    fileName: 'StringTokenizerDemo.java',
    screenshot: 30,
    sourceLine: 1308,
    code: `import java.util.Scanner;
import java.util.StringTokenizer;

public class StringTokenizerDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a sentence: ");
        String sentence = sc.nextLine();

        StringTokenizer tokenizer = new StringTokenizer(sentence);

        System.out.println("\\nTokens using space delimiter:");
        while (tokenizer.hasMoreTokens()) {
            System.out.println(tokenizer.nextToken());
        }

        StringTokenizer countTokenizer = new StringTokenizer(sentence);
        System.out.println("Total number of tokens: " +
                           countTokenizer.countTokens());

        System.out.print("\\nEnter a delimiter (example: ,): ");
        String delimiter = sc.nextLine();

        System.out.print("Enter text using that delimiter: ");
        String delimitedText = sc.nextLine();

        StringTokenizer customTokenizer =
                new StringTokenizer(delimitedText, delimiter);

        System.out.println("\\nTokens using '" + delimiter + "' delimiter:");
        while (customTokenizer.hasMoreTokens()) {
            System.out.println(customTokenizer.nextToken());
        }

        sc.close();
    }
}`,
  },
]

export const stringPrograms: Program[] = raw.map((r) => ({
  id: `strings-${r.fileName.replace('.java', '').toLowerCase()}`,
  ref: r.ref,
  title: r.title,
  groupId,
  code: { language: 'java', fileName: r.fileName, code: r.code },
  outputs: [],
  screenshots: [image(r.screenshot)],
  notes: ['The screenshot above shows the program being compiled and executed from a command prompt, along with its output.'],
  sourceLine: r.sourceLine,
}))

export const stringsSection: Section = {
  id: 'strings',
  title: 'Strings',
  order: 5,
  description: 'String constructors, StringBuffer and StringTokenizer experiments from the source document.',
  sourceLine: 1221,
  groups: [
    {
      id: groupId,
      title: 'String Class Experiments',
      summary: '5 Programs with Command Prompt Output Screenshots',
      sourceLine: 1221,
      blocks: [
        {
          kind: 'prose',
          id: 'strings-intro',
          paragraphs: [
            'This record contains the requested Java programs for String constructors, StringBuffer, StringTokenizer, single inheritance, and the super keyword. Each experiment includes source code and a command-prompt-style output screenshot.',
          ],
          listItems: [
            'Experiment 1: String Constructors',
            'Experiment 2: StringBuffer Class',
            'Experiment 3: StringTokenizer Class',
            'Experiment 4: Basic Inheritance',
            'Experiment 5: Using super Keyword',
          ],
          callouts: [
            {
              tone: 'note',
              title: 'Experiments 4 and 5 are inheritance programs',
              body: 'Experiments 4 (Basic Inheritance) and 5 (Using super Keyword) belong to the same source block but demonstrate inheritance, so they are filed under the Inheritance section of this site.',
            },
          ],
          sourceLine: 1221,
        },
        {
          kind: 'programs',
          id: 'strings-programs',
          programIds: stringPrograms.map((p) => p.id),
          sourceLine: 1230,
        },
      ],
    },
    {
      id: 'string-key-concepts',
      title: 'Key Concepts Demonstrated',
      sourceLine: 1457,
      blocks: [
        {
          kind: 'prose',
          id: 'string-key-concepts-list',
          paragraphs: [
            'The source document lists the following key concepts. It presents them as covering all five experiments in the original block, so three of them refer to the inheritance programs filed under the Inheritance section.',
          ],
          listItems: [
            'String constructors: literal, new String(), character array, and byte array.',
            'String literal and new String() reference comparison using == and content comparison using equals().',
            'StringBuffer mutable operations: append, insert, replace, delete, reverse, length, and capacity.',
            'StringTokenizer tokenization with default and user-specified delimiters.',
            'Single inheritance using a Person superclass and Student subclass.',
            'super keyword for superclass variables, methods, and constructors.',
          ],
          sourceLine: 1457,
        },
        {
          kind: 'prose',
          id: 'strings-environment-note',
          paragraphs: [
            'All five Java programs were compiled successfully in the preparation environment using Java 21.',
          ],
          sourceLine: 1464,
        },
      ],
    },
  ],
}
