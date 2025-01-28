function HashMap() {
    return {
        loadFactor: 0.75,
        capacity: 16,
        buckets: new Array(this.capacity),

        hash(key) {
            let hashCode = 0;

            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
                // % this.capacity for very long keys that would lead to hash codes that exceed the
                // maximum integer value allowed by JavaScript
                hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
            }

            return hashCode;
        },

        set(key, value) {
            const bucketIdx = this.hash(key);
            // create the bucket if not made yet
            if (!this.buckets[bucketIdx]) {
                this.buckets[bucketIdx] = [];
                this.buckets[bucketIdx].push([key, value]);
            }
            // check if the key already exists, if it does, then update the its value, if not, then add its value
            this.buckets[bucketIdx].forEach((pair) => {
                if (pair[0] === key) {
                    pair[1] = value;
                }
                else {
                    this.buckets[bucketIdx].push([key, value]);
                }
            })
            if (this.length() > this.loadFactor * this.capacity) {
                const pairsArray = this.entries();
                this.capacity *= 2;
                this.clear()
                pairsArray.forEach((pair) => {
                    this.set(pair[0], pair[1]);
                })
            }
        },

        get(key) {
            const bucketIdx = this.hash(key);
            for (const pair of this.buckets[bucketIdx]) {
                if (pair[0] === key) {
                    return pair[1];
                }
            }
            return null;
        },

        has(key) {
            const bucketIdx = this.hash(key);
            for (const pair of this.buckets[bucketIdx]) {
                if (pair[0] === key) {
                    return true;
                }
            }
            return false;
            // could do return this.get(key) !== null;
        },

        remove(key) {
            const bucketIdx = this.hash(key);
            let pairIdx = 0;
            for (const pair of this.buckets[bucketIdx]) {
                if (pair[0] === key) {
                    this.buckets[bucketIdx].splice(pairIdx, 1);
                    return true;
                }
                pairIdx += 1;
            }
            return false;
        },

        length() {
            let length = 0;
            this.buckets.forEach((bucket) => {
                if (bucket) {
                    length += bucket.length;
                }
            })
            return length;
        },

        clear() {
            this.buckets = new Array(this.capacity);
        },

        keys() {
            let keysArray = [];
            this.buckets.forEach((bucket) => {
                bucket.forEach((pair) => {
                    keysArray.push(pair[0]);
                })
            })
            return keysArray;
        },

        values() {
            let valuesArray = [];
            this.buckets.forEach((bucket) => {
                bucket.forEach((pair) => {
                    valuesArray.push(pair[1]);
                })
            })
            return valuesArray;
        },

        entries() {
            let pairsArray = [];
            this.buckets.forEach((bucket) => {
                if (bucket) {
                    bucket.forEach((pair) => {
                        pairsArray.push(pair);
                    })
                }
            })
            return pairsArray;
        },
    }
}

module.exports = { HashMap };