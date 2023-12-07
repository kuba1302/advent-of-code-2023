#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>

using namespace std;


void printVector(vector<string> vec) {
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

string removeSpaces(string str) {
    string string_no_spaces = "";
    for (char c : str) {
        if (c != ' ') {
            string_no_spaces.push_back(c);
        }
    }
    return string_no_spaces;
}

vector<string> loadInput() {
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

    void print() {
        cout << "Number: " << number << ", Winning numbers: ";
        for (int num : winning_numbers) {
            cout << num << " ";
        }
        cout << ", User Numbers: ";
        for (int num : user_numbers) {
            cout << num << " ";
        }
        cout << endl;
    }
};


vector<int> splitIntoInts(string str) {
    vector<int> result;
    istringstream iss(str);
    string token;

    while (iss >> token) {
        int num = stoi(token);
        result.push_back(num);
    }
    return result;
}

vector<Game> loadGames(const vector<string> &loadedInput) {
    vector<Game> games;
    for (string line: loadedInput) {
        Game game;
        vector<string> stringSplitted = splitString(line, ':');
        vector<string> splittedIntoGameType = splitString(stringSplitted[1], '|');

        game.number = stoi(stringSplitted[0]);
        game.winning_numbers = splitIntoInts(splittedIntoGameType[0]);
        game.user_numbers = splitIntoInts(splittedIntoGameType[1]);

        game.print();
        games.push_back(game);
    }
    return games;

}

int main() {
    // TODO: Add your code here
    
    vector<string> loadedInput = loadInput();
    vector<Game> loadedGames = loadGames(loadedInput); 
}
