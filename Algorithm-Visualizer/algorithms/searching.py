def linear_search_steps(arr, target):
    steps = []
    a = arr.copy()

    for i in range(len(a)):
        # Step: checking index
        steps.append({
            "type": "check",
            "index": i,
            "array": a.copy(),
            "target": target
        })

        if a[i] == target:
            # Found step
            steps.append({
                "type": "found",
                "index": i,
                "array": a.copy()
            })
            steps.append({"type": "done"})
            return steps

    # Not found
    steps.append({"type": "not_found"})
    return steps
def binary_search_steps(arr, target):
    steps = []

    low, high = 0, len(arr) - 1

    # detect order
    ascending = arr[0] <= arr[-1]

    while low <= high:
        mid = (low + high) // 2

        steps.append({
            "type": "check",
            "low": low,
            "mid": mid,
            "high": high,
            "array": arr.copy()
        })

        if arr[mid] == target:
            steps.append({
                "type": "found",
                "index": mid,
                "array": arr.copy()
            })
            return steps

        if ascending:
            # normal binary search
            if target < arr[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            # reversed logic for descending arrays
            if target < arr[mid]:
                low = mid + 1
            else:
                high = mid - 1

    steps.append({
        "type": "not_found",
        "array": arr.copy()
    })
    return steps
