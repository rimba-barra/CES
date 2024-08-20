Ext.define('Erems.library.Tool', {
    getInt: function(x) {
        var h = parseInt(x);
        h = isNaN(h) ? 0 : h;
        return h;
    },
    getFloat: function(x) {
        var h = parseFloat(x);
        h = isNaN(h) ? 0.0 : h;
        return h;
    },
    getString: function(x) {
        var h = x === null ? '' : String(x);
        return h;
    }
});

