import { AnimationStep, SortArgs, Sorter, SortReply } from './sorter';

export class Merge<T> implements Sorter<T> {
    sort(args: SortArgs<T>): SortReply<T> {
        let copyOfItems = [...args.items];
        let steps: AnimationStep<T>[] = [];

        const mergeArrays = (
            start: number,
            end: number,
            middle: number,
        ): void => {
            let firstIndex = start;
            let secondIndex = middle;
            const resultArray = [];

            while (firstIndex < middle && secondIndex < end) {
                steps.push({
                    green: [
                        copyOfItems[start],
                        copyOfItems[middle],
                        copyOfItems[end - 1],
                    ],
                    red: [copyOfItems[firstIndex], copyOfItems[secondIndex]],
                    swap: [],
                });

                if (
                    args.compare(
                        copyOfItems[firstIndex],
                        copyOfItems[secondIndex],
                    ) < 0
                ) {
                    resultArray.push(copyOfItems[firstIndex]);
                    firstIndex++;
                } else {
                    resultArray.push(copyOfItems[secondIndex]);
                    secondIndex++;
                }
            }

            for (firstIndex; firstIndex < middle; firstIndex++)
                resultArray.push(copyOfItems[firstIndex]);
            for (secondIndex; secondIndex < end; secondIndex++)
                resultArray.push(copyOfItems[secondIndex]);

            for (let i = start; i < end; i++) {
                steps.push({
                    green: [],
                    red: [resultArray[i - start]],
                    swap: [{ value: <T>i, id: '' }, resultArray[i - start]],
                    isSet: true,
                });

                copyOfItems[i] = resultArray[i - start];
            }
        };

        /* Recursive merge sort function */
        const mergeSortHelper = (start: number, end: number): void => {
            if (end - start <= 1) return;

            /* Split and sort each part of array */
            const middle = Math.floor((start + end) / 2);
            mergeSortHelper(start, middle);
            mergeSortHelper(middle, end);

            /* Merge already sorted 2 part of arrays */
            mergeArrays(start, end, middle);
        };

        mergeSortHelper(0, copyOfItems.length);

        return { items: copyOfItems, steps: steps };
    }
}
