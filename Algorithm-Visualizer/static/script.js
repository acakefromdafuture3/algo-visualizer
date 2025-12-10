let steps = [];
let currentStep = 0;
let speed = 500;
let isPaused = false;

const slider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const pauseBtn = document.getElementById("pausePlayBtn");

slider.oninput = function () {
    speed = this.value;
    speedValue.innerText = "Speed: " + speed + " ms";
};

document.getElementById("algorithm").onchange = updateComplexity;


// ✅ Time Complexity Data
const complexities = {
    bubble: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
    selection: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" },
    insertion: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
    merge: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
    linear: { best: "O(1)", avg: "O(n)", worst: "O(n)" },
    binary: { best: "O(1)", avg: "O(log n)", worst: "O(log n)" }

};

function updateComplexity() {
    let algo = document.getElementById("algorithm").value;
    document.getElementById("bestCase").innerText = complexities[algo].best;
    document.getElementById("avgCase").innerText = complexities[algo].avg;
    document.getElementById("worstCase").innerText = complexities[algo].worst;
}
updateComplexity();
/* ===== Show / Hide Target Input for Search Algorithms ===== */

document.getElementById("algorithm").addEventListener("change", updateTargetVisibility);

function updateTargetVisibility() {
    const algo = document.getElementById("algorithm").value;
    const targetLabel = document.getElementById("targetLabel");
    const targetInput = document.getElementById("targetInput");

    if (algo === "linear" || algo === "binary") {
        targetLabel.style.display = "block";
        targetInput.style.display = "block";
    } else {
        targetLabel.style.display = "none";
        targetInput.style.display = "none";
    }
}
/* =====================================
   BAR FUNCTIONS (Bubble / Selection / Insertion)
===================================== */

function createBars(initialArray) {
    let barsDiv = document.getElementById("bars");
    barsDiv.innerHTML = "";

    let maxVal = Math.max(...initialArray);
    let containerHeight = 300;

    initialArray.forEach(val => {
        let bar = document.createElement("div");
        bar.classList.add("bar");

        bar.style.height = (val / maxVal) * containerHeight + "px";

        let label = document.createElement("div");
        label.classList.add("bar-label");
        label.innerText = val;

        bar.appendChild(label);
        barsDiv.appendChild(bar);
    });
}

function updateBars(arr, highlight = [], keyIndex = null) {
    let bars = document.querySelectorAll(".bar");
    let maxVal = Math.max(...arr);
    let containerHeight = 300;

    arr.forEach((val, i) => {
        bars[i].style.height = (val / maxVal) * containerHeight + "px";
        bars[i].querySelector(".bar-label").innerText = val;

        if (i === keyIndex) bars[i].style.background = "purple";
        else if (highlight.includes(i)) bars[i].style.background = "yellow";
        else bars[i].style.background = "cyan";
    });
}

/* =====================================
   VISUALGO MERGE SORT FUNCTIONS
===================================== */

function createVisualgoRows(arr) {
    document.getElementById("bars").style.display = "none";
    document.getElementById("mergeVisualgo").style.display = "block";

    const main = document.getElementById("mainRow");
    main.innerHTML = "";

    arr.forEach(v => {
        const c = document.createElement("div");
        c.className = "merge-cell";
        c.innerText = v;
        main.appendChild(c);
    });
}

/* =====================================
   SEND DATA
===================================== */

async function sendData() {
    let algo = document.getElementById("algorithm").value;
    let values = document.getElementById("values").value
        .split(",")
        .map(Number);

    let target = null;
if (algo === "linear" || algo === "binary") {
    target = Number(document.getElementById("targetInput").value);
}

let response = await fetch("/visualize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ algo, values, target })
});

    steps = await response.json();
    currentStep = 0;
    isPaused = false;
    pauseBtn.innerText = "Pause";

    // ✅ RESET VISIBILITY
    document.getElementById("bars").style.display = "none";
    document.getElementById("mergeVisualgo").style.display = "none";

    if (algo === "merge") {
    document.getElementById("bars").style.display = "none";
    document.getElementById("mergeVisualgo").style.display = "block";
    createVisualgoRows(values);
} 
else {
    document.getElementById("mergeVisualgo").style.display = "none";
    document.getElementById("bars").style.display = "flex";
    createBars(values);
}


    if (algo === "bubble") {
    document.getElementById("stepInfo").innerHTML =
        "Bubble Sort – Starting comparisons...";
}
else if (algo === "selection") {
    document.getElementById("stepInfo").innerHTML =
        "Selection Sort – Searching for minimum values...";
}
else if (algo === "insertion") {
    document.getElementById("stepInfo").innerHTML =
        "Insertion Sort – Beginning with the first unsorted element...";
}
else if (algo === "merge") {
    document.getElementById("stepInfo").innerHTML =
        "Merge Sort – Preparing to break array into halves...";
}
if (algo === "merge") {
    document.getElementById("legendBox").style.display = "none";
} else {
    document.getElementById("legendBox").style.display = "flex";
}
 document.getElementById("stepCounter").innerHTML = `Step 0 / ${steps.length}`;

    animate();
}

function updateStepCounter() {
    const stepCounter = document.getElementById("stepCounter");
    stepCounter.innerHTML = `Step ${currentStep + 1} / ${steps.length}`;
}



/* =====================================
   MAIN ANIMATION LOOP
===================================== */

function animate() {

    /* --------------------------------------------------
       0. END CONDITION
    -------------------------------------------------- */
    if (currentStep >= steps.length) {
        let algo = document.getElementById("algorithm").value;

        if (algo === "merge") {
            document.querySelectorAll(".merge-cell")
                .forEach(c => c.classList.add("merge-merged"));
        } 
        else {
            document.querySelectorAll(".bar")
                .forEach(bar => bar.style.background = "#22c55e");
        }

        document.getElementById("stepInfo").innerHTML =
            "<b>✅ Completed.</b>";
        return;
    }

    if (isPaused) return;

    /* --------------------------------------------------
       1. READ CURRENT STEP + ALGO  ⭐ MUST BE AT TOP ⭐
    -------------------------------------------------- */
    let step = steps[currentStep];
    let algo = document.getElementById("algorithm").value;
    updateStepCounter();


    /* --------------------------------------------------
       2. LINEAR SEARCH — WORKS PERFECTLY NOW
    -------------------------------------------------- */
    if (algo === "linear") {

        if (step.type === "check") {
            updateBars(step.array, [step.index]);
            document.getElementById("stepInfo").innerHTML =
                `🔍 Checking index <b>${step.index}</b> (value = ${step.array[step.index]})`;
        }

        if (step.type === "found") {
            updateBars(step.array);
            document.querySelectorAll(".bar")[step.index].style.background = "#22c55e";

            document.getElementById("stepInfo").innerHTML =
                `🎯 Found at index <b>${step.index}</b>`;
        }

        if (step.type === "not_found") {
            document.querySelectorAll(".bar").forEach(b => b.style.background = "red");

            document.getElementById("stepInfo").innerHTML =
                `❌ Target not found.`;
        }

        currentStep++;
        setTimeout(animate, speed);
        return; // 🔥 critical — stops sort logic
    }
    /* --------------------------------------------------
       2. BINARY SEARCH — WORKS PERFECTLY NOW
    -------------------------------------------------- */
    if (algo === "binary") {

    // Dim all bars first
    let bars = document.querySelectorAll(".bar");
    bars.forEach(b => {
        b.style.opacity = "0.3";
        b.style.background = "cyan";
    });

    if (step.type === "check") {

        // highlight current search range
        for (let i = step.low; i <= step.high; i++) {
            bars[i].style.opacity = "1";
        }

        // highlight mid
        bars[step.mid].style.background = "yellow";
        bars[step.mid].style.opacity = "1";

        document.getElementById("stepInfo").innerHTML =
            `🔍 Checking mid <b>${step.mid}</b> (value = ${step.array[step.mid]})`;
    }

    if (step.type === "found") {

        bars.forEach(b => b.style.opacity = "0.4");
        bars[step.index].style.background = "#22c55e";
        bars[step.index].style.opacity = "1";

        document.getElementById("stepInfo").innerHTML =
            `🎯 Found target at index <b>${step.index}</b>!`;
    }

    if (step.type === "not_found") {

        bars.forEach(b => {
            b.style.background = "red";
            b.style.opacity = "1";
        });

        document.getElementById("stepInfo").innerHTML =
            `❌ Target not found in array.`;
    }

    currentStep++;
    setTimeout(animate, speed);
    return; // stop here so sorting code doesn't run
}


    /* --------------------------------------------------
       3. NORMAL SORTING ALGORITHMS (Bubble, Selection, Insertion)
    -------------------------------------------------- */
    if (algo !== "merge") {

        if (step.type === "compare") {
            updateBars(step.array, [step.i, step.j], step.key_index);
        }
        else if (step.type === "swap") {
            updateBars(step.array, [step.i, step.j]);
        }
        else if (step.type === "shift") {
            updateBars(step.array, [], step.key_index);
        }
        else if (step.type === "insert") {
            updateBars(step.array, [], step.key_index);
        }
        else if (step.type === "done") {
            updateBars(step.array);
        }

        currentStep++;
        setTimeout(animate, speed);
        return;
    }



    /* --------------------------------------------------
       4. MERGE SORT — VISUALGO STYLE
    -------------------------------------------------- */

    const main = document.getElementById("mainRow");
    const left = document.getElementById("leftRow");
    const right = document.getElementById("rightRow");
    const merge = document.getElementById("mergeRow");

    [...left.children].forEach(c => c.className = "merge-cell");
    [...right.children].forEach(c => c.className = "merge-cell");
    [...merge.children].forEach(c => c.className = "merge-cell merge-merged");


    if (step.type === "split") {

        left.innerHTML = "";
        right.innerHTML = "";
        merge.innerHTML = "";

        step.left.forEach(v => {
            let c = document.createElement("div");
            c.className = "merge-cell";
            c.innerText = v;
            left.appendChild(c);
        });

        step.right.forEach(v => {
            let c = document.createElement("div");
            c.className = "merge-cell";
            c.innerText = v;
            right.appendChild(c);
        });

        document.getElementById("stepInfo").innerHTML =
            "🔵 Merge Sort — Splitting array.";
    }


    if (step.type === "compare") {
        if (left.children[step.left_index])
            left.children[step.left_index].classList.add("merge-active");

        if (right.children[step.right_index])
            right.children[step.right_index].classList.add("merge-active");

        document.getElementById("stepInfo").innerHTML =
            "Comparing elements...";
    }


    if (step.type === "overwrite") {
        let c = document.createElement("div");
        c.className = "merge-cell merge-merged";
        c.innerText = step.value;
        merge.appendChild(c);

        document.getElementById("stepInfo").innerHTML =
            `Added <b>${step.value}</b> to merged output.`;
    }


    if (step.type === "final_merge_start") {

        left.innerHTML = "";
        right.innerHTML = "";
        merge.innerHTML = "";

        step.left_sorted.forEach(v => {
            let c = document.createElement("div");
            c.className = "merge-cell merge-merged";
            c.innerText = v;
            left.appendChild(c);
        });

        step.right_sorted.forEach(v => {
            let c = document.createElement("div");
            c.className = "merge-cell merge-merged";
            c.innerText = v;
            right.appendChild(c);
        });

        document.getElementById("stepInfo").innerHTML =
            "<b>Final Merge Started</b>";
    }


    if (step.type === "final_merge_done") {

        main.innerHTML = "";

        step.merged.forEach(v => {
            let c = document.createElement("div");
            c.className = "merge-cell merge-merged";
            c.innerText = v;
            main.appendChild(c);
        });

        left.innerHTML = "";
        right.innerHTML = "";
        merge.innerHTML = "";

        document.getElementById("stepInfo").innerHTML =
            "<b>Final Merge Completed</b>";
    }


    if (step.type === "done" && !step.merged) {

        main.innerHTML = "";

        step.array.forEach(v => {
            let c = document.createElement("div");
            c.className = "merge-cell merge-merged";
            c.innerText = v;
            main.appendChild(c);
        });

        left.innerHTML = "";
        right.innerHTML = "";
        merge.innerHTML = "";

        document.getElementById("stepInfo").innerHTML =
            "<b>Segment Sorted</b>";
    }


    /* Move step forward */
    currentStep++;
    setTimeout(animate, speed);
}





/* =====================================
   PAUSE / PLAY
===================================== */

function togglePause() {
    isPaused = !isPaused;
    pauseBtn.innerText = isPaused ? "Play" : "Pause";
    if (!isPaused) animate();
}
