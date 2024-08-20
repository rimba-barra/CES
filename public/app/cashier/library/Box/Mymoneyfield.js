Ext.define('Cashier.library.box.Mymoneyfield', {
    alias: 'widget.mymoneyfield',
    extend: 'Ext.form.field.Text',
    enableKeyEvents: true,
    maskRe: /[0-9\.]/,
    fieldStyle: 'text-align:right',
    value: 0.00,
    listeners: {
        change: function(el) {
            var x = el.getValue();
            x.slice();
            el.setValue('10.000.000');
        }
    },
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
})