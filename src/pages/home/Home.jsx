import React, { useState } from 'react';
import "./style.scss";

const Home = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [trafficLights, setTrafficLights] = useState([]);
  const [output, setOutput] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform calculations here based on input values
    const outputData = dijkstra(rows, cols, trafficLights);
    setOutput(outputData);
  };

  // Function to implement Dijkstra's algorithm
  const dijkstra = (rows, cols, trafficLights) => {
    const INF = Number.MAX_SAFE_INTEGER;
    const NO_PARENT = -1;

    // Helper function to initialize matrix
    const initializeMatrix = (rows, cols, value) => {
      return Array.from({ length: rows }, () => Array(cols).fill(value));
    };

    // Initialize adjacencyMatrix with traffic light times
    let adjacencyMatrix = initializeMatrix(rows, cols, 0);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        adjacencyMatrix[i][j] = trafficLights[i * cols + j];
      }
    }

    // Dijkstra's algorithm
    let shortestDistances = Array(rows).fill(INF);
    let added = Array(rows).fill(false);
    let parents = Array(rows).fill(NO_PARENT);

    shortestDistances[0] = 0;

    for (let i = 0; i < rows - 1; i++) {
      let nearestVertex = -1;
      let shortestDistance = INF;

      // Find nearest unmarked vertex
      for (let vertex = 0; vertex < rows; vertex++) {
        if (!added[vertex] && shortestDistances[vertex] <= shortestDistance) {
          nearestVertex = vertex;
          shortestDistance = shortestDistances[vertex];
        }
      }

      added[nearestVertex] = true;

      // Update distances
      for (let vertex = 0; vertex < rows; vertex++) {
        let edgeDistance = adjacencyMatrix[nearestVertex][vertex];
        if (edgeDistance > 0 && (shortestDistance + edgeDistance) < shortestDistances[vertex]) {
          parents[vertex] = nearestVertex;
          shortestDistances[vertex] = shortestDistance + edgeDistance;
        }
      }
    }

    // Construct and return output string
    let output = '';
    for (let i = 1; i < rows; i++) {
      output += `Vertex ${i} -> Distance: ${shortestDistances[i]}, Path: ${getPath(i, parents)}\n`;
    }
    return output;
  };

  // Helper function to get path from parents array
  const getPath = (vertex, parents) => {
    if (parents[vertex] === -1) {
      return `0 -> ${vertex}`;
    } else {
      return `${getPath(parents[vertex], parents)} -> ${vertex}`;
    }
  };

  return (
    <div style={{marginTop: '100px'}}>
      <h1>Shortest Path Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Rows:
          <input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value))} />
        </label>
        <label>
          Columns:
          <input type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value))} />
        </label>
        <button type="submit">Calculate Shortest Path</button>
      </form>
      <div>
        <h2>Output</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Home;

