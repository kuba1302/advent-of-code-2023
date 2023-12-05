from pathlib import Path

input_path = Path(__file__).parents[0] / "input.txt"

def read_txt(input_path: Path = input_path) -> list[str]:
    with open(input_path, "r") as file:
        data = file.read()
        
    return data.split("\n")


number_mappings_by_len = {
    3: {
    "one": 1,
    "two": 2,
    "six": 6,
    },
    4: {
    "four": 4,
    "five": 5,
    "nine": 9
    },
    5: {
    "three": 3,
    "seven": 7,
    "eight": 8,
    }
}

def get_numbers_from_sting(data_input: str):
    i = 0
    numbers = []
    max_index = len(data_input) - 1
    while i <= max_index:
        if data_input[i].isnumeric():
            numbers.append(data_input[i])
            i += 1
            continue
    
        else:
            for string_len in number_mappings_by_len:
                if i + string_len > max_index:
                    i += 1
                    break
                
                if data_input[i:i+string_len] in number_mappings_by_len[string_len]:
                    numbers.append(number_mappings_by_len[string_len][data_input[i:i+string_len]])
                    i += string_len
                    break
                
    
    return numbers
                
def solution():
    data = read_txt()
    sums = []
    
    for data_input in data:
        print(data_input)
        numbers = get_numbers_from_sting(data_input)
        
        min_val, max_val = numbers[0], numbers[-1]
        sums.append(int(f"{min_val}{max_val}"))
    
    return sum(sums)


def main():
    print(solution())
    
    
if __name__ == "__main__":
    main()