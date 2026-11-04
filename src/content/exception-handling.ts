import type { Program, Section } from './types'
import { image } from './images'

const groupId = 'exception-handling-programs'

const raw: Array<{
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
    ref: '1',
    title: 'Try-Catch: Division by Zero',
    className: 'DivisionByZeroDemo',
    fileName: 'DivisionByZeroDemo.java',
    screenshot: 36,
    sourceLine: 1596,
    code: `public class DivisionByZeroDemo {
    public static void main(String[] args) {
        try {
            int a = 10;
            int b = 0;
            int result = a / b;
            System.out.println("Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("Exception handled: " + e);
        }

        System.out.println("Program continues normally.");
    }
}`,
  },
  {
    ref: '2',
    title: 'Different Types of Exceptions',
    className: 'ExceptionTypesDemo',
    fileName: 'ExceptionTypesDemo.java',
    screenshot: 37,
    sourceLine: 1616,
    code: `public class ExceptionTypesDemo {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("1. ArithmeticException handled.");
        }

        try {
            int[] a = {10, 20, 30};
            System.out.println(a[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("2. ArrayIndexOutOfBoundsException handled.");
        }

        try {
            String s = null;
            System.out.println(s.length());
        } catch (NullPointerException e) {
            System.out.println("3. NullPointerException handled.");
        }
    }
}`,
  },
  {
    ref: '3',
    title: 'Uncaught Exception and Default JVM Message',
    className: 'UncaughtExceptionDemo',
    fileName: 'UncaughtExceptionDemo.java',
    screenshot: 38,
    sourceLine: 1645,
    notes: [
      'Note: This program intentionally has no catch block. Therefore, the JVM prints the default exception message and stack trace.',
    ],
    code: `public class UncaughtExceptionDemo {
    public static void main(String[] args) {
        int a = 25;
        int b = 0;

        // No try-catch is used here, so the exception is uncaught.
        System.out.println("Starting program...");
        System.out.println(a / b);
        System.out.println("This line will not execute.");
    }
}`,
  },
  {
    ref: '4',
    title: 'Multiple Exceptions Using Multiple Catch Clauses',
    className: 'MultipleCatchDemo',
    fileName: 'MultipleCatchDemo.java',
    screenshot: 39,
    sourceLine: 1663,
    code: `public class MultipleCatchDemo {
    public static void main(String[] args) {
        try {
            int choice = 2;

            if (choice == 1) {
                System.out.println(10 / 0);
            } else if (choice == 2) {
                int[] numbers = {10, 20, 30};
                System.out.println(numbers[5]);
            }
        } catch (ArithmeticException e) {
            System.out.println("ArithmeticException caught.");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("ArrayIndexOutOfBoundsException caught.");
        } catch (Exception e) {
            System.out.println("General Exception caught.");
        }

        System.out.println("Program completed.");
    }
}`,
  },
  {
    ref: '5',
    title: 'throw Statement',
    className: 'ThrowDemo',
    fileName: 'ThrowDemo.java',
    screenshot: 40,
    sourceLine: 1691,
    code: `public class ThrowDemo {
    static void checkAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Age must be 18 or above.");
        }
        System.out.println("Eligible to vote.");
    }

    public static void main(String[] args) {
        try {
            int age = 16;
            System.out.println("Age = " + age);
            checkAge(age);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }
    }
}`,
  },
  {
    ref: '6',
    title: 'throws Keyword: Propagating an Exception',
    className: 'ThrowsDemo',
    fileName: 'ThrowsDemo.java',
    screenshot: 41,
    sourceLine: 1715,
    code: `public class ThrowsDemo {
    static void divide() throws ArithmeticException {
        int a = 20;
        int b = 0;
        System.out.println("Result = " + (a / b));
    }

    public static void main(String[] args) {
        try {
            divide();
        } catch (ArithmeticException e) {
            System.out.println("Exception received by main: " + e);
        }
    }
}`,
  },
  {
    ref: '7',
    title: 'finally Block',
    className: 'FinallyDemo',
    fileName: 'FinallyDemo.java',
    screenshot: 42,
    sourceLine: 1736,
    code: `public class FinallyDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 2;
            System.out.println("Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("Exception caught.");
        } finally {
            System.out.println("finally block executed.");
        }

        System.out.println("Program completed.");
    }
}`,
  },
  {
    ref: '8',
    title: 'User-Defined Exception',
    className: 'UserDefinedExceptionDemo',
    fileName: 'UserDefinedExceptionDemo.java',
    screenshot: 43,
    sourceLine: 1756,
    code: `class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}

public class UserDefinedExceptionDemo {
    static void withdraw(double balance, double amount)
            throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(
                "Insufficient balance for withdrawal."
            );
        }
        System.out.println("Withdrawal successful.");
    }

    public static void main(String[] args) {
        try {
            double balance = 5000;
            double amount = 6500;
            System.out.println("Balance = " + balance);
            System.out.println("Withdrawal = " + amount);
            withdraw(balance, amount);
        } catch (InsufficientBalanceException e) {
            System.out.println("Custom exception caught: " + e.getMessage());
        }
    }
}`,
  },
  {
    ref: '9',
    title: 'Custom Exception for Invalid Marks',
    className: 'MarksValidationDemo',
    fileName: 'MarksValidationDemo.java',
    screenshot: 44,
    sourceLine: 1791,
    code: `class InvalidMarksException extends Exception {
    public InvalidMarksException(String message) {
        super(message);
    }
}

public class MarksValidationDemo {
    static void validateMarks(int marks) throws InvalidMarksException {
        if (marks < 0 || marks > 100) {
            throw new InvalidMarksException(
                "Marks must be between 0 and 100."
            );
        }
        System.out.println("Valid marks: " + marks);
    }

    public static void main(String[] args) {
        try {
            int marks = 125;
            System.out.println("Entered marks = " + marks);
            validateMarks(marks);
        } catch (InvalidMarksException e) {
            System.out.println("Custom exception caught: " + e.getMessage());
        }
    }
}`,
  },
  {
    ref: '10',
    title: 'Combined try, Multiple catch, throw, throws and finally',
    className: 'CombinedExceptionDemo',
    fileName: 'CombinedExceptionDemo.java',
    screenshot: 45,
    sourceLine: 1823,
    code: `public class CombinedExceptionDemo {
    static void checkNumber(int number) throws Exception {
        if (number < 0) {
            throw new Exception("Number cannot be negative.");
        }
        System.out.println("Number is valid: " + number);
        System.out.println("10 / number = " + (10 / number));
    }

    public static void main(String[] args) {
        try {
            int number = 0;
            System.out.println("Input number = " + number);
            checkNumber(number);
        } catch (ArithmeticException e) {
            System.out.println("ArithmeticException caught.");
        } catch (Exception e) {
            System.out.println("Exception caught: " + e.getMessage());
        } finally {
            System.out.println("finally block executed.");
        }
    }
}`,
  },
]

export const exceptionPrograms: Program[] = raw.map((r) => ({
  id: `exceptions-${r.ref}`,
  ref: r.ref,
  className: r.className,
  title: r.title,
  groupId,
  code: { language: 'java', fileName: r.fileName, code: r.code },
  outputs: [],
  screenshots: [image(r.screenshot)],
  notes: r.notes ?? [],
  sourceLine: r.sourceLine,
}))

export const exceptionHandlingSection: Section = {
  id: 'exception-handling',
  title: 'Exception Handling',
  order: 7,
  description: 'Ten exception-handling programs from the source document.',
  sourceLine: 1577,
  groups: [
    {
      id: groupId,
      title: 'Exception Handling Programs',
      summary: 'Programs 1 to 10 of the 15-program block.',
      sourceLine: 1577,
      blocks: [
        {
          kind: 'prose',
          id: 'exceptions-intro',
          paragraphs: [
            'This laboratory record contains the requested Java programs. Each program includes source code, a command-prompt-style screenshot of its output, and the supporting input files where required.',
          ],
          sourceLine: 1579,
        },
        {
          kind: 'programs',
          id: 'exceptions-programs',
          programIds: exceptionPrograms.map((p) => p.id),
          sourceLine: 1596,
        },
      ],
    },
  ],
}
