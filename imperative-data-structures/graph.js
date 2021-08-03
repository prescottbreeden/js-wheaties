console.log('--[ Graphs ]------------------');

// vertex: a node
// edge: connection between nodes
// weighted / unweighted
// directed / undirected

// Adjacency Matrix
// - More space in sparse graphs
// - Slower to iterate over all edges
// - Faster to lookup specific edge
// [- A B C D E F]
// [A 0 1 0 0 0 1]
// [B 1 0 1 0 0 0]
// [C 0 1 0 1 0 0]
// [D 0 0 1 0 1 0]
// [E 0 0 0 1 0 1]
// [F 1 0 0 0 1 0]
matrix = [
  [0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0],
];

// Adjacency List * better use case in real-world data
// - Less space in sparse graphs
// - Faster to iterate over all edges
// - Slower to lookup specific edge
list = {
  A: ['F', 'B'],
  B: ['A', 'C'],
  C: ['B', 'D'],
  D: ['C', 'E'],
  E: ['D', 'F'],
  F: ['E', 'A'],
};

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
  constructor() {
    this.list = {};
  }

  addVertex(vertex) {
    if (!this.list[vertex]) {
      this.list[vertex] = [];
    }
  }

  addEdge(v1, v2, weight) {
    this.list[v1] = [...this.list[v1], { node: v2, weight }];
  }

  removeEdge(v1, v2) {
    this.list[v1] = this.list[v1].filter((v) => v.node !== v2);
  }

  removeVertex(vertex) {
    this.list = Object.keys(this.list).reduce((acc, curr) => {
      return curr == vertex
        ? acc
        : {
            ...acc,
            [curr]: this.list[curr].filter((v) => v.node !== vertex),
          };
    }, {});
  }

  dfs(start) {
    if (!this.list[start]) return null;
    const result = [];
    const visited = { [start]: true };
    const list = this.list;

    (function traverse(v) {
      list[v].forEach((n) => {
        if (!visited[n.node]) {
          result.push(n);
          visited[n.node] = true;
          traverse(n.node);
        }
      });
    })(start);

    return result;
  }

  printMe() {
    Object.keys(this.list).forEach((r) => {
      console.log('---------------');
      console.log(r, ':', this.list[r]);
    });
  }
}

const bob = new Graph();
const seattle = 'Seattle';
const jfk = 'JFK';
const anchorage = 'Anchorage';
const frankfurt = 'Frankfurt';
const iceland = 'Iceland';
const ireland = 'Ireland';
const moscow = 'Moscow';

bob.addVertex(seattle);
bob.addVertex(jfk);
bob.addVertex(anchorage);
bob.addVertex(frankfurt);
bob.addVertex(iceland);
bob.addVertex(ireland);
bob.addVertex(moscow);

bob.addEdge(moscow, seattle, 10.5);

bob.addEdge(seattle, jfk, 5);
bob.addEdge(seattle, frankfurt, 10);
bob.addEdge(seattle, anchorage, 3);

bob.addEdge(anchorage, seattle, 3);
bob.addEdge(anchorage, moscow, 9);

bob.addEdge(jfk, seattle, 5);
bob.addEdge(jfk, frankfurt, 8);
bob.addEdge(jfk, iceland, 4);
bob.addEdge(jfk, anchorage, 7);

bob.addEdge(iceland, jfk, 5.5);
bob.addEdge(iceland, ireland, 2);

bob.addEdge(ireland, iceland, 2);
bob.addEdge(ireland, frankfurt, 1.5);

bob.addEdge(frankfurt, ireland, 1.5);
bob.addEdge(frankfurt, jfk, 8);
bob.addEdge(frankfurt, anchorage, 9.5);

// bob.removeEdge(frankfurt, seattle);
bob.printMe();

console.log('DFS: ', bob.dfs(seattle));
