def bubble_sort_steps(arr):
    a = arr.copy()
    n = len(a)
    steps = []

    for i in range(n):
        for j in range(n - i - 1):

            # Step: comparison
            steps.append({
                "type": "compare",
                "i": j,
                "j": j + 1,
                "array": a.copy()
            })

            if a[j] > a[j + 1]:
                # Swap
                a[j], a[j + 1] = a[j + 1], a[j]

                # Step: swap
                steps.append({
                    "type": "swap",
                    "i": j,
                    "j": j + 1,
                    "array": a.copy()
                })

    # Final sorted array
    steps.append({
        "type": "done",
        "array": a.copy()
    })

    return steps
def selection_sort_steps(arr):
    a = arr.copy()
    n = len(a)
    steps = []

    for i in range(n):
        min_idx = i

        for j in range(i + 1, n):
            # comparison step
            steps.append({
                "type": "compare",
                "i": min_idx,
                "j": j,
                "array": a.copy()
            })

            if a[j] < a[min_idx]:
                min_idx = j

        # swap step (only if needed)
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            steps.append({
                "type": "swap",
                "i": i,
                "j": min_idx,
                "array": a.copy()
            })

    steps.append({
        "type": "done",
        "array": a.copy()
    })

    return steps
def insertion_sort_steps(arr):
    a = arr.copy()
    n = len(a)
    steps = []

    for i in range(1, n):
        key = a[i]
        key_index = i
        j = i - 1

        while j >= 0 and a[j] > key:
            # Comparison step
            steps.append({
                "type": "compare",
                "i": j,
                "j": key_index,
                "key_index": key_index,
                "array": a.copy()
            })

            # Shift right
            a[j + 1] = a[j]
            key_index = j + 1

            steps.append({
                "type": "shift",
                "i": j,
                "j": j + 1,
                "key_index": key_index,
                "array": a.copy()
            })

            j -= 1

        a[j + 1] = key
        key_index = j + 1

        steps.append({
            "type": "insert",
            "i": key_index,
            "value": key,
            "key_index": key_index,
            "array": a.copy()
        })

    steps.append({
        "type": "done",
        "array": a.copy()
    })

    return steps
def merge_sort_steps(arr):
    steps = []
    a = arr.copy()

    def merge_sort(low, high):
        if low < high:
            mid = (low + high) // 2

            # STEP: announce split
            steps.append({
                "type": "split",
                "low": low,
                "mid": mid,
                "high": high,
                "left": a[low:mid+1],
                "right": a[mid+1:high+1],
                "array": a.copy()
            })

            # Recurse left
            merge_sort(low, mid)

            # Recurse right
            merge_sort(mid + 1, high)

            # Before merging, show two sorted halves
            steps.append({
                "type": "final_merge_start",
                "left_sorted": a[low:mid+1],
                "right_sorted": a[mid+1:high+1],
                "array": a.copy()
            })

            # Perform merge
            merge(low, mid, high)

            # After merging, show unified sorted segment
            steps.append({
                "type": "final_merge_done",
                "merged": a[low:high+1],
                "array": a.copy()
            })

    def merge(low, mid, high):
        left = a[low:mid+1]
        right = a[mid+1:high+1]

        i = j = 0
        k = low

        # Compare & merge left and right halves
        while i < len(left) and j < len(right):

            steps.append({
                "type": "compare",
                "left_index": i,
                "right_index": j,
                "array": a.copy()
            })

            if left[i] <= right[j]:
                a[k] = left[i]

                steps.append({
                    "type": "overwrite",
                    "index": k,
                    "value": a[k],
                    "array": a.copy()
                })

                i += 1
            else:
                a[k] = right[j]

                steps.append({
                    "type": "overwrite",
                    "index": k,
                    "value": a[k],
                    "array": a.copy()
                })

                j += 1

            k += 1

        # Remaining elements (left)
        while i < len(left):
            a[k] = left[i]

            steps.append({
                "type": "overwrite",
                "index": k,
                "value": a[k],
                "array": a.copy()
            })

            i += 1
            k += 1

        # Remaining elements (right)
        while j < len(right):
            a[k] = right[j]

            steps.append({
                "type": "overwrite",
                "index": k,
                "value": a[k],
                "array": a.copy()
            })

            j += 1
            k += 1

    merge_sort(0, len(a) - 1)

    # Final confirmation
    steps.append({
        "type": "done",
        "array": a.copy()
    })

    return steps

