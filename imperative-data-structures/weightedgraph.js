class PQ {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ id: vertex2, weight });
    this.adjacencyList[vertex2].push({ id: vertex1, weight });
  }

  depthFirst(start) {
    const result = [];
    const visited = { [start]: true };
    const stack = [start];
    while (stack.length > 0) {
      const node = stack.pop();
      this.adjacencyList[node].forEach((n) => {
        if (!visited[n.id]) {
          visited[n.id] = true;
          stack.push(n.id);
          result.push(n);
        }
      });
    }
    return result;
  }

  shortestPaths(start, finish) {
    const nodes = new PQ();
    const vertices = Object.keys(this.adjacencyList);
    const distances = {};
    const previous = {};

    // setup data
    vertices.forEach((vertex) => {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        nodes.enqueue(vertex, Infinity);
        distances[vertex] = Infinity;
      }
      previous[vertex] = null;
    });

    // run
    while (nodes.values.length > 0) {
      const smallest = nodes.dequeue();

      // reached finish node
      if (smallest.val === finish) {
        let key = smallest.val;
        const result = [];
        while (previous[key]) {
          result.push({
            node: previous[key],
            weight: distances[key],
          });
          key = previous[key];
        }
        return result.reverse();
      }

      // continue searching
      if (smallest.val || distances[smallest.val] !== Infinity) {
        this.adjacencyList[smallest.val].forEach((node) => {
          let candidate = distances[smallest.val] + node.weight;
          if (candidate < distances[node.id]) {
            distances[node.id] = candidate;
            previous[node.id] = smallest.val;
            nodes.enqueue(node.id, node.weight);
          }
        });
      }
    }
  }
}

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('F', 'E', 1);
graph.addEdge('F', 'C', 4);

const paths = graph.shortestPaths('A', 'F');
const distance = paths.reduce(
  (acc, curr) => (acc < curr.weight ? curr.weight : acc),
  0
);
const route = paths.map((x) => x.node);
console.log('distance', distance);
console.log('route', route);
