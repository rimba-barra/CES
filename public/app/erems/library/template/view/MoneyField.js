Ext.define('Erems.library.template.view.MoneyField', {
    extend     : 'Ext.form.field.Text',
    alias      : 'widget.xmoneyfield',
    maskRe     : /[0-9\.]/,
    fieldStyle : 'text-align:right',
    listeners  : {
        blur: function(field) {
            var val = field.getValue();
            if(val < 0){
                field.setRawValue(accounting.formatMoney(val, { format : { neg : "%s -%v" } }));
            }
            else{
                field.setRawValue(accounting.formatMoney(val));
            }
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
        if(val < 0){
            this.setValue(accounting.formatMoney(val, { format : { neg : "%s -%v" } }));
        }
        else{
            this.setValue(accounting.formatMoney(val));
        }
        
    },
    getValuem:function(){
       return accounting.unformat(this.getValue());
    },
    toCurrency:function(){
        var val = this.getValue();
        if(val < 0){
            this.setValue(accounting.formatMoney(val, { format : { neg : "%s -%v" } }));
        }
        else{
            this.setValue(accounting.formatMoney(val));
        }
    }

});

