#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>
#include <unordered_map>

using namespace std;


template <typename T>
void printVector(vector<T> vec) {
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
    vector<int> winningNumbers;
    vector<int> user_numbers;

    void print() {
        cout << "Number: " << number << ", Winning numbers: ";
        for (int num : winningNumbers) {
            cout << num << " ";
        }
        cout << ", User Numbers: ";
        for (int num : user_numbers) {
            cout << num << " ";
        }
        cout << endl;
    }

    vector<int> getIntersection() {
        vector<int> intersectedNumbers;
        for (int winningNumber: winningNumbers) {
            for (int userNumber: user_numbers) {
                if (winningNumber == userNumber) {
                    intersectedNumbers.push_back(userNumber);
                }
            }
        }
        return intersectedNumbers;
    }

    int getNumberOfIntersections() {
        return getIntersection().size();
    }
    
};

struct GameWithCount {
    Game game;
    int count;
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

int calculateResult(vector<int> intersectedResults) {
    if (intersectedResults.size() == 0) {
        return 0;
    }
    else if (intersectedResults.size() == 1) {
        return 1;
    }

    int result = 1;
    for (int i = 1; i < intersectedResults.size(); i++) {
        result *= 2;
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
        game.winningNumbers = splitIntoInts(splittedIntoGameType[0]);
        game.user_numbers = splitIntoInts(splittedIntoGameType[1]);

        games.push_back(game);
    }
    return games;

}

class Stack {
    // wrong solution, will keep it for future me
    // in case I need stack implementation
    private:
        vector<Game> stack;
    public:
        void push(Game game) {
            stack.push_back(game);
        }

        Game pop() {
            Game game = stack.back();
            stack.pop_back();
            return game;
        }

        int size() {
            return stack.size();
        }

        bool isEmpty() {
            return stack.size() == 0;
        }

        bool areAllGamesEmpty() {
            for (Game g: stack) {
                if (g.getNumberOfIntersections() != 0) {
                    return false;
                }
            }
            return true;
        }
};

int getResults(const vector<Game> &games) {
    int result = 0;

    for (Game g: games) {
        result += calculateResult(g.getIntersection());
    }
    return result;
}

int main() {
    vector<string> loadedInput = loadInput();
    vector<Game> loadedGames = loadGames(loadedInput); 

    unordered_map<int, GameWithCount> gamesWithCount;
    vector<int> gameIndexes;

    for (Game g: loadedGames) {
        GameWithCount gameCounted;
        gameCounted.count = 1;
        gameCounted.game = g;
        gamesWithCount.insert({g.number, gameCounted});
        gameIndexes.push_back(g.number);
    }
    GameWithCount gameWithCount;
    int maxIndex = gameIndexes.back();
    for (int i: gameIndexes) {
        // cout << "Number " << gameWithCount.game.number << " " << g.getNumberOfIntersections() << endl;

        gameWithCount = gamesWithCount[i];

        int numberOfWins = gameWithCount.game.getNumberOfIntersections();

        if (numberOfWins == 0) {
            continue;
        }
        
        for (int j = 1; j <= numberOfWins; j ++) {
            int gameIdToMultiply = i + j;

            if (gameIdToMultiply > maxIndex) {
                break;
            }

            gamesWithCount[gameIdToMultiply].count += gameWithCount.count;
        }

    }

    int sum = 0;
    for (int i: gameIndexes) {
        sum += gamesWithCount[i].count;
        cout << "Game result " << i << ": " << 
        gamesWithCount[i].count << " Intersections: " << 
        gamesWithCount[i].game.getNumberOfIntersections() << endl;
    }


    cout << "Final result: " << sum << endl;
}

