Ext.define('Master.library.template.view.MoneyField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.xmoneyfield',
    maskRe: /[0-9\.]/,
    fieldStyle: 'text-align:right',
    listeners: {
        blur: function(field) {
            field.setRawValue(accounting.formatMoney(field.getValue()));
        },
        focus: function(field) {
            field.setRawValue(accounting.unformat(field.getValue()));
        }
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        });

        me.callParent(arguments);
    },
    setValuem: function(val) {
        this.setValue(accounting.formatMoney(val));
        
    },
    getValuem:function(){
       return accounting.unformat(this.getValue());
    },
    toCurrency:function(){
       this.setValue(accounting.formatMoney(this.getValue()));
    }

});

