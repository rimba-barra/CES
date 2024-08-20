Ext.define('Erems.library.template.view.MoneyField2', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.xmoneyfield2',
    maskRe: /[0-9\.]/,
    fieldStyle: 'text-align:right',
    nilaiAsli: 0.0,
    listeners: {
        blur: function(field) {
            field.nilaiAsli = field.getValue();
            field.setRawValue(accounting.formatMoney(field.getValue()));
            
        },
        focus: function(field) {
            field.setRawValue(field.nilaiAsli);
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

