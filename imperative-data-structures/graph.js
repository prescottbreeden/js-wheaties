console.log('--[ Graphs ]------------------');

// BIG O
// |V| - number of vertices
// |E| - number of edges

// Operation      | Adjacency List  | Adjacency Matrix
// ---------------------------------------------------
// Add Vertex     | O(1)            | O(|V^2|)
// Add Edge       | O(1)            | O(1)
// Remove Vertex  | O(|V| + |E|)    | O(|V^2|)
// Remove Edge    | O(|E|)          | O(1)
// Query          | O(|V| + |E|)    | O(1)
// Storate        | O(|V| + |E|)    | O(|V^2|)

class Graph {
  #list;
  constructor() {
    this.#list = {};
  }

  print() {
    console.log(this.#list);
  }

  addVertex(vertex) {
    if (this.#list[vertex]) {
      return this;
    } else {
      this.#list[vertex] = [];
      return this;
    }
  }

  addEdge(v1, v2) {
    this.#list[v1] = [...this.#list[v1], v2];
    return this;
  }

  removeEdge(v1, v2) {
    this.#list[v1] = this.#list[v1].filter((v) => v !== v2);
    return this;
  }

  removeVertex(vertex) {
    this.#list = Object.keys(this.#list).reduce((acc, curr) => {
      return curr == vertex
        ? acc
        : {
            ...acc,
            [curr]: this.#list[curr].filter((v) => v !== vertex),
          };
    }, {});
    return this;
  }

  dfs(start) {
    if (!this.#list[start]) return [];
    const result = [];
    const visited = { [start]: true };
    const list = this.#list;

    (function traverse(v) {
      list[v].forEach((n) => {
        if (!visited[n]) {
          result.push(n);
          visited[n] = true;
          traverse(n);
        }
      });
    })(start);

    return result;
  }

  depthFirst(start) {
    const result = [];
    const visited = { [start]: true };
    const stack = [start];
    while (stack.length > 0) {
      const node = stack.pop();
      this.#list[node].forEach((n) => {
        if (!visited[n]) {
          visited[n] = true;
          stack.push(n);
          result.push(n);
        }
      });
    }
    return result;
  }

  bfs(start) {
    // implement a queue
    return this;
  }

  dijkstras() {
    // implement a priority queue
    return this;
  }
}

const bob = ['A', 'B', 'C', 'D', 'E', 'F'].reduce((acc, curr) => {
  return acc.addVertex(curr);
}, new Graph());

bob.addEdge('A', 'B');
bob.addEdge('B', 'A');
bob.addEdge('C', 'E');
bob.addEdge('D', 'C');
bob.addEdge('E', 'D');
bob.addEdge('E', 'F');
bob.addEdge('F', 'C');
bob.addEdge('F', 'A');

bob.print();
const dfs = bob.dfs('F');
console.log(dfs);
const dfs2 = bob.depthFirst('F');
console.log(dfs2);
