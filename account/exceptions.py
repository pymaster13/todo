
class AccountError(Exception):
    pass


class UpdateUserError(AccountError):
    def __init__(self, error) -> None:
        self.error = error
        super().__init__(error)
