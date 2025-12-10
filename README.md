<!-- Banner -->
<p align="center">
  <img src="Algorithm-Visualizer/banner.png" alt="Algorithm Visualizer Banner" width="100%" />
</p>

<div align="center">
  <h1>🧠 Algorithm Visualizer <span style="font-size:0.7em;">v1.0</span></h1>
  <p><em>Sorting &amp; Searching brought to life with clean visuals and smooth animations.</em></p>

  <p>
    <img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Flask-Backend-green?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-orange?style=for-the-badge" />
  </p>
</div>

<hr />

<h2>✨ Overview</h2>
<p>
This project is a visual playground for understanding classic
<strong>sorting</strong> and <strong>searching</strong> algorithms.
It shows how data moves, compares, shifts and settles into order —
step by step, with animations and explanations.
</p>

<hr />

<h2>🚀 Features (v1.0)</h2>

<h3>🟦 Sorting Algorithms</h3>
<ul>
  <li><strong>Bubble Sort</strong></li>
  <li><strong>Selection Sort</strong></li>
  <li><strong>Insertion Sort</strong></li>
  <li><strong>Merge Sort</strong> (Visualgo-style splitting &amp; merging)</li>
</ul>

<table>
  <thead>
    <tr>
      <th>Algorithm</th>
      <th>Best</th>
      <th>Average</th>
      <th>Worst</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bubble Sort</td>
      <td>O(n)</td>
      <td>O(n²)</td>
      <td>O(n²)</td>
    </tr>
    <tr>
      <td>Selection Sort</td>
      <td>O(n²)</td>
      <td>O(n²)</td>
      <td>O(n²)</td>
    </tr>
    <tr>
      <td>Insertion Sort</td>
      <td>O(n)</td>
      <td>O(n²)</td>
      <td>O(n²)</td>
    </tr>
    <tr>
      <td>Merge Sort</td>
      <td>O(n log n)</td>
      <td>O(n log n)</td>
      <td>O(n log n)</td>
    </tr>
  </tbody>
</table>

<h3>🟩 Searching Algorithms</h3>
<ul>
  <li><strong>Linear Search</strong>
    <ul>
      <li>Checks one index at a time</li>
      <li>Highlights the current index being inspected</li>
      <li>Clear found / not-found feedback</li>
    </ul>
  </li>

  <li><strong>Binary Search</strong>
    <ul>
      <li>Highlights <code>low</code>, <code>mid</code> and <code>high</code></li>
      <li>Visually shrinks the active search range</li>
      <li>Green highlight when found, red pattern when not found</li>
    </ul>
  </li>
</ul>

<h3>🎛 UI &amp; Controls</h3>
<ul>
  <li>Dark-themed modern layout</li>
  <li>Speed slider for animation (50ms – 1000ms)</li>
  <li>Pause / Play button</li>
  <li>Live explanation panel for each step</li>
  <li>Time complexity box (Best / Avg / Worst)</li>
  <li>Step counter (current step / total steps)</li>
  <li>Color legend for states (normal, compare, key, sorted, not-found)</li>
</ul>

<hr />

<h2>🧩 Visualization Details</h2>

<h3>🎨 Color Legend</h3>
<ul>
  <li><span style="background:cyan;padding:3px 10px;border-radius:4px;display:inline-block;margin-right:6px;"></span> Normal element</li>
  <li><span style="background:yellow;padding:3px 10px;border-radius:4px;display:inline-block;margin-right:6px;"></span> Comparing elements</li>
  <li><span style="background:purple;padding:3px 10px;border-radius:4px;display:inline-block;margin-right:6px;"></span> Key element (Insertion Sort)</li>
  <li><span style="background:#22c55e;padding:3px 10px;border-radius:4px;display:inline-block;margin-right:6px;"></span> Sorted / Found</li>
  <li><span style="background:red;padding:3px 10px;border-radius:4px;display:inline-block;margin-right:6px;"></span> Not Found (search failure)</li>
</ul>

<h3>🧵 Merge Sort View</h3>
<ul>
  <li>Top row → <strong>Main array</strong></li>
  <li>Middle rows → <strong>Left half</strong> &amp; <strong>Right half</strong></li>
  <li>Bottom row → <strong>Merged output</strong></li>
  <li>Each split, compare and merge step is visualized individually</li>
</ul>

<h3>📡 Binary Search View</h3>
<ul>
  <li>Highlights current <strong>search range</strong></li>
  <li>Mid index is emphasized each step</li>
  <li>Search space shrinks visually until value is found or exhausted</li>
</ul>

<hr />

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
  <li><strong>Backend:</strong> Python, Flask</li>
</ul>

<pre>
algorithm-visualizer/
│
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── styles.css
│   └── script.js
└── algorithms/
    ├── sorting.py
    └── searching.py
</pre>

<hr />

<h2>📦 Getting Started</h2>

<h3>1️⃣ Clone the repository</h3>
<pre>
git clone https://github.com/&lt;your-username&gt;/algorithm-visualizer.git
cd algorithm-visualizer
</pre>

<h3>2️⃣ Install dependencies</h3>
<pre>
pip install flask
</pre>

<h3>3️⃣ Run the app</h3>
<pre>
python app.py
</pre>

<h3>4️⃣ Open in browser</h3>
<pre>
http://127.0.0.1:5000/
</pre>

<hr />

<h2>🌟 Roadmap (v2.0)</h2>
<ul>
  <li>Quick Sort &amp; Heap Sort visualizations</li>
  <li>Side-by-side algorithm comparison mode</li>
  <li>Operation counters (comparisons, swaps, shifts)</li>
  <li>Downloadable GIF or video of a run</li>
  <li>Improved mobile responsiveness</li>
</ul>

<hr />

<h2>💙 Author</h2>
<p>
<strong>Rik</strong><br/>
Aspiring engineer crafting tools that make logic visible, simple, and a little bit magical.
</p>
