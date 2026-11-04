import type { Program, Section } from './types'

const groupId = 'oop-source-collection'

/**
 * The source document gives only a program identifier, the literal text "Source Code:",
 * and the code itself. It contains no headings and no output text for this block, so the
 * titles below are derived strictly from what each program's code demonstrates, and the
 * `outputs` arrays are intentionally empty.
 */
const raw: Array<{ ref: string; title: string; code: string; sourceLine: number }> = [
  {
    ref: 'program1_1',
    title: 'Instance Fields and Object Creation',
    sourceLine: 204,
    code: `class Student{
int Roll_Number;
String Name;
double CGPA;
String Branch;
void display(){
System.out.println(Roll_Number);
System.out.println(Name);
System.out.println(CGPA);
System.out.println(Branch);
}
}
public class program1_1{
public static void main(String[] args){
Student s1=new Student();
s1.Roll_Number=25;
s1.Name="ravi";
s1.CGPA=9.00;
s1.Branch="AIML";
s1.display();
}
}`,
  },
  {
    ref: 'program2_1',
    title: 'Constructor with this',
    sourceLine: 228,
    code: `class Book{
String name;
int price;
Book(String name,int price){
this.name=name;
this.price=price;
}
void display(){
System.out.println(name);
System.out.println(price);
}
}
public class program2_1{
public static void main(String[] args){
Book b1=new Book("rhymes",200);
Book b2=new Book("poems",150);
Book b3=new Book("Jee",400);
b1.display();
b2.display();
b3.display();
}
}`,
  },
  {
    ref: 'program2_2',
    title: 'Array of Objects with Scanner Input',
    sourceLine: 252,
    code: `import java.util.Scanner;
class Student{
int roll;
String name;
Student(int roll,String name){
this.roll=roll;
this.name=name;
}
}
public class program2_2{
public static void main(String[] args){
Student[] students=new Student[5];
for(int i=0;i<students.length;i++){
Scanner sc=new Scanner(System.in);
int roll=sc.nextInt();
String name=sc.nextLine();
Student[i]=new Student(roll,name);
}
for(Student s:students){
System.out.println(s.roll);
System.out.println(s.name);
}
}
sc.close();
}`,
  },
  {
    ref: 'Program3_1',
    title: 'Two References to the Same Object',
    sourceLine: 279,
    code: `class Student {
    String name;
    int age;

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

public class program3_1{
    public static void main(String[] args) {
        Student s1 = new Student();


        s1.name = "Rahul";
        s1.age = 20;

        Student s2 = s1;

        s2.name = "Arjun";
        s2.age = 21;


        System.out.println("Student details using s1:");
        s1.display();

        System.out.println("\\nStudent details using s2:");
        s2.display();
    }
}`,
  },
  {
    ref: 'Program3_2',
    title: 'Comparing Object References with ==',
    sourceLine: 312,
    code: `class Employee {
    int id;
    String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

public class Program3_2 {
    public static void main(String[] args) {

        // Create one Employee object
        Employee emp = new Employee(101, "Rahul");

        // Two reference variables pointing to the same object
        Employee ref1 = emp;
        Employee ref2 = emp;

        // Compare the references using ==
        System.out.println("Are ref1 and ref2 pointing to the same object? "
                + (ref1 == ref2));
    }
}`,
  },
  {
    ref: 'Program4_1',
    title: 'Methods with Parameters and Return Values',
    sourceLine: 339,
    code: `class Calculator {

    // Method for addition
    int add(int a, int b) {
        return a + b;
    }

    // Method for subtraction
    int subtract(int a, int b) {
        return a - b;
    }

    // Method for multiplication
    int multiply(int a, int b) {
        return a * b;
    }

    // Method for division
    double divide(int a, int b) {
        return (double) a / b;
    }
}

public class Program4_1 {
    public static void main(String[] args) {

        Calculator calc = new Calculator();

        int a = 20;
        int b = 10;

        System.out.println("Addition: " + calc.add(a, b));
        System.out.println("Subtraction: " + calc.subtract(a, b));
        System.out.println("Multiplication: " + calc.multiply(a, b));
        System.out.println("Division: " + calc.divide(a, b));
    }
}`,
  },
  {
    ref: 'Program4_2',
    title: 'Constructor with Methods Returning Area and Perimeter',
    sourceLine: 378,
    code: `class Rectangle {
    double length;
    double width;

    // Constructor
    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    // Method to calculate area
    double calculateArea() {
        return length * width;
    }

    // Method to calculate perimeter
    double calculatePerimeter() {
        return 2 * (length + width);
    }

    // Method to display results
    void display() {
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Area: " + calculateArea());
        System.out.println("Perimeter: " + calculatePerimeter());
    }
}

public class Program4_2 {
    public static void main(String[] args) {

        Rectangle rectangle = new Rectangle(10, 5);

        rectangle.display();
    }
}`,
  },
  {
    ref: 'Program5_1',
    title: 'Default and Parameterized Constructors',
    sourceLine: 417,
    code: `class Student {
    int rollNo;
    String name;
    int age;

    // Default constructor
    Student() {
        rollNo = 0;
        name = "Unknown";
        age = 0;
    }

    // Parameterized constructor
    Student(int rollNo, String name, int age) {
        this.rollNo = rollNo;
        this.name = name;
        this.age = age;
    }

    // Method to display student information
    void display() {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println();
    }
}

public class Program5_1 {
    public static void main(String[] args) {

        // Object using default constructor
        Student s1 = new Student();

        // Object using parameterized constructor
        Student s2 = new Student(101, "Rahul", 20);

        System.out.println("Student 1:");
        s1.display();

        System.out.println("Student 2:");
        s2.display();
    }
}`,
  },
  {
    ref: 'Program5_2',
    title: 'Constructor Overloading',
    sourceLine: 463,
    code: `class BankAccount {
    int accountNo;
    String name;
    double balance;

    // Constructor with no arguments
    BankAccount() {
        accountNo = 0;
        name = "Unknown";
        balance = 0.0;
    }

    // Constructor with account number and name
    BankAccount(int accountNo, String name) {
        this.accountNo = accountNo;
        this.name = name;
        balance = 0.0;
    }

    // Constructor with account number, name, and balance
    BankAccount(int accountNo, String name, double balance) {
        this.accountNo = accountNo;
        this.name = name;
        this.balance = balance;
    }

    // Method to display account details
    void display() {
        System.out.println("Account No: " + accountNo);
        System.out.println("Name: " + name);
        System.out.println("Balance: " + balance);
        System.out.println();
    }
}

public class Program5_2 {
    public static void main(String[] args) {

        // Using different constructors
        BankAccount account1 = new BankAccount();
        BankAccount account2 = new BankAccount(1001, "Rahul");
        BankAccount account3 = new BankAccount(1002, "Amit", 50000.0);

        System.out.println("Account 1:");
        account1.display();

        System.out.println("Account 2:");
        account2.display();

        System.out.println("Account 3:");
        account3.display();
    }
}`,
  },
  {
    ref: 'Program6_1',
    title: 'The this Keyword Referencing Instance Variables',
    sourceLine: 518,
    code: `class Student {
    int rollNo;
    String name;

    // Constructor
    Student(int rollNo, String name) {
        // 'this' refers to the instance variables
        this.rollNo = rollNo;
        this.name = name;
    }

    // Method to display student details
    void display() {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
    }
}

public class Program6_1 {
    public static void main(String[] args) {

        Student s1 = new Student(101, "Rahul");

        s1.display();
    }
}`,
  },
  {
    ref: 'Program6_2',
    title: 'Constructor Chaining with this()',
    sourceLine: 546,
    code: `class Student {
    int rollNo;
    String name;
    int age;

    // Default constructor
    Student() {
        this(101, "Rahul", 20);
    }

    // Two-parameter constructor
    Student(int rollNo, String name) {
        this(rollNo, name, 20);
    }

    // Three-parameter constructor
    Student(int rollNo, String name, int age) {
        this.rollNo = rollNo;
        this.name = name;
        this.age = age;
    }

    // Method to display student details
    void display() {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

public class Program6_2 {
    public static void main(String[] args) {

        // Calls default constructor
        Student s1 = new Student();

        System.out.println("Student 1:");
        s1.display();

        System.out.println();

        // Calls two-parameter constructor
        Student s2 = new Student(102, "Amit");

        System.out.println("Student 2:");
        s2.display();
    }
}`,
  },
  {
    ref: 'Program7_1',
    title: 'finalize() and System.gc()',
    sourceLine: 596,
    code: `class Demo {

    // Method called before object is garbage collected
    @Override
    protected void finalize() {
        System.out.println("Object is garbage collected");
    }
}

public class Program7_1 {
    public static void main(String[] args) {

        // Create multiple objects
        Demo obj1 = new Demo();
        Demo obj2 = new Demo();
        Demo obj3 = new Demo();

        // Make objects eligible for garbage collection
        obj1 = null;
        obj2 = null;
        obj3 = null;

        // Request the JVM to perform garbage collection
        System.gc();

        System.out.println("Garbage collection requested.");
    }
}`,
  },
  {
    ref: 'Program7_2',
    title: 'Objects Eligible for Garbage Collection',
    sourceLine: 626,
    code: `class Test {
    String name;

    Test(String name) {
        this.name = name;
    }

    void display() {
        System.out.println("Object: " + name);
    }
}

public class Program7_2 {
    public static void main(String[] args) {

        // 1. Null assignment
        Test obj1 = new Test("Object 1");
        obj1 = null;

        // 2. Reassignment
        Test obj2 = new Test("Object 2");
        obj2 = new Test("Object 3");

        // The original Object 2 is now eligible for GC

        // 3. Anonymous object
        new Test("Anonymous Object");

        // Request garbage collection
        System.gc();

        System.out.println("Objects made eligible for garbage collection.");
    }
}`,
  },
  {
    ref: 'Program8_1',
    title: 'Method Overloading in Calculator',
    sourceLine: 662,
    code: `class Calculator {

    // Add two integers
    int add(int a, int b) {
        return a + b;
    }

    // Add three integers
    int add(int a, int b, int c) {
        return a + b + c;
    }

    // Add two double values
    double add(double a, double b) {
        return a + b;
    }
}

public class Program8_1 {
    public static void main(String[] args) {

        Calculator calc = new Calculator();

        System.out.println("Sum of two integers: "
                + calc.add(10, 20));

        System.out.println("Sum of three integers: "
                + calc.add(10, 20, 30));

        System.out.println("Sum of two decimal numbers: "
                + calc.add(10.5, 20.5));
    }
}`,
  },
  {
    ref: 'Program8_2',
    title: 'Method Overloading with Different Signatures',
    sourceLine: 697,
    code: `class Area {

    // Area of a circle
    double area(double radius) {
        return Math.PI * radius * radius;
    }

    // Area of a rectangle
    double area(double length, double width) {
        return length * width;
    }

    // Area of a square
    int area(int side) {
        return side * side;
    }
}

public class Program8_2 {
    public static void main(String[] args) {

        Area obj = new Area();

        // Circle
        System.out.println("Area of Circle: "
                + obj.area(5.0));

        // Rectangle
        System.out.println("Area of Rectangle: "
                + obj.area(10.0, 5.0));

        // Square
        System.out.println("Area of Square: "
                + obj.area(4));
    }
}`,
  },
  {
    ref: 'Program9_1',
    title: 'Passing an Object as a Method Parameter',
    sourceLine: 735,
    code: `class Student {
    int rollNo;
    String name;
    int age;

    // Constructor
    Student(int rollNo, String name, int age) {
        this.rollNo = rollNo;
        this.name = name;
        this.age = age;
    }
}

public class Program9_1 {

    // Method that accepts a Student object
    static void displayStudent(Student s) {
        System.out.println("Student Details:");
        System.out.println("Roll No: " + s.rollNo);
        System.out.println("Name: " + s.name);
        System.out.println("Age: " + s.age);
    }

    public static void main(String[] args) {

        // Create Student object
        Student student = new Student(101, "Rahul", 20);

        // Pass object as a parameter
        displayStudent(student);
    }
}`,
  },
  {
    ref: 'Program9_2',
    title: 'Passing Two Objects and Comparing Fields',
    sourceLine: 769,
    code: `class Employee {
    String name;
    double salary;

    // Constructor
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
}

public class Program9_2 {

    // Method that accepts two Employee objects
    static void compareSalary(Employee e1, Employee e2) {

        if (e1.salary > e2.salary) {
            System.out.println("Employee with higher salary:");
            System.out.println("Name: " + e1.name);
            System.out.println("Salary: " + e1.salary);
        }
        else if (e2.salary > e1.salary) {
            System.out.println("Employee with higher salary:");
            System.out.println("Name: " + e2.name);
            System.out.println("Salary: " + e2.salary);
        }
        else {
            System.out.println("Both employees have the same salary.");
        }
    }

    public static void main(String[] args) {

        // Create two Employee objects
        Employee emp1 = new Employee("Rahul", 45000);
        Employee emp2 = new Employee("Amit", 55000);

        // Pass both objects to the method
        compareSalary(emp1, emp2);
    }
}`,
  },
  {
    ref: 'Program10_1',
    title: 'Returning an Object from a Method',
    sourceLine: 812,
    code: `class Student {
    int rollNo;
    String name;
    int age;

    // Constructor
    Student(int rollNo, String name, int age) {
        this.rollNo = rollNo;
        this.name = name;
        this.age = age;
    }

    // Method to display student details
    void display() {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

public class Program10_1 {

    // Method that creates and returns a Student object
    static Student createStudent() {
        Student s = new Student(101, "Rahul", 20);
        return s;
    }

    public static void main(String[] args) {

        // Receive the returned object
        Student student = createStudent();

        // Display the returned object's details
        System.out.println("Student Details:");
        student.display();
    }
}`,
  },
  {
    ref: 'Program10_2',
    title: 'Returning a Modified Object from a Method',
    sourceLine: 852,
    code: `class BankAccount {
    int accountNo;
    String name;
    double balance;

    // Constructor
    BankAccount(int accountNo, String name, double balance) {
        this.accountNo = accountNo;
        this.name = name;
        this.balance = balance;
    }

    // Method to display account details
    void display() {
        System.out.println("Account No: " + accountNo);
        System.out.println("Name: " + name);
        System.out.println("Balance: " + balance);
    }
}

public class Program10_2 {

    // Method to update balance and return the object
    static BankAccount updateBalance(BankAccount account, double amount) {
        account.balance = account.balance + amount;
        return account;
    }

    public static void main(String[] args) {

        // Create a BankAccount object
        BankAccount account = new BankAccount(1001, "Rahul", 50000);

        System.out.println("Before updating balance:");
        account.display();

        // Update balance and receive returned object
        account = updateBalance(account, 10000);

        System.out.println("\\nAfter updating balance:");
        account.display();
    }
}`,
  },
  {
    ref: 'Program11_1',
    title: 'Static Variable Shared by All Objects',
    sourceLine: 897,
    code: `class Student {
    int rollNo;
    String name;

    // Static variable shared by all objects
    static int count = 0;

    Student(int rollNo, String name) {
        this.rollNo = rollNo;
        this.name = name;
        count++;
    }

    void display() {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
    }
}

public class Program11_1 {
    public static void main(String[] args) {

        Student s1 = new Student(101, "Rahul");
        Student s2 = new Student(102, "Amit");
        Student s3 = new Student(103, "Priya");

        s1.display();
        s2.display();
        s3.display();

        System.out.println("Total Students: " + Student.count);
    }
}`,
  },
  {
    ref: 'Program11_2',
    title: 'Static Methods',
    sourceLine: 932,
    code: `class MathUtility {

    // Static method to calculate square
    static int square(int n) {
        return n * n;
    }

    // Static method to calculate cube
    static int cube(int n) {
        return n * n * n;
    }

    // Static method to calculate factorial
    static int factorial(int n) {
        int fact = 1;

        for (int i = 1; i <= n; i++) {
            fact = fact * i;
        }

        return fact;
    }
}

public class Program11_2 {
    public static void main(String[] args) {

        int number = 5;

        System.out.println("Number: " + number);
        System.out.println("Square: " + MathUtility.square(number));
        System.out.println("Cube: " + MathUtility.cube(number));
        System.out.println("Factorial: " + MathUtility.factorial(number));
    }
}`,
  },
  {
    ref: 'Program12_1',
    title: 'final Class, final Variable and final Method',
    sourceLine: 969,
    code: `// Final class cannot be inherited
final class FinalClass {
    void display() {
        System.out.println("This is a final class.");
    }
}

class Parent {

    // Final variable cannot be changed
    final int VALUE = 100;

    // Final method cannot be overridden
    final void show() {
        System.out.println("This is a final method.");
    }
}

class Child extends Parent {
    void display() {
        System.out.println("Child class method.");
    }
}

public class Program12_1 {
    public static void main(String[] args) {

        Parent obj = new Parent();

        System.out.println("Final variable: " + obj.VALUE);

        obj.show();

        FinalClass fc = new FinalClass();
        fc.display();

        Child child = new Child();
        child.display();
    }
}`,
  },
  {
    ref: 'Program12_2',
    title: 'Blank final Variable Initialized in a Constructor',
    sourceLine: 1011,
    code: `class Employee {
    // Blank final variable
    final int employeeId;

    String name;

    // Static counter for generating unique IDs
    static int nextId = 1000;

    // Constructor initializes the blank final variable
    Employee(String name) {
        this.name = name;
        this.employeeId = ++nextId;
    }

    void display() {
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Name: " + name);
        System.out.println();
    }
}

public class Program12_2 {
    public static void main(String[] args) {

        Employee e1 = new Employee("Rahul");
        Employee e2 = new Employee("Amit");
        Employee e3 = new Employee("Priya");

        e1.display();
        e2.display();
        e3.display();
    }
}`,
  },
  {
    ref: 'Program13_1',
    title: 'Static Nested Class',
    sourceLine: 1047,
    code: `class College {
    static String collegeName = "ABC Engineering College";

    // Static nested class
    static class Department {
        String departmentName;
        String hod;

        Department(String departmentName, String hod) {
            this.departmentName = departmentName;
            this.hod = hod;
        }

        void display() {
            System.out.println("College: " + collegeName);
            System.out.println("Department: " + departmentName);
            System.out.println("HOD: " + hod);
        }
    }
}

public class Program13_1 {
    public static void main(String[] args) {

        // Creating object of static nested class
        College.Department dept =
                new College.Department("Computer Science", "Dr. Kumar");

        dept.display();
    }
}`,
  },
  {
    ref: 'Program13_2',
    title: 'Static Nested Class Referenced by Outer Class Name',
    sourceLine: 1080,
    code: `class Employee {
    int employeeId;
    String name;

    Employee(int employeeId, String name) {
        this.employeeId = employeeId;
        this.name = name;
    }

    // Static nested Address class
    static class Address {
        String city;
        String state;

        Address(String city, String state) {
            this.city = city;
            this.state = state;
        }

        void display() {
            System.out.println("City: " + city);
            System.out.println("State: " + state);
        }
    }

    void displayEmployee() {
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Name: " + name);
    }
}

public class Program13_2 {
    public static void main(String[] args) {

        Employee emp = new Employee(101, "Rahul");

        // Creating static nested Address object
        Employee.Address address =
                new Employee.Address("Vijayawada", "Andhra Pradesh");

        emp.displayEmployee();

        System.out.println("Address:");
        address.display();
    }
}`,
  },
  {
    ref: 'Program14_1',
    title: 'Non-Static Inner Class',
    sourceLine: 1128,
    code: `class Student {
    int rollNo;
    String name;

    Student(int rollNo, String name) {
        this.rollNo = rollNo;
        this.name = name;
    }

    void displayStudent() {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
    }

    // Non-static inner class
    class Address {
        String city;
        String state;

        Address(String city, String state) {
            this.city = city;
            this.state = state;
        }

        void displayAddress() {
            System.out.println("City: " + city);
            System.out.println("State: " + state);
        }
    }
}

public class Program14_1 {
    public static void main(String[] args) {

        Student student = new Student(101, "Rahul");

        // Creating inner class object
        Student.Address address =
                student.new Address("Vijayawada", "Andhra Pradesh");

        System.out.println("Student Details:");
        student.displayStudent();

        System.out.println("Address Details:");
        address.displayAddress();
    }
}`,
  },
  {
    ref: 'Program14_2',
    title: 'Inner Class Accessing Outer Class Fields',
    sourceLine: 1177,
    code: `class Library {
    String libraryName;
    String location;

    Library(String libraryName, String location) {
        this.libraryName = libraryName;
        this.location = location;
    }

    // Non-static inner class
    class Book {
        String title;
        String author;

        Book(String title, String author) {
            this.title = title;
            this.author = author;
        }

        void display() {
            System.out.println("Library: " + libraryName);
            System.out.println("Location: " + location);
            System.out.println("Book Title: " + title);
            System.out.println("Author: " + author);
        }
    }
}

public class Program14_2 {
    public static void main(String[] args) {

        // Create outer class object
        Library library =
                new Library("City Central Library", "Vijayawada");

        // Create inner class object
        Library.Book book =
                library.new Book("Java Programming", "James Gosling");

        book.display();
    }
}`,
  },
]

const program2_2Corrected = `import java.util.Scanner;
class Student{
int roll;
String name;
Student(int roll,String name){
this.roll=roll;
this.name=name;
}
}
public class program2_2{
public static void main(String[] args){
Scanner sc=new Scanner(System.in);
Student[] students=new Student[5];
for(int i=0;i<students.length;i++){
int roll=sc.nextInt();
String name=sc.nextLine();
students[i]=new Student(roll,name);
}
for(Student s:students){
System.out.println(s.roll);
System.out.println(s.name);
}
sc.close();
}
}`

export const oopPrograms: Program[] = raw.map((r) => {
  const program: Program = {
    id: r.ref.toLowerCase(),
    ref: r.ref,
    title: r.title,
    titleDerived: true,
    groupId,
    code: { language: 'java', code: r.code },
    outputs: [],
    screenshots: [],
    notes: [],
    sourceLine: r.sourceLine,
  }
  if (r.ref === 'program2_2') {
    program.knownIssues = [
      {
        title: 'Student[i] refers to no declared variable',
        detail:
          'The array declared immediately above is named students (Student[] students=new Student[5];), but the assignment inside the loop reads Student[i]=new Student(roll,name);. Student is the name of the class, not of the array, so this line does not compile. The source appears to intend students[i].',
      },
      {
        title: 'sc.close(); appears outside the main method',
        detail:
          'The statement sc.close(); is placed after the closing brace of main, in the class body. It also refers to a Scanner variable that was declared inside the for loop, so that variable would not be in scope at that point. The source appears to intend sc to be declared once before the loop and closed at the end of main.',
      },
    ]
    program.correctedCode = program2_2Corrected
  }
  return program
})

export const oopSection: Section = {
  id: 'oop-programs',
  title: 'OOP Programs',
  order: 4,
  description: 'Twenty-seven Java source files collected under JAVA PROGRAMMING LAB.',
  sourceLine: 202,
  groups: [
    {
      id: groupId,
      title: 'Java Source Code Collection',
      sourceLine: 202,
      blocks: [
        {
          kind: 'prose',
          id: 'oop-note',
          callouts: [
            {
              tone: 'source',
              title: 'Derived titles',
              body: 'The source document labels these programs only by identifier (program1_1 … Program14_2) and provides no headings and no output text. Each title below is derived strictly from what the program code itself demonstrates, and is shown alongside the original identifier. No output has been written for any of these programs because the document contains none.',
            },
          ],
          sourceLine: 202,
        },
        {
          kind: 'programs',
          id: 'oop-programs',
          programIds: oopPrograms.map((p) => p.id),
          sourceLine: 202,
        },
      ],
    },
  ],
}
