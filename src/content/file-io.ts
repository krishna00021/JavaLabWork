import type { Program, Section } from './types'
import { image } from './images'

const byteGroupId = 'byte-stream-programs'
const charGroupId = 'character-stream-programs'

const byteStreams: Array<{
  ref: string
  title: string
  className: string
  fileName: string
  code: string
  screenshot: number
  notes?: string[]
  sourceLine: number
}> = [
  {
    ref: '11',
    title: 'InputStream and OutputStream',
    className: 'StreamDemo',
    fileName: 'StreamDemo.java',
    screenshot: 46,
    sourceLine: 1852,
    code: `import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class StreamDemo {
    public static void main(String[] args) throws IOException {
        String text = "Hello Java Streams!";
        ByteArrayInputStream input =
                new ByteArrayInputStream(text.getBytes());
        ByteArrayOutputStream output =
                new ByteArrayOutputStream();

        int data;
        while ((data = input.read()) != -1) {
            output.write(data);
        }

        System.out.println("Input  : " + text);
        System.out.println("Output : " + output.toString());
        System.out.println("Bytes transferred = " + output.size());
    }
}`,
  },
  {
    ref: '12',
    title: 'Read a File Byte-by-Byte',
    className: 'FileReadByteDemo',
    fileName: 'FileReadByteDemo.java',
    screenshot: 47,
    notes: ['Input file used: input.txt'],
    sourceLine: 1880,
    code: `import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class FileReadByteDemo {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("input.txt")) {
            int data;
            System.out.println("File contents:");
            while ((data = fis.read()) != -1) {
                System.out.print((char) data);
            }
            System.out.println();
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        }
    }
}`,
  },
  {
    ref: '13',
    title: 'Write Data Using FileOutputStream and Verify',
    className: 'FileWriteDemo',
    fileName: 'FileWriteDemo.java',
    screenshot: 48,
    notes: ['Output file created and verified: output.txt'],
    sourceLine: 1907,
    code: `import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileWriteDemo {
    public static void main(String[] args) {
        String fileName = "output.txt";
        String text = "Java FileOutputStream example.";

        try (FileOutputStream fos = new FileOutputStream(fileName)) {
            fos.write(text.getBytes());
            System.out.println("Data written successfully.");
        } catch (IOException e) {
            System.out.println("Write error: " + e.getMessage());
            return;
        }

        try (FileInputStream fis = new FileInputStream(fileName)) {
            StringBuilder content = new StringBuilder();
            int data;
            while ((data = fis.read()) != -1) {
                content.append((char) data);
            }
            System.out.println("Verified contents: " + content);
        } catch (IOException e) {
            System.out.println("Read error: " + e.getMessage());
        }
    }
}`,
  },
  {
    ref: '14',
    title: 'Copy One File to Another',
    className: 'FileCopyDemo',
    fileName: 'FileCopyDemo.java',
    screenshot: 49,
    notes: ['Source file: source.txt; destination file: destination.txt'],
    sourceLine: 1943,
    code: `import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileCopyDemo {
    public static void main(String[] args) {
        String source = "source.txt";
        String destination = "destination.txt";

        try (FileInputStream fis = new FileInputStream(source);
             FileOutputStream fos = new FileOutputStream(destination)) {

            int data;
            int count = 0;

            while ((data = fis.read()) != -1) {
                fos.write(data);
                count++;
            }

            System.out.println("File copied successfully.");
            System.out.println("Bytes copied = " + count);
            System.out.println("Destination file = " + destination);

        } catch (IOException e) {
            System.out.println("Copy error: " + e.getMessage());
        }
    }
}`,
  },
  {
    ref: '15',
    title: 'Copy an Image Using Byte Streams with try-catch-finally',
    className: 'ImageCopyDemo',
    fileName: 'ImageCopyDemo.java',
    screenshot: 50,
    notes: ['Source image: input.jpg; destination image: copy.jpg'],
    sourceLine: 1979,
    code: `import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class ImageCopyDemo {
    public static void main(String[] args) {
        FileInputStream fis = null;
        FileOutputStream fos = null;
        String source = "input.jpg";
        String destination = "copy.jpg";
        int count = 0;

        try {
            fis = new FileInputStream(source);
            fos = new FileOutputStream(destination);

            int data;
            while ((data = fis.read()) != -1) {
                fos.write(data);
                count++;
            }

            System.out.println("Image copied successfully.");
            System.out.println("Bytes copied = " + count);

        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        } finally {
            try {
                if (fis != null) fis.close();
                if (fos != null) fos.close();
                System.out.println("Streams closed in finally block.");
            } catch (IOException e) {
                System.out.println("Error while closing streams: " + e.getMessage());
            }
        }
    }
}`,
  },
]

const charStreams: Array<{
  ref: string
  title: string
  className: string
  code: string
  screenshot: number
  note: string
  sourceLine: number
}> = [
  {
    ref: 'Experiment 1',
    title: 'Read Characters Using Reader and Display Using Writer',
    className: 'ReaderWriterDemo',
    screenshot: 51,
    note: 'The program executes successfully and produces the output shown above.',
    sourceLine: 2039,
    code: `import java.io.*;

public class ReaderWriterDemo {
    public static void main(String[] args) throws IOException {
        Reader reader = new InputStreamReader(System.in);
        Writer writer = new OutputStreamWriter(System.out);

        writer.write("Enter characters: ");
        writer.flush();

        int ch;
        while ((ch = reader.read()) != '\\n' && ch != -1) {
            writer.write(ch);
        }

        writer.write("\\n");
        writer.flush();
    }
}`,
  },
  {
    ref: 'Experiment 2',
    title: 'Read a Text File Using FileReader',
    className: 'FileReaderDemo',
    screenshot: 52,
    note: 'The program executes successfully and produces the output shown above.',
    sourceLine: 2065,
    code: `import java.io.*;

public class FileReaderDemo {
    public static void main(String[] args) throws IOException {
        FileReader reader = new FileReader("input.txt");
        int ch;

        while ((ch = reader.read()) != -1) {
            System.out.print((char) ch);
        }

        reader.close();
    }
}`,
  },
  {
    ref: 'Experiment 3',
    title: 'Write Text into a File Using FileWriter',
    className: 'FileWriterDemo',
    screenshot: 53,
    note: 'The program executes successfully and produces the output shown above.',
    sourceLine: 2086,
    code: `import java.io.*;

public class FileWriterDemo {
    public static void main(String[] args) throws IOException {
        FileWriter writer = new FileWriter("output.txt");

        writer.write("Hello from Java FileWriter!\\n");
        writer.write("This text is written into a file.");

        writer.close();
        System.out.println("Text written successfully to output.txt");
    }
}`,
  },
  {
    ref: 'Experiment 4',
    title: 'Copy One Text File into Another',
    className: 'FileCopyDemo',
    screenshot: 54,
    note: 'The program executes successfully and produces the output shown above.',
    sourceLine: 2106,
    code: `import java.io.*;

public class FileCopyDemo {
    public static void main(String[] args) throws IOException {
        FileReader reader = new FileReader("source.txt");
        FileWriter writer = new FileWriter("destination.txt");

        int ch;
        while ((ch = reader.read()) != -1) {
            writer.write(ch);
        }

        reader.close();
        writer.close();

        System.out.println("File copied successfully.");
    }
}`,
  },
  {
    ref: 'Experiment 5',
    title: 'Count Characters, Words and Lines',
    className: 'FileCountDemo',
    screenshot: 55,
    note: 'The program counts every character, identifies words using whitespace, and counts lines in the text file.',
    sourceLine: 2131,
    code: `import java.io.*;

public class FileCountDemo {
    public static void main(String[] args) throws IOException {
        FileReader reader = new FileReader("input.txt");

        int characters = 0, words = 0, lines = 0;
        boolean inWord = false;
        int ch;

        while ((ch = reader.read()) != -1) {
            characters++;

            if (ch == '\\n') {
                lines++;
            }

            if (Character.isWhitespace(ch)) {
                inWord = false;
            } else if (!inWord) {
                words++;
                inWord = true;
            }
        }

        reader.close();

        // Count the final line when the file is not empty and has no trailing newline.
        if (characters > 0 && lines == 0) {
            lines = 1;
        } else if (characters > 0) {
            lines++;
        }

        System.out.println("Characters = " + characters);
        System.out.println("Words      = " + words);
        System.out.println("Lines      = " + lines);
    }
}`,
  },
]

export const byteStreamPrograms: Program[] = byteStreams.map((r) => ({
  id: `byte-streams-${r.ref}`,
  ref: r.ref,
  className: r.className,
  title: r.title,
  groupId: byteGroupId,
  code: { language: 'java', fileName: r.fileName, code: r.code },
  outputs: [],
  screenshots: [image(r.screenshot)],
  notes: r.notes ?? [],
  sourceLine: r.sourceLine,
}))

export const charStreamPrograms: Program[] = charStreams.map((r) => ({
  id: `char-streams-${r.ref.split(' ')[1]}`,
  ref: r.ref,
  className: r.className,
  title: r.title,
  groupId: charGroupId,
  code: { language: 'java', code: r.code },
  outputs: [],
  screenshots: [image(r.screenshot)],
  notes: [`Expected result: ${r.note}`],
  sourceLine: r.sourceLine,
}))

export const fileIoSection: Section = {
  id: 'file-io',
  title: 'File I/O',
  order: 8,
  description: 'Byte streams and character streams, gathered from two blocks of the source document.',
  sourceLine: 1852,
  groups: [
    {
      id: byteGroupId,
      title: 'Byte Streams',
      summary: 'Programs 11 to 15 of the 15-program block.',
      sourceLine: 1852,
      blocks: [
        {
          kind: 'programs',
          id: 'byte-stream-programs',
          programIds: byteStreamPrograms.map((p) => p.id),
          sourceLine: 1852,
        },
      ],
    },
    {
      id: charGroupId,
      title: 'Character Streams',
      summary: 'Experiments 1 to 5 of the 12-experiment block.',
      sourceLine: 2036,
      blocks: [
        {
          kind: 'prose',
          id: 'char-streams-note',
          callouts: [
            {
              tone: 'source',
              title: 'No file names in the source document',
              body: 'This block labels each listing simply "Program:" without a file name. The class names shown on these pages are read from the code itself.',
            },
          ],
          sourceLine: 2036,
        },
        {
          kind: 'programs',
          id: 'character-stream-programs',
          programIds: charStreamPrograms.map((p) => p.id),
          sourceLine: 2039,
        },
      ],
    },
  ],
}
