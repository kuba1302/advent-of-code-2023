from pathlib import Path

input_path = Path(__file__).parents[0] / "input1.txt"

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

def try_get_value_by_string(data_input, i, max_index):
    for string_len in number_mappings_by_len:
        if i + string_len - 1 > max_index:
            i += 1
            return None, i

        if data_input[i:i+string_len] in number_mappings_by_len[string_len]:
            value = number_mappings_by_len[string_len][data_input[i:i+string_len]]
            i += string_len
            return value, i
    
    i += 1
    return None, i
    
        
def get_numbers_from_sting(data_input: str):
    i = 0
    numbers = []
    max_index = len(data_input) - 1
    while i <= max_index:
        if data_input[i].isnumeric():
            numbers.append(int(data_input[i]))
            i += 1
            
        else:
            value, i = try_get_value_by_string(data_input, i, max_index)
            if value:
                numbers.append(int(value))
    
    return numbers
                
def solution():
    data = read_txt()
    sum = 0
    
    for data_input in data:
        numbers = get_numbers_from_sting(data_input)
        first_val, last_val = numbers[0], numbers[-1]
        print(data_input)
        print(int(f"{first_val}{last_val}"))
        sum += int(f"{first_val}{last_val}")
    
    return sum


def main():
    print(solution())
    
    
if __name__ == "__main__":
    main()