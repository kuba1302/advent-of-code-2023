#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>

using namespace std;


void print_vector(vector<string> vec) {
    for (int i = 0; i < vec.size(); i++) {
        cout << vec[i] << endl;
    }
}

vector<string> splitString(const string &str, char delim) {
    vector<string> tokens;
    stringstream ss(str);
    string token;

    while (getline(ss, token, delim)) {
        tokens.push_back(token);
    }

    return tokens;
}

string remove_spaces(string str) {
    string string_no_spaces = "";
    for (char c : str) {
        if (c != ' ') {
            string_no_spaces.push_back(c);
        }
    }
    return string_no_spaces;
}

vector<string> load_input() {
    string file_name = "./input.txt";
    vector<string> lines; 
    string line;

    ifstream file(file_name);

    if (file.is_open()) {
        while (getline(file, line)) {
            lines.push_back(line);
        };
        file.close();
    }
    else {
        cout << "Failed to open file: " << file_name << endl;
    }
    
    
    return lines;
}

struct Game {
    int number;
    vector<int> winning_numbers;
    vector<int> user_numbers;
};


vector<Game> load_games(const vector<string> &loaded_input) {
    vector<Game> games;
    for (string line: loaded_input) {
        
    }
}

int main() {
    // TODO: Add your code here
    
    vector<string> loaded_input = load_input();
    print_vector(loaded_input);
}
