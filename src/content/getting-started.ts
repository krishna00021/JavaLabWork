import type { Section } from './types'
import { image } from './images'

export const gettingStartedSection: Section = {
  id: 'getting-started',
  title: 'Getting Started',
  order: 2,
  description:
    'Java installation and environment configuration exactly as recorded in the source document.',
  sourceLine: 56,
  groups: [
    {
      id: 'install-java-oracle',
      title: 'Install Java — Oracle JDK',
      sourceLine: 56,
      blocks: [
        {
          kind: 'prose',
          id: 'oracle-note',
          callouts: [
            {
              tone: 'note',
              title: 'Two separate installation guides',
              body: 'The source document contains two distinct Java installation and configuration guides. This one uses the Oracle JDK and the standard JAVA_HOME variable. The second guide, "Install Java — OpenJDK 22 (JAVAOPEN_HOME)", uses JAVAOPEN_HOME. They are kept separate and their differences are not reconciled.',
            },
          ],
          sourceLine: 56,
        },
        {
          kind: 'prose',
          id: 'oracle-install',
          title: 'INSTALLATION OF JAVA',
          steps: [
            {
              title: 'Step 1: Download Java JDK',
              entries: [
                { type: 'text', text: 'Open a web browser.' },
                { type: 'text', text: 'Visit the official Oracle JDK website: Oracle JDK Downloads' },
                { type: 'text', text: 'Download the latest JDK for Windows (e.g., JDK 25).' },
                { type: 'image', image: image(1) },
              ],
            },
            {
              title: 'Step 2: Install JDK',
              entries: [
                { type: 'text', text: 'Double-click the downloaded .exe file.' },
                { type: 'text', text: 'Click Next and follow the installation wizard.' },
                { type: 'text', text: 'Complete the installation.' },
                { type: 'image', image: image(2) },
              ],
            },
            {
              title: 'Step 3: Verify Java Installation',
              entries: [
                { type: 'text', text: 'Open Command Prompt.' },
                { type: 'text', text: 'Type:' },
                { type: 'code', code: 'java --version' },
                { type: 'code', label: 'Sample Output', code: 'java 25 2026-09-15' },
                { type: 'text', text: 'Check the Java Compiler:' },
                { type: 'code', code: 'javac --version' },
                { type: 'code', label: 'Sample Output', code: 'javac 25' },
                { type: 'image', image: image(3) },
              ],
            },
          ],
          sourceLine: 57,
        },
      ],
    },
    {
      id: 'configure-java-home',
      title: 'Configure JAVA_HOME and PATH',
      sourceLine: 82,
      blocks: [
        {
          kind: 'prose',
          id: 'configure-java-home-steps',
          title: 'Configuring Java on Windows (Setting JAVA_HOME and PATH)',
          steps: [
            {
              title: 'Step 1: Find Java Installation Path',
              entries: [
                { type: 'text', text: 'After installing Java, locate the JDK folder.' },
                { type: 'text', text: 'Example:' },
                { type: 'code', code: 'C:\\Program Files\\Java\\jdk-26' },
              ],
            },
            {
              title: 'Step 2: Set JAVA_HOME',
              entries: [
                { type: 'text', text: 'Press Windows + R → Type sysdm.cpl → Press Enter.' },
                { type: 'image', image: image(4) },
                { type: 'text', text: 'Select Advanced tab.' },
                { type: 'image', image: image(5) },
                { type: 'text', text: 'Click Environment Variables.' },
                { type: 'image', image: image(6) },
                { type: 'text', text: 'Under System Variables, click New.' },
                { type: 'text', text: 'Enter:' },
                { type: 'code', code: 'Variable Name : JAVA_HOME' },
                { type: 'code', code: 'Variable Value: C:\\Program Files\\Java\\jdk-25' },
                { type: 'text', text: 'Click OK.' },
                { type: 'image', image: image(7) },
              ],
            },
            {
              title: 'Step 3: Update PATH Variable',
              entries: [
                { type: 'text', text: 'Under System Variables, select Path.' },
                { type: 'text', text: 'Click Edit.' },
                { type: 'text', text: 'Click New.' },
                { type: 'text', text: 'Add:' },
                { type: 'code', code: '%JAVA_HOME%\\bin' },
                { type: 'text', text: 'Click OK → OK → OK.' },
                { type: 'image', image: image(8) },
              ],
            },
            {
              title: 'Step 4: Verify Configuration',
              entries: [
                { type: 'text', text: 'Open a new Command Prompt and execute:' },
                { type: 'code', code: 'echo %JAVA_HOME%' },
                { type: 'text', text: 'Output:' },
                { type: 'code', code: 'C:\\Program Files\\Java\\jdk-25' },
                { type: 'text', text: 'Check Java version:' },
                { type: 'code', code: 'java --version' },
                { type: 'text', text: 'Check Java compiler:' },
                { type: 'code', code: 'javac --version' },
                { type: 'code', label: 'Sample Output', code: 'java 25\njavac 25' },
                { type: 'image', image: image(9) },
              ],
            },
          ],
          sourceLine: 83,
        },
      ],
    },
    {
      id: 'common-commands',
      title: 'Common Commands',
      sourceLine: 127,
      blocks: [
        {
          kind: 'prose',
          id: 'common-commands-list',
          entries: [
            { type: 'code', code: 'java --version :: Check Java Runtime' },
            { type: 'code', code: 'javac --version :: Check Java Compiler' },
            { type: 'code', code: 'where java :: Display Java executable path' },
            { type: 'code', code: 'where javac :: Display Java compiler path' },
            { type: 'code', code: 'echo %JAVA_HOME% :: Display JAVA_HOME value' },
          ],
          sourceLine: 128,
        },
      ],
    },
    {
      id: 'install-java-openjdk',
      title: 'Install Java — OpenJDK 22 (JAVAOPEN_HOME)',
      sourceLine: 133,
      blocks: [
        {
          kind: 'prose',
          id: 'openjdk-note',
          callouts: [
            {
              tone: 'note',
              title: 'Separate guide — JAVAOPEN_HOME',
              body: 'This is the second, independent installation guide from the source document. It downloads OpenJDK 22 from openlogic.com and configures JAVAOPEN_HOME rather than JAVA_HOME. The original terminology is preserved exactly as written.',
            },
          ],
          sourceLine: 133,
        },
        {
          kind: 'prose',
          id: 'openjdk-install',
          title: 'INSTALLATION OF JAVA',
          entries: [
            { type: 'text', text: 'Open a web browser.' },
            { type: 'text', text: 'Visit the official Oracle JDK website:' },
            { type: 'code', code: 'https://www.openlogic.com/openjdk-downloads' },
            { type: 'text', text: 'Download the latest JDK(22) for Windows' },
            { type: 'text', text: 'Double-click the downloaded .msi file.' },
            { type: 'text', text: 'Click Next and follow the installation wizard.' },
            { type: 'text', text: 'Complete the installation.' },
            {
              type: 'text',
              text: 'For the verification of java installation, open command prompt and type java -version and javac -version',
            },
            { type: 'image', image: image(10) },
          ],
          sourceLine: 134,
        },
        {
          kind: 'prose',
          id: 'openjdk-config',
          title: 'CONFIGURING JAVA ON WINDOWS',
          entries: [
            { type: 'text', text: 'Set JAVAOPEN_HOME' },
            { type: 'text', text: 'Updating the path variable' },
            { type: 'text', text: 'Verify Configuration' },
            {
              type: 'text',
              text: 'Open a new command prompt and execute echo %JAVAOPEN_HOME%',
            },
            { type: 'text', text: 'Check java version and java compiler' },
            { type: 'image', image: image(11) },
          ],
          sourceLine: 144,
        },
      ],
    },
    {
      id: 'hello-world',
      title: 'Executing Hello World',
      sourceLine: 152,
      blocks: [
        {
          kind: 'prose',
          id: 'hello-world-screens',
          title: 'EXECUTING HELLOWORLD',
          entries: [
            { type: 'image', image: image(12) },
            { type: 'image', image: image(13) },
          ],
          sourceLine: 152,
        },
      ],
    },
  ],
}
