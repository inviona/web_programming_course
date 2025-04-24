

// Student.java
public class Student implements Comparable<Student> {
    private int idNumber;
    private String name;
    private double gpa;
    
    public Student(int idNumber, String name, double gpa) {
        this.idNumber = idNumber;
        this.name = name;
        this.gpa = gpa;
    }
    
    public int getIdNumber() { return idNumber; }
    public String getName() { return name; }
    public double getGpa() { return gpa; }
    
    public void setGpa(double gpa) { this.gpa = gpa; }
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.idNumber, other.idNumber);
    }
    
    @Override
    public String toString() {
        return "ID: " + idNumber + ", Name: " + name + ", GPA: " + gpa;
    }
}

// StudentManagementSystem.java
public class StudentManagementSystem {
    private BinarySearchTree<Student> studentsByID;
    
    public StudentManagementSystem() {
        studentsByID = new BinarySearchTree<>();
    }
    
    public void addStudent(int id, String name, double gpa) {
        Student student = new Student(id, name, gpa);
        studentsByID.insert(student);
    }
    
    public Student findStudentByID(int id) {
        Student dummy = new Student(id, "", 0);
        List<Student> path = studentsByID.pathToNode(dummy);
        
        if (!path.isEmpty()) {
            return path.get(path.size() - 1);
        }
        return null;
    }
    
    public void updateStudentGPA(int id, double newGPA) {
        Student student = findStudentByID(id);
        if (student != null) {
            int oldID = student.getIdNumber();
            String oldName = student.getName();
            
            studentsByID.delete(student);
            addStudent(oldID, oldName, newGPA);
        }
    }
    
    public void printAllStudents() {
        System.out.println("All Students (sorted by ID):");
        studentsByID.inOrderTraversal();
    }
    
    public void displayStudentHierarchy() {
        System.out.println("Student BST Structure:");
        studentsByID.printTree();
    }
    
    public int getTotalStudents() {
        return studentsByID.countNodes();
    }
}

// Employee.java
public class Employee implements Comparable<Employee> {
    private int employeeId;
    private String name;
    private String department;
    private double salary;
    
    public Employee(int employeeId, String name, String department, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    
    public int getEmployeeId() { return employeeId; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    
    public void setDepartment(String department) { this.department = department; }
    public void setSalary(double salary) { this.salary = salary; }
    
    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.employeeId, other.employeeId);
    }
    
    @Override
    public String toString() {
        return "ID: " + employeeId + ", Name: " + name + 
               ", Department: " + department + ", Salary: $" + salary;
    }
}

// EmployeeManagementSystem.java
public class EmployeeManagementSystem {
    private BinarySearchTree<Employee> employeesById;
    
    public EmployeeManagementSystem() {
        employeesById = new BinarySearchTree<>();
    }
    
    public void addEmployee(int id, String name, String department, double salary) {
        Employee employee = new Employee(id, name, department, salary);
        employeesById.insert(employee);
    }
    
    public Employee findEmployeeById(int id) {
        Employee dummy = new Employee(id, "", "", 0);
        List<Employee> path = employeesById.pathToNode(dummy);
        
        if (!path.isEmpty()) {
            return path.get(path.size() - 1);
        }
        return null;
    }
    
    public void updateEmployeeSalary(int id, double newSalary) {
        Employee employee = findEmployeeById(id);
        if (employee != null) {
            int oldID = employee.getEmployeeId();
            String oldName = employee.getName();
            String oldDept = employee.getDepartment();
            
            employeesById.delete(employee);
            addEmployee(oldID, oldName, oldDept, newSalary);
        }
    }
    
    public void updateEmployeeDepartment(int id, String newDepartment) {
        Employee employee = findEmployeeById(id);
        if (employee != null) {
            int oldID = employee.getEmployeeId();
            String oldName = employee.getName();
            double oldSalary = employee.getSalary();
            
            employeesById.delete(employee);
            addEmployee(oldID, oldName, newDepartment, oldSalary);
        }
    }
    
    public void listEmployeesByIdOrder() {
        System.out.println("All Employees (sorted by ID):");
        employeesById.inOrderTraversal();
    }
    
    public int getTotalEmployees() {
        return employeesById.countNodes();
    }
    
    public void displayEmployeeHierarchy() {
        System.out.println("Employee BST Structure:");
        employeesById.printTree();
    }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        // Test Student Management System
        testStudentSystem();
        
        System.out.println("\n---------------------------------\n");
        
        // Test Employee Management System
        testEmployeeSystem();
    }
    
    public static void testStudentSystem() {
        System.out.println("TESTING STUDENT MANAGEMENT SYSTEM");
        StudentManagementSystem sms = new StudentManagementSystem();
        
        // Add students
        sms.addStudent(1001, "Alice Smith", 3.8);
        sms.addStudent(1003, "Bob Johnson", 3.2);
        sms.addStudent(1002, "Charlie Brown", 3.5);
        sms.addStudent(1005, "Diana Prince", 4.0);
        sms.addStudent(1004, "Edward Jones", 2.9);
        
        // Print all students
        sms.printAllStudents();
        
        // Find a student
        Student found = sms.findStudentByID(1003);
        System.out.println("\nFound student: " + (found != null ? found : "Not found"));
        
        // Update a student's GPA
        System.out.println("\nUpdating student 1002's GPA to 3.7");
        sms.updateStudentGPA(1002, 3.7);
        
        // Verify update
        found = sms.findStudentByID(1002);
        System.out.println("Updated student: " + (found != null ? found : "Not found"));
        
        // Print the BST structure
        System.out.println("\nStudent BST Structure:");
        sms.displayStudentHierarchy();
        
        // Print total students
        System.out.println("\nTotal students: " + sms.getTotalStudents());
    }
    
    public static void testEmployeeSystem() {
        System.out.println("TESTING EMPLOYEE MANAGEMENT SYSTEM");
        EmployeeManagementSystem ems = new EmployeeManagementSystem();
        
        // Add employees
        ems.addEmployee(101, "John Doe", "Engineering", 85000);
        ems.addEmployee(103, "Jane Smith", "Marketing", 72000);
        ems.addEmployee(102, "Mike Johnson", "HR", 65000);
        ems.addEmployee(105, "Sarah Williams", "Engineering", 90000);
        ems.addEmployee(104, "Tom Brown", "Finance", 78000);
        
        // List all employees
        ems.listEmployeesByIdOrder();
        
        // Find an employee
        Employee found = ems.findEmployeeById(103);
        System.out.println("\nFound employee: " + (found != null ? found : "Not found"));
        
        // Update an employee's salary
        System.out.println("\nUpdating employee 102's salary to 68000");
        ems.updateEmployeeSalary(102, 68000);
        
        // Update an employee's department
        System.out.println("Updating employee 104's department to 'Accounting'");
        ems.updateEmployeeDepartment(104, "Accounting");
        
        // Verify updates
        found = ems.findEmployeeById(102);
        System.out.println("Updated employee 102: " + (found != null ? found : "Not found"));
        found = ems.findEmployeeById(104);
        System.out.println("Updated employee 104: " + (found != null ? found : "Not found"));
        
        // Print the BST structure
        System.out.println("\nEmployee BST Structure:");
        ems.displayEmployeeHierarchy();
        
        // Print total employees
        System.out.println("\nTotal employees: " + ems.getTotalEmployees());
    }
}
