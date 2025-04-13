class Teacher:
    __copyright__ = "Zespół Szkół Komunikacji"
    __author__ = "Maksymilian Janicki 4c"


    def __init__(self, _id: int, name: str, surname: str):
        self._id = _id
        self.name = name
        self.surname = surname

    def __str__(self) -> str:
        return f"{self.name} {self.surname}"