from flask import Flask, render_template, request, jsonify
from algorithms.sorting import (
    bubble_sort_steps,
    selection_sort_steps,
    insertion_sort_steps,
    merge_sort_steps
)
from algorithms.searching import linear_search_steps,binary_search_steps

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/visualize", methods=["POST"])
def visualize():
    data = request.get_json()

    algo = data.get("algo")
    values = data.get("values")
    target = data.get("target")   # ⭐ Needed for searching algorithms

    # -------------------------------
    # Sorting Algorithms
    # -------------------------------
    if algo == "bubble":
        return jsonify(bubble_sort_steps(values))

    elif algo == "selection":
        return jsonify(selection_sort_steps(values))

    elif algo == "insertion":
        return jsonify(insertion_sort_steps(values))

    elif algo == "merge":
        return jsonify(merge_sort_steps(values))

    # -------------------------------
    # Searching Algorithms
    # -------------------------------
    elif algo == "linear":
        if target is None:
            return jsonify({"error": "Target required for linear search"}), 400
        return jsonify(linear_search_steps(values, target))
    elif algo == "binary":
        if target is None:
            return jsonify({"error": "Target required for binary search"}), 400
        return jsonify(binary_search_steps(values, target))

    # Add binary search later
    # elif algo == "binary":
    #     return jsonify(binary_search_steps(values, target))

    # -------------------------------
    # Unsupported
    # -------------------------------
    return jsonify({"error": "Algorithm not supported"}), 400


if __name__ == "__main__":
    app.run(debug=True)
