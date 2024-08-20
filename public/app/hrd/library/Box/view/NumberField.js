Ext.define('Hrd.library.box.view.NumberField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.nfnumberfield',
    maskRe: /[0-9\.]/,
    fieldStyle: 'text-align:right',
    width:100,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        });

        me.callParent(arguments);
    },

});

