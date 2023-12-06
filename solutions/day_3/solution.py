import string
from pathlib import Path

input_path = Path(__file__).parent / "input.txt"


def is_special_char(char):
    return char not in string.ascii_letters + string.digits + "."


def load_input(file_name: str = input_path) -> list[str]:
    with open(file_name, "r") as file:
        data = file.read()

    return data.split("\n")


def load_into_array(data: list[str]) -> list[list[str]]:
    return [list(line) for line in data]


def find_numbers_positions(array: list[list[str]]) -> list[tuple[int, int]]:
    numbers_positions = []

    for idx_row, row in enumerate(array):
        current_numbers = []
        was_previous_number = False
        for idx_col, col in enumerate(row):
            if col.isnumeric():
                if not was_previous_number:
                    current_numbers = []

                current_numbers.append((idx_row, idx_col))

                was_previous_number = True
            else:
                if current_numbers:
                    numbers_positions.append(current_numbers)
                    current_numbers = []

                was_previous_number = False

        if current_numbers:
            numbers_positions.append(current_numbers)

    return numbers_positions


def is_possible_place(
    row_idx: int,
    col_idx: int,
    top_max_idx: int,
    bottom_max_idx: int,
    left_max_idx: int,
    right_max_idx: int,
) -> bool:
    return (
        row_idx >= top_max_idx
        and row_idx <= bottom_max_idx
        and col_idx >= left_max_idx
        and col_idx <= right_max_idx
    )


def generate_points_to_check(
    row_idx: int,
    col_idx: int,
) -> list[tuple[int, int]]:
    return [
        (row_idx - 1, col_idx - 1),
        (row_idx - 1, col_idx),
        (row_idx - 1, col_idx + 1),
        (row_idx, col_idx - 1),
        (row_idx, col_idx + 1),
        (row_idx + 1, col_idx - 1),
        (row_idx + 1, col_idx),
        (row_idx + 1, col_idx + 1),
    ]


def is_part_adjastent(
    array: list[list[str]],
    part: list[tuple[int, int]],
    top_max_idx: int,
    bottom_max_idx: int,
    left_max_idx: int,
    right_max_idx: int,
) -> bool:
    for number_position in part:
        points_to_check = generate_points_to_check(*number_position)
        for point in points_to_check:
            if is_possible_place(
                *point,
                top_max_idx,
                bottom_max_idx,
                left_max_idx,
                right_max_idx
            ):
                if is_special_char(array[point[0]][point[1]]):
                    return True

    return False


def get_sum_of_part(array: list[list[str]], part: tuple[int, ...]) -> int:
    return int(
        "".join(
            [
                str(x)
                for x in [
                    int(array[number_position[0]][number_position[1]])
                    for number_position in part
                ]
            ]
        )
    )


def get_sum():
    lines = load_input()
    array = load_into_array(lines)
    top_max_idx = 0
    left_max_idx = 0
    bottom_max_idx = len(array) - 1
    right_max_idx = len(array[0]) - 1
    numbers_positions = find_numbers_positions(array)
    sum_of_parts = 0
    for part in numbers_positions:
        if is_part_adjastent(
            array,
            part,
            top_max_idx,
            bottom_max_idx,
            left_max_idx,
            right_max_idx,
        ):
            sum_of_parts += get_sum_of_part(array, part)

    return sum_of_parts


def main():
    print(get_sum())


if __name__ == "__main__":
    main()
