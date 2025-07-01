import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import './TreeVisualizer.css';

const TreeVisualizer = () => {
  const svgRef = useRef();
  const [treeData, setTreeData] = useState(null);
  const [value, setValue] = useState('');
  const [traversals, setTraversals] = useState({
    bfs: [],
    inorder: [],
    preorder: [],
    postorder: []
  });

  const formatTree = useCallback((flatData) => {
    const toNode = (i) => {
      if (i >= flatData.length) return null;

      const val = flatData[i].value;

      if (val === 'null') {
        return {
          name: 'null',
          children: []
        };
      }

      const left = toNode(2 * i + 1);
      const right = toNode(2 * i + 2);

      return {
        name: val,
        children: [
          left ?? { name: 'null', children: [] },
          right ?? { name: 'null', children: [] }
        ]
      };
    };

    return toNode(0);
  }, []);

  const fetchTraversals = useCallback(async () => {
    try {
      const [bfs, inorder, preorder, postorder] = await Promise.all([
        axios.get('https://visualdsa-backend.onrender.com/tree/bfs'),
        axios.get('https://visualdsa-backend.onrender.com/tree/inorder'),
        axios.get('https://visualdsa-backend.onrender.com/tree/preorder'),
        axios.get('https://visualdsa-backend.onrender.com/tree/postorder')
      ]);
      setTraversals({
        bfs: bfs.data,
        inorder: inorder.data,
        preorder: preorder.data,
        postorder: postorder.data
      });
    } catch (err) {
      console.error('Traversal fetch error:', err);
    }
  }, []);

  const fetchTree = useCallback(async () => {
    try {
      const res = await axios.get('https://visualdsa-backend.onrender.com/tree/all');
      const formatted = formatTree(res.data);
      setTreeData(formatted);
      fetchTraversals();
    } catch (error) {
      console.error('Tree fetch error:', error);
    }
  }, [formatTree, fetchTraversals]);

  const drawTree = useCallback(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (!treeData) return;

    const width = 600;
    const height = 500;

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    const g = svg.append('g').attr('transform', 'translate(50,50)');

    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    g.selectAll('line')
      .data(root.links())
      .enter()
      .append('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', '#999')
      .attr('marker-end', 'url(#arrow)');

    const node = g.selectAll('g.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', 20)
      .attr('fill', d => d.data.name === 'null' ? '#ccc' : '#4caf50');

    node.append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.data.name === 'null' ? '#333' : '#fff')
      .text(d => d.data.name);
  }, [treeData]);

  const insert = async () => {
    if (!value.trim()) return;
    await axios.post(`https://visualdsa-backend.onrender.com/tree/insert?value=${value}`);
    setValue('');
    fetchTree();
  };

  const insertNull = async () => {
    await axios.post('https://visualdsa-backend.onrender.com/tree/insert-null');
    fetchTree();
  };

  const reset = async () => {
    await axios.delete('https://visualdsa-backend.onrender.com/tree/reset');
    fetchTree();
  };

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  useEffect(() => {
    drawTree();
  }, [drawTree]);

  return (
    <div className="tree-page">
      <div className="left-panel">
        <h2>Binary Tree Visualizer</h2>
        <div className="controls">
          <input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button onClick={insert}>Insert</button>
          <button onClick={insertNull}>Insert Null</button>
          <button onClick={reset}>Reset</button>
        </div>
        <svg ref={svgRef} width="100%" height="500px" />
      </div>

      <div className="right-panel">
        <h3>Traversals</h3>
        <p><strong>BFS:</strong> {traversals.bfs.join(' → ')}</p>
        <p><strong>Inorder:</strong> {traversals.inorder.join(' → ')}</p>
        <p><strong>Preorder:</strong> {traversals.preorder.join(' → ')}</p>
        <p><strong>Postorder:</strong> {traversals.postorder.join(' → ')}</p>
      </div>
    </div>
  );
};

export default TreeVisualizer;
