function HashMap() {
    return {
        loadFactor: 0.8,
        capacity: 16,
        buckets: new Array(capacity),

        hash(key) {
            let hashCode = 0;

            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
                // % 16 for very long keys that would lead to hash codes that exceed the
                // maximum integer value allowed by JavaScript
                hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
            }

            return hashCode;
        },

        set(key, value) {
            const bucketIdx = this.hash(key);
            // create the bucket if not made yet
            if (!this.buckets[bucketIdx]) {
                this.buckets[bucketIdx] = [];
            }

            // check if the key already exists, if it does, then update the its value, if not, then add its value
            this.buckets[bucketIdx].forEach((pair) => {
                if (pair[0] === key) {
                    pair[1] = value;
                }
                else {
                    this.buckets[bucketIdx].push([key,value]);
                }
            })
        },

        get(key) {
            const bucketIdx = this.hash(key);
            this.buckets[bucketIdx].forEach((pair) => {
                if (pair[0] === key) {
                    return pair[1];
                }
            })
            return null;
        },

        has(key) {
            const bucketIdx = this.hash(key);
            this.buckets[bucketIdx].forEach((pair) => {
                if (pair[0] === key) {
                    return true;
                }
            })
            return false;
            // could do return this.get(key) !== null;
        },

        remove(key) {
            const bucketIdx = this.hash(key);
            let pairIdx = 0;
            this.buckets[bucketIdx].forEach((pair) => {
                if (pair[0] === key) {
                    this.buckets[bucketIdx].splice(pairIdx, 1);
                    return true;
                }
                pairIdx += 1;
            })
            return false;
        },

        length() {
            let length = 0;
            this.buckets.forEach((bucket) => {
                length += bucket.length;
            })
            return length;
        },

        clear() {

        },

        keys() {

        },

        values() {

        },

        entries() {

        },
    }
}