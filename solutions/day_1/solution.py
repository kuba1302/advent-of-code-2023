from pathlib import Path

input_path = Path(__file__).parents[0] / "input.txt"

def read_txt(input_path: Path = input_path) -> list[str]:
    with open(input_path, "r") as file:
        data = file.read()
        
    return data.split("\n")


number_mappings_by_len = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}



    
        
def get_numbers_from_sting(data_input: str):
    i = 0
    numbers = []
    max_index = len(data_input) - 1
        
    while i <= max_index:
        if data_input[i].isnumeric():
            numbers.append(int(data_input[i]))
        
        for key, val in number_mappings_by_len.items(): 
            if data_input[i:].startswith(key):
                numbers.append(val)
                break
            
        i += 1
    
    return numbers
                
def solution():
    data = read_txt()
    sum = 0
    
    for data_input in data:
        numbers = get_numbers_from_sting(data_input)
        first_val, last_val = numbers[0], numbers[-1]
        sum += int(f"{first_val}{last_val}")
    
    return sum


def main():
    print(solution())
    
    
if __name__ == "__main__":
    main()