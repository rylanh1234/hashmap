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

        },

        has(key) {

        },

        remove(key) {

        },

        length() {

        },

        clear() {

        },
    }
}