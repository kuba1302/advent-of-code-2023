from dataclasses import dataclass
from pathlib import Path
from pprint import pprint
from typing import Literal

Color = Literal["blue", "green", "red"]

input_path = Path(__file__).parent / "input.txt"


@dataclass
class OneColorResult:
    color: Color
    number: int


@dataclass
class ResultMaxColorCounts:
    blue: int
    green: int
    red: int


@dataclass
class OneDrawResult:
    list_of_results: list[OneColorResult]

    def __post_init__(self):
        self.color_max_counts = self._get_max_color_counts()

    def _get_max_color_counts(self) -> ResultMaxColorCounts:
        blues = [
            color.number
            for color in self.list_of_results
            if color.color == "blue"
        ]
        greens = [
            color.number
            for color in self.list_of_results
            if color.color == "green"
        ]
        reds = [
            color.number
            for color in self.list_of_results
            if color.color == "red"
        ]
        return ResultMaxColorCounts(
            blue=max(blues, default=0),
            green=max(greens, default=0),
            red=max(reds, default=0),
        )


@dataclass
class WholeGame:
    game_id: int
    games_list: list[OneDrawResult]

    def __post_init__(self):
        self.color_max_counts = self._get_max_color_counts()

    def _get_max_color_counts(self) -> ResultMaxColorCounts:
        blues = [draw.color_max_counts.blue for draw in self.games_list]
        greens = [draw.color_max_counts.green for draw in self.games_list]
        reds = [draw.color_max_counts.red for draw in self.games_list]
        return ResultMaxColorCounts(
            blue=max(blues, default=0),
            green=max(greens, default=0),
            red=max(reds, default=0),
        )

    def is_game_possible(
        self,
        blue_defined_max: int,
        green_defined_max: int,
        red_defined_max: int,
    ) -> bool:
        return (
            self.color_max_counts.blue <= blue_defined_max
            and self.color_max_counts.green <= green_defined_max
            and self.color_max_counts.red <= red_defined_max
        )

    def get_power(self) -> int:
        return (
            self.color_max_counts.blue
            * self.color_max_counts.green
            * self.color_max_counts.red
        )


def load_input(file_name: str = input_path) -> list[WholeGame]:
    games_list = []
    with open(file_name, "r") as file:
        lines = file.readlines()
        for line in lines:
            game_id_part, games_info_part = line.split(":")
            game_id = int(game_id_part.split()[1])
            game_info = []

            for draw in games_info_part.split(";"):
                draw_list = []

                for one_color_info in draw.split(","):
                    number, color = one_color_info.strip().split()
                    draw_list.append(
                        OneColorResult(color=color, number=int(number))
                    )

                game_info.append(OneDrawResult(list_of_results=draw_list))

            games_list.append(WholeGame(game_id=game_id, games_list=game_info))

    return games_list


def get_sum_of_possible_ids():
    games_list = load_input()
    sum_id = 0
    red_max = 12
    green_max = 13
    blue_max = 14

    for game in games_list:
        if game.is_game_possible(
            blue_defined_max=blue_max,
            green_defined_max=green_max,
            red_defined_max=red_max,
        ):
            sum_id += game.game_id

    return sum_id


def get_power_of_possible_ids():
    games_list = load_input()
    power_sum = 0
    for game in games_list:
        power_sum += game.get_power()

    return power_sum


def main():
    print(get_power_of_possible_ids())


if __name__ == "__main__":
    main()
