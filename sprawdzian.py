import datetime
import json
from models.Student import Student
from models.Teacher import Teacher
from models.Subject import Subject
from models.Grades import Grades
from year_grade import year_grade

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Maksymilian Janicki 4c"

teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades_list: list[Grades] = []

with open("teachers.txt", "r") as f:
    for line in f:
        _id, name, surname = line.strip().split()
        teachers.append(Teacher(int(_id), name, surname))

with open("subjects.txt", "r") as f:
    for line in f:
        _id, name, teacher_id = line.strip().split()
        teacher = next((t for t in teachers if t._id == int(teacher_id)), None)
        if teacher:
            subjects.append(Subject(int(_id), name, teacher))

with open("students.txt", "r") as f:
    for line in f:
        _id, first_name, last_name, birth_date_str = line.strip().split(maxsplit=3)
        birth_date = datetime.datetime.strptime(birth_date_str, "%Y-%m-%d").date()
        students.append(Student(int(_id), first_name, last_name, birth_date))

with open("grades.txt", "r") as f:
    for line in f:
        student_id, subject_id, grades_str = line.strip().split(maxsplit=2)
        student = next((s for s in students if s._id == int(student_id)), None)
        subject = next((subj for subj in subjects if subj._id == int(subject_id)), None)
        if student and subject:
            grades = Grades(student, subject)
            for grade in map(int, grades_str.split(",")):
                grades.add_grade(grade)
            grades_list.append(grades)

print("Oceny i średnie poszczególnych uczniów\n")
students_data = {}
for student in students:
    student_grades = [g for g in grades_list if g.student._id == student._id]
    subjects_data = {}
    for grade_obj in student_grades:
        subject_name = grade_obj.subject.name
        avg = grade_obj.get_average()
        subjects_data[subject_name] = {
            "Oceny": ", ".join(map(str, grade_obj.get_grades())),
            "Średnia": avg,
            "Ocena końcowa": year_grade(avg)
        }
    students_data[str(student)] = subjects_data
    print(f"{student}:")
    for subj, data in subjects_data.items():
        print(f"{subj}:")
        print(f"Oceny: {data['Oceny']}")
        print(f"Średnia: {data['Średnia']}")
        print(f"Ocena końcowa: {data['Ocena końcowa']}\n")
    print()

with open("students.json", "w") as f:
    json.dump(students_data, f, indent=4, ensure_ascii=False)

print("=" * 50)
print()

subjects_output = {}
for subject in subjects:
    subject_grades = [g for g in grades_list if g.subject._id == subject._id]
    all_grades = [str(grade) for grades_obj in subject_grades for grade in grades_obj.get_grades()]
    avg = round(sum(map(int, all_grades)) / len(all_grades), 2) if all_grades else 0.0
    subjects_output[subject.name] = {
        "Nauczyciel": str(subject.teacher),
        "Oceny": ", ".join(all_grades),
        "Średnia": avg
    }
    print(f"{subject.name}:")
    print(f"   Nauczyciel: {subject.teacher}")
    print(f"   Oceny: {', '.join(all_grades)}")
    print(f"   Średnia: {avg}\n")

with open("subjects.json", "w") as f:
    json.dump(subjects_output, f, indent=4, ensure_ascii=False)
