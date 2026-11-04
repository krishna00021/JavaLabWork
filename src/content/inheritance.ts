import type { Program, Section } from './types'
import { image } from './images'

const experimentsGroupId = 'inheritance-experiments'
const programsGroupId = 'inheritance-programs'

/**
 * Experiment 4 and Experiment 5 come from the "Java String Classes and Inheritance
 * Experiments" block; the remaining three come from the separate "Inheritance Programs"
 * block. Two distinct programs in the document share the public class name
 * SuperKeywordDemo, so they are given distinct ids here.
 */
const experiments: Array<{
  ref: string
  title: string
  className: string
  fileName?: string
  code: string
  screenshot: number
  sourceLine: number
}> = [
  {
    ref: 'Experiment 4',
    title: 'Basic Inheritance',
    className: 'BasicInheritanceDemo',
    fileName: 'BasicInheritanceDemo.java',
    screenshot: 31,
    sourceLine: 1353,
    code: `class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void displayPersonDetails() {
        System.out.println("Name       : " + name);
        System.out.println("Age        : " + age);
    }
}

class Student extends Person {
    int rollNumber;
    String branch;

    Student(String name, int age, int rollNumber, String branch) {
        super(name, age);
        this.rollNumber = rollNumber;
        this.branch = branch;
    }

    void displayStudentDetails() {
        displayPersonDetails();
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Branch     : " + branch);
    }
}

public class BasicInheritanceDemo {
    public static void main(String[] args) {
        Student student = new Student(
            "Rahul", 20, 101, "CSE"
        );

        System.out.println("Student Details");
        System.out.println("----------------");
        student.displayStudentDetails();
    }
}`,
  },
  {
    ref: 'Experiment 5',
    title: 'Using super Keyword',
    className: 'SuperKeywordDemo',
    fileName: 'SuperKeywordDemo.java',
    screenshot: 32,
    sourceLine: 1403,
    code: `class Employee {
    String name;
    double salary;

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    void displayDetails() {
        System.out.println("Employee Name : " + name);
        System.out.println("Salary        : " + salary);
    }
}

class Manager extends Employee {
    String department;

    Manager(String name, double salary, String department) {
        super(name, salary); // Calls superclass constructor
        this.department = department;
    }

    void displayDetails() {
        System.out.println("Manager Details");
        System.out.println("----------------");

        // Access superclass variables using super
        System.out.println("Name          : " + super.name);
        System.out.println("Salary        : " + super.salary);

        // Invoke superclass method using super
        System.out.println("\\nUsing super.displayDetails():");
        super.displayDetails();

        System.out.println("Department    : " + department);
    }
}

public class SuperKeywordDemo {
    public static void main(String[] args) {
        Manager manager =
                new Manager("Priya", 75000, "Development");

        manager.displayDetails();
    }
}`,
  },
]

const programs: Array<{
  title: string
  className: string
  problemStatement: string
  code: string
  screenshot: number
  sourceLine: number
}> = [
  {
    title: 'Single Inheritance',
    className: 'SingleInheritanceDemo',
    screenshot: 33,
    sourceLine: 1466,
    problemStatement:
      'Write a Java program to demonstrate single inheritance by creating a Person superclass containing the name and age of a person. Create a Student subclass containing roll number and branch. Inherit the properties of Person and display the complete student details.',
    code: `class Person {
String name;
int age;
Person(String name, int age) {
this.name = name;
this.age = age;
}
void displayPersonDetails() {
System.out.println("Name: " + name);
System.out.println("Age: " + age);
}
}
class Student extends Person {
int rollNumber;
String branch;
Student(String name, int age, int rollNumber, String branch) {
super(name, age);
this.rollNumber = rollNumber;
this.branch = branch;
}
void displayStudentDetails() {
displayPersonDetails();
System.out.println("Roll Number: " + rollNumber);
System.out.println("Branch: " + branch);
}
}
public class SingleInheritanceDemo {
public static void main(String[] args) {
Student student = new Student("Ravi Kumar", 20, 101, "Computer Science");
student.displayStudentDetails();
}
}`,
  },
  {
    title: 'Using super Keyword',
    className: 'SuperKeywordDemo',
    screenshot: 34,
    sourceLine: 1503,
    problemStatement:
      'Write a Java program to demonstrate the use of the super keyword. Create a Vehicle superclass with a speed variable and a display() method. Create a Car subclass with a model variable and override the display() method. Use super to access the superclass variable and method.',
    code: `class Vehicle {
int speed = 60;
void display() {
System.out.println("Vehicle speed: " + speed + " km/h");
}
}
class Car extends Vehicle {
String model = "Sedan";
@Override
void display() {
System.out.println("Superclass speed variable: " + super.speed);
super.display();
System.out.println("Car model: " + model);
}
}
public class SuperKeywordDemo {
public static void main(String[] args) {
Car car = new Car();
car.display();
}
}`,
  },
  {
    title: 'Multilevel Inheritance',
    className: 'MultilevelInheritanceDemo',
    screenshot: 35,
    sourceLine: 1529,
    problemStatement:
      'Write a Java program to demonstrate multilevel inheritance by creating three classes: Person, Employee, and Manager. The Person class should contain personal details, Employee should contain employee details, and Manager should contain department details. Display all the details using inherited properties.',
    code: `class Person {
String name;
int age;
Person(String name, int age) {
this.name = name;
this.age = age;
}
void displayPersonalDetails() {
System.out.println("Name: " + name);
System.out.println("Age: " + age);
}
}
class Employee extends Person {
int employeeId;
double salary;
Employee(String name, int age, int employeeId, double salary) {
super(name, age);
this.employeeId = employeeId;
this.salary = salary;
}
void displayEmployeeDetails() {
displayPersonalDetails();
System.out.println("Employee ID: " + employeeId);
System.out.println("Salary: " + salary);
}
}
class Manager extends Employee {
String department;
Manager(String name, int age, int employeeId, double salary, String department) {
super(name, age, employeeId, salary);
this.department = department;
}
void displayManagerDetails() {
displayEmployeeDetails();
System.out.println("Department: " + department);
}
}
public class MultilevelInheritanceDemo {
public static void main(String[] args) {
Manager manager = new Manager("Anita Sharma", 35, 5001, 85000.0, "Human Resources");
manager.displayManagerDetails();
}
}`,
  },
]

export const inheritanceExperimentPrograms: Program[] = experiments.map((r) => ({
  id: `inheritance-exp-${r.ref.split(' ')[1]}`,
  ref: r.ref,
  className: r.className,
  title: r.title,
  groupId: experimentsGroupId,
  code: { language: 'java', fileName: r.fileName, code: r.code },
  outputs: [],
  screenshots: [image(r.screenshot)],
  notes: ['The screenshot above shows the program being compiled and executed from a command prompt, along with its output.'],
  sourceLine: r.sourceLine,
}))

export const inheritanceStatementPrograms: Program[] = programs.map((r, i) => ({
  id: `inheritance-stmt-${i + 1}`,
  className: r.className,
  title: r.title,
  groupId: programsGroupId,
  problemStatement: r.problemStatement,
  code: { language: 'java', code: r.code },
  outputs: [],
  screenshots: [image(r.screenshot)],
  notes: [],
  sourceLine: r.sourceLine,
}))

export const inheritanceSection: Section = {
  id: 'inheritance',
  title: 'Inheritance',
  order: 6,
  description:
    'Single inheritance, multilevel inheritance and the super keyword, drawn from two blocks of the source document.',
  sourceLine: 1353,
  groups: [
    {
      id: experimentsGroupId,
      title: 'Experiments with Command Prompt Output',
      summary:
        'Experiment 4 and Experiment 5 from the "Java String Classes and Inheritance Experiments" block.',
      sourceLine: 1353,
      blocks: [
        {
          kind: 'programs',
          id: 'inheritance-experiments',
          programIds: inheritanceExperimentPrograms.map((p) => p.id),
          sourceLine: 1353,
        },
      ],
    },
    {
      id: programsGroupId,
      title: 'Inheritance Programs',
      sourceLine: 1465,
      blocks: [
        {
          kind: 'programs',
          id: 'inheritance-programs',
          programIds: inheritanceStatementPrograms.map((p) => p.id),
          sourceLine: 1466,
        },
      ],
    },
  ],
}
