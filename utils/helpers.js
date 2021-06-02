module.exports = {
    format_date: date => {
        return `${ new Date( date ).getMonth() + 1 }/${ new Date( date ).getDate() }/${ new Date( date ).getFullYear() }`;
    },
    format_plural: ( word, amount ) => {
        if( amount !== 1 ) {
            return `${word}s`
        }
        return word
    },
    if_equals: function(lvalue, rvalue, options) {
            // helper derived from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
        if (arguments.length < 3)
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            var operator = options.hash.operator || "==";
        var operators = {
            '==':       function(l,r) { return l == r; },
            '===':      function(l,r) { return l === r; },
            '!=':       function(l,r) { return l != r; },
            '<':        function(l,r) { return l < r; },
            '>':        function(l,r) { return l > r; },
            '<=':       function(l,r) { return l <= r; },
            '>=':       function(l,r) { return l >= r; },
            'typeof':   function(l,r) { return typeof l == r; }
        }
        if (!operators[operator])
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
        var result = operators[operator](Math.floor(lvalue),Math.floor(rvalue));
        if( result ) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
}
