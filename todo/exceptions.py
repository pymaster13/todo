
class TodoError(Exception):
    pass


class CreateTodoError(TodoError):
    def __init__(self, error) -> None:
        self.error = error
        super().__init__(error)


class DeleteTodoError(TodoError):
    def __init__(self, error) -> None:
        self.error = error
        super().__init__(error)


class DeleteForeignTodoError(TodoError):
    def __init__(self, error) -> None:
        self.error = error
        supe


class GetTodoError(TodoError):
    def __init__(self, error) -> None:
        self.error = error
        super().__init__(error)
