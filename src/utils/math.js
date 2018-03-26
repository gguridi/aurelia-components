import numeral from 'numeral';

export class MathUtils {
    
    divide(numerator, denominator) {
        if (denominator) {
            return numerator / denominator;
        }
        return 0;
    }
    
    sum(a, b) {
        a = (a) ? numeral().unformat(a.toString()) : 0;
        b = (b) ? numeral().unformat(b.toString()) : 0;
        return a + b;
    }
    
    multiply(a, b) {
        a = (a) ? numeral().unformat(a.toString()) : 0;
        b = (b) ? numeral().unformat(b.toString()) : 0;
        return a * b;
    }
}