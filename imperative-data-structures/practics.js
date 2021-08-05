const Cons = (value, next = null) => ({
  value,
  next,
});

class LinkedList {
  #head;
  constructor(init = null) {
    this.#head = init ? Cons(init) : null;
  }

  get head() {
    return this.#head;
  }

  addToFront(newValue) {
    this.#head = Cons(newValue, this.#head);
  }

  removeFront() {
    if (this.#head) {
      const result = this.#head.value;
      this.#head = this.#head.next;
      return result;
    }
  }
}

// ---------------------------------------------------------------------------

const addVertex = (name, vertex = []) => (graph) =>
  graph[vertex] ? graph : { ...graph, [name]: vertex };

const addEdge = (v1, v2, weight) => (graph) => ({
  ...graph,
  [v1]: graph[v1] ? [...graph[v1], { id: v2, weight }] : [{ id: v2, weight }],
  [v2]: graph[v2] ? [...graph[v2], { id: v1, weight }] : [{ id: v1, weight }],
});

const removeEdge = (v1, v2) => (graph) => ({
  ...graph,
  [v1]: graph[v1] ? graph[v1].filter((v) => v.id !== v2) : [],
  [v2]: graph[v2] ? graph[v2].filter((v) => v.id !== v1) : [],
});

const removeVertex = (v) => (graph) => {
  return Object.keys(graph).reduce((acc, curr) => {
    return curr === v
      ? acc
      : {
          ...acc,
          [curr]: graph[curr].filter((vertex) => vertex.id !== v),
        };
  }, {});
};

const depthFirstTraverse = (start) => (graph) => {
  const result = [];
  const visited = { [start]: true };

  const traverse = (v) => {
    graph[v].forEach((n) => {
      if (!visited[n.id]) {
        result.push(n);
        visited[n.id] = true;
        traverse(n.id);
      }
    });
  };
  traverse(start);
  return result;
};

const iterativeDFS = (start) => (graph) => {
  const stack = new LinkedList(start);
  const visited = { [start]: true };
  const result = [];

  while (stack.head) {
    const vertex = stack.removeFront();
    graph[vertex].forEach((neighbor) => {
      if (!visited[neighbor.id]) {
        visited[neighbor.id] = true;
        stack.addToFront(neighbor.id);
        result.push(neighbor);
      }
    });
  }
  return result;
};

const breadthFirstTraverse = (start) => (graph) => {
  const result = [];
  const visited = { [start]: true };

  const traverse = (v) => {
    graph[v].forEach((n) => {
      if (!visited[n.id]) {
        result.push(n);
        visited[n.id] = true;
        traverse(n.id);
      }
    });
  };
  traverse(start);
  return result;
};

// undirected dummy data
const users = [
  { id: '1', name: 'Tom the Turtle' },
  { id: '2', name: 'Bob the Bear' },
  { id: '3', name: 'Frank the Flamingo' },
  { id: '4', name: 'Suzy the Seagull' },
  { id: '5', name: 'Sheryl the Salimander' },
  { id: '6', name: 'Edmond the Epee' },
  { id: '7', name: 'Priscilla the Pelican' },
  { id: '8', name: 'Polly the Parot' },
];
const relations = [
  ['1', '2', 1],
  ['2', '3', 8],
  ['2', '7', 2],
  ['2', '8', 8],
  ['3', '4', 9],
  ['4', '5', 1],
  ['5', '6', 3],
  ['1', '7', 3],
];
const network = users.reduce((acc, curr) => addVertex(curr.id)(acc), {});
const d2 = relations.reduce((acc, curr) => addEdge(...curr)(acc), network);
// console.log(d2);
let dfs = depthFirstTraverse('1')(d2);
console.log(dfs);
dfs = iterativeDFS('1')(d2);
console.log(dfs);
