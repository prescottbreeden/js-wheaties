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
  ['5', '6', 3],
  ['1', '7', 3],
];
const network = users.reduce((acc, curr) => addVertex(curr.id)(acc), {});
const d2 = relations.reduce((acc, curr) => addEdge(...curr)(acc), network);
console.log(d2);
console.log(removeVertex('8')(d2));
