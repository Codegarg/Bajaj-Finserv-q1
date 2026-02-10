function getFibonacci(n) {
    let result = [0, 1];
    for (let i = 2; i <= n; i++) {
        result[i] = result[i - 1] + result[i - 2];
    }
    return result.slice(0, n + 1);
}

function getPrimes(arr) {
    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    return arr.filter(isPrime);
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function getHCF(arr) {
    return arr.reduce((a, b) => gcd(a, b));
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function getLCM(arr) {
    return arr.reduce((a, b) => lcm(a, b));
}

module.exports = {
    getFibonacci,
    getPrimes,
    getHCF,
    getLCM
};
