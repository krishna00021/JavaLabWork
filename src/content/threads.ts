import type { Program, Section } from './types'
import { image } from './images'

const groupId = 'thread-programs'

const raw: Array<{
  ref: string
  title: string
  className: string
  code: string
  screenshot: number
  note: string
  sourceLine: number
}> = [
  {
    ref: 'Experiment 6',
    title: 'Demonstrate the Main Thread',
    className: 'MainThreadDemo',
    screenshot: 56,
    note: 'The program executes successfully and produces the output shown above.',
    sourceLine: 2177,
    code: `public class MainThreadDemo {
    public static void main(String[] args) {
        Thread t = Thread.currentThread();

        System.out.println("Thread name     : " + t.getName());
        System.out.println("Thread priority : " + t.getPriority());
        System.out.println("Thread state    : " + t.getState());
    }
}`,
  },
  {
    ref: 'Experiment 7',
    title: 'Create a Thread by Extending Thread',
    className: 'ExtendsThreadDemo',
    screenshot: 57,
    note: 'The program executes successfully and produces the output shown above.',
    sourceLine: 2193,
    code: `class MyThread extends Thread {
    public void run() {
        System.out.println("Child thread is running.");
        System.out.println("Thread name: " + getName());
    }
}

public class ExtendsThreadDemo {
    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start();

        System.out.println("Main thread is running.");
    }
}`,
  },
  {
    ref: 'Experiment 8',
    title: 'Create a Thread by Implementing Runnable',
    className: 'RunnableDemo',
    screenshot: 58,
    note: 'The program executes successfully and produces the output shown above.',
    sourceLine: 2215,
    code: `class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable thread is running.");
        System.out.println("Thread name: " + Thread.currentThread().getName());
    }
}

public class RunnableDemo {
    public static void main(String[] args) {
        Thread t = new Thread(new MyRunnable());
        t.start();

        System.out.println("Main thread is running.");
    }
}`,
  },
  {
    ref: 'Experiment 9',
    title: 'Multiple Threads and Concurrent Execution',
    className: 'MultipleThreadsDemo',
    screenshot: 59,
    note: 'The three threads execute concurrently. The exact order can change from run to run.',
    sourceLine: 2237,
    code: `class Worker extends Thread {
    private String task;

    Worker(String task) {
        this.task = task;
    }

    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(task + " - step " + i);
        }
    }
}

public class MultipleThreadsDemo {
    public static void main(String[] args) {
        Worker t1 = new Worker("Thread 1");
        Worker t2 = new Worker("Thread 2");
        Worker t3 = new Worker("Thread 3");

        t1.start();
        t2.start();
        t3.start();
    }
}`,
  },
  {
    ref: 'Experiment 10',
    title: 'Demonstrate isAlive()',
    className: 'IsAliveDemo',
    screenshot: 60,
    note: 'isAlive() is false before start, true while the thread is running, and false after the thread completes.',
    sourceLine: 2269,
    code: `class MyThread extends Thread {
    public void run() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            System.out.println(e);
        }
        System.out.println("Child thread completed.");
    }
}

public class IsAliveDemo {
    public static void main(String[] args) throws InterruptedException {
        MyThread t = new MyThread();

        System.out.println("Before start: " + t.isAlive());
        t.start();
        System.out.println("After start : " + t.isAlive());

        t.join();
        System.out.println("After completion: " + t.isAlive());
    }
}`,
  },
  {
    ref: 'Experiment 11',
    title: 'Demonstrate join()',
    className: 'JoinDemo',
    screenshot: 61,
    note: 'join() makes the main thread wait until the child thread finishes.',
    sourceLine: 2299,
    code: `class MyThread extends Thread {
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Child thread: " + i);
        }
    }
}

public class JoinDemo {
    public static void main(String[] args) throws InterruptedException {
        MyThread t = new MyThread();
        t.start();

        t.join();

        System.out.println("Main thread continues after child thread completes.");
    }
}`,
  },
  {
    ref: 'Experiment 12',
    title: 'Use isAlive() and join() to Control Execution Order',
    className: 'AliveJoinDemo',
    screenshot: 62,
    note: 'isAlive() and join() are used together so Thread 2 starts only after Thread 1 has completed.',
    sourceLine: 2324,
    code: `class TaskThread extends Thread {
    private String task;

    TaskThread(String task) {
        this.task = task;
    }

    public void run() {
        for (int i = 1; i <= 2; i++) {
            System.out.println(task + " - step " + i);
        }
    }
}

public class AliveJoinDemo {
    public static void main(String[] args) throws InterruptedException {
        TaskThread t1 = new TaskThread("Thread 1");
        TaskThread t2 = new TaskThread("Thread 2");

        t1.start();
        System.out.println("Thread 1 alive: " + t1.isAlive());

        t1.join();
        System.out.println("Thread 1 alive after join: " + t1.isAlive());

        t2.start();
        t2.join();

        System.out.println("Both threads completed.");
    }
}`,
  },
]

export const threadPrograms: Program[] = raw.map((r) => ({
  id: `threads-${r.ref.split(' ')[1]}`,
  ref: r.ref,
  className: r.className,
  title: r.title,
  groupId,
  code: { language: 'java', code: r.code },
  outputs: [],
  screenshots: [image(r.screenshot)],
  notes: [`Expected result: ${r.note}`],
  sourceLine: r.sourceLine,
}))

export const threadsSection: Section = {
  id: 'threads',
  title: 'Threads',
  order: 9,
  description: 'Thread creation, isAlive(), join() and execution-order control.',
  sourceLine: 2036,
  groups: [
    {
      id: groupId,
      title: 'Thread Programs',
      summary: 'Experiments 6 to 12 of the 12-experiment block.',
      sourceLine: 2036,
      blocks: [
        {
          kind: 'prose',
          id: 'threads-note',
          paragraphs: [
            'Note: The command-prompt images show representative successful outputs. Thread scheduling is nondeterministic, so the order of lines may vary when you execute the thread programs.',
          ],
          sourceLine: 2038,
        },
        {
          kind: 'programs',
          id: 'thread-programs',
          programIds: threadPrograms.map((p) => p.id),
          sourceLine: 2177,
        },
      ],
    },
  ],
}
