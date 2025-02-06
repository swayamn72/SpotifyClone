#include <iostream> 
#include <stack> 
using namespace std; 
 
int main() { 
    int V = 5, E = 4; 
    
    int adj[5][5] = {0}; 
 
    adj[0][1] = 1; adj[1][0] = 1; 
    adj[0][2] = 1; adj[2][0] = 1; 
    adj[1][3] = 1; adj[3][1] = 1; 
    adj[1][4] = 1; adj[4][1] = 1; 
 
    bool visited[5] = {false}; 
 
    stack<int> s; 
    int start = 0; 
    s.push(start); 
    visited[start] = true; 
 
    cout << "DFS traversal starting from verex " << start << ": "; 
 
    while (!s.empty()) { 
        int node = s.top(); 
        s.pop(); 
        cout << node << " "; 
 
        for (int i = 0; i < V; i++) { 
            if (adj[node][i] == 1 && !visited[i]) { 
                visited[i] = true; 
                s.push(i); 
            } 
        } 
    } 
 
    cout << endl; 
 
    return 0; 
}