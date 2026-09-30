from auth import login
from database import connect


def main():
    connect()

    result = login("admin", "1234")

    print(result)


if __name__ == "__main__":
    main()