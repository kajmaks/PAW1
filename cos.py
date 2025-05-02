import os
from dataclasses import dataclass, field
from typing import List, Dict

@dataclass
class Course:
    name: str

@dataclass
class Student:
    id: int
    first_name: str
    last_name: str
    age: int
    courses: List[Course] = field(default_factory=list)

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

def load_students(file_path: str) -> Dict[int, Student]:
    students = {}
    with open(file_path, 'r') as file:
        for line in file:
            sid, first, last, age = line.strip().split(',')
            students[int(sid)] = Student(int(sid), first, last, int(age))
    return students

def load_courses(file_path: str, students: Dict[int, Student]):
    with open(file_path, 'r') as file:
        for line in file:
            sid, course_name = line.strip().split(',')
            if int(sid) in students:
                students[int(sid)].courses.append(Course(course_name))

def print_students(students: Dict[int, Student]):
    for student in students.values():
        course_names = ', '.join(c.name for c in student.courses)
        print(f"{student.full_name()} ({student.age} lat): {course_names}")

def save_student_files(students: Dict[int, Student], folder: str = "output"):
    os.makedirs(folder, exist_ok=True)
    for student in students.values():
        filename = f"{folder}/{student.first_name.lower()}_{student.last_name.lower()}.txt"
        with open(filename, 'w') as file:
            file.write("Kursy:\n")
            for course in student.courses:
                file.write(f"- {course.name},\n")

# Main program
students = load_students('students.txt')
load_courses('courses.txt', students)
print_students(students)
save_student_files(students)
