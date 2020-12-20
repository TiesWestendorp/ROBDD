# reduced-ordered-binary-decision-diagrams: ROBDDs for JS

This library implements a basic structure for reduced ordered binary decision diagrams, and Boolean operations to compose them.

A binary decision diagram (BDD) is a data structure used to represent Boolean functions. Conceptually, a BDD is a directed graph where sink nodes represent truth- or falsehood. At each node a decision is made about the value of the binary variable whose label is associated with that node.

A BDD is called *reduced* when the BDD is minimal with respect to the following reduction rules:
 - Given two nodes with the same variable label, same true-path and same false-path, one of them can be replaced.
 - Given a node whose true-path and false-path coincide, the node can be removed.

A BDD is called *ordered* when, for each path from the source to a sink node, the labels encountered follow the same ordering (though not every variable needs to occur in each path).

The variable ordering is determined upon instantiation.

<details>
  <summary>Binary decision diagrams (BDD)</summary>
  <ol>
    In <a href="https://en.wikipedia.org/wiki/Computer_science">computer science</a>, a <b>binary decision diagram</b> (<b>BDD</b>) or <b>branching program</b> is a <a href="https://en.wikipedia.org/wiki/Data_structure">data structure</a> that is used to represent a <a href="https://en.wikipedia.org/wiki/Boolean_function">Boolean function</a>. On a more abstract level, BDDs can be considered as a <a href="https://en.wikipedia.org/wiki/Data_compression">compressed</a> representation of <a href="https://en.wikipedia.org/wiki/Set_(mathematics)">sets</a> or <a href="https://en.wikipedia.org/wiki/Relation_(mathematics)">relations</a>. Unlike other compressed representations, operations are performed directly on the compressed representation, i.e. without decompression. Other <a href="https://en.wikipedia.org/wiki/Data_structure">data structures</a> used to represent <a href="https://en.wikipedia.org/wiki/Boolean_function">Boolean functions</a> include <a href="https://en.wikipedia.org/wiki/Negation_normal_form">negation normal form</a> (NNF), <a href="https://en.wikipedia.org/wiki/Zhegalkin_polynomial">Zhegalkin polynomials</a>, and <a href="https://en.wikipedia.org/wiki/Propositional_directed_acyclic_graph">propositional directed acyclic graphs</a> (PDAG).
    ~ <a href="https://en.wikipedia.org/wiki/Binary_decision_diagram">Wikipedia</a>, 09/10/2020
  </ol>
</details>

## Installation
```
npm i reduced-ordered-binary-decision-diagrams
```

# Example

```javascript
const { ROBDD } = require('reduced-ordered-binary-decision-diagrams')

const x = ROBDD.variable()
const y = ROBDD.variable()

console.warn(ROBDD.or(x, y))
```

# Future plans
None, currently
