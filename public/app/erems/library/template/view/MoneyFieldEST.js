/// Create by erwin 14072021
Ext.define('Erems.library.template.view.MoneyFieldEST', {
    extend          : 'Ext.form.field.Text',
    alias           : 'widget.xmoneyfieldEST',
    maskRe          : /[0-9\.-]/,
    fieldStyle      : 'text-align:right;',
    enableKeyEvents : true,
    config          : { decPrecision: 2 },
    initComponent   : function(config) {
        var me = this;
        me.initConfig(config);
        Ext.applyIf(me, {});
        me.callParent(arguments);
    },
    listeners       : {
        render : function( field ) {
            // field.getEl().on('click', function( event, el ) {
            //     field.focus(true);
            //     let cursorPos = field.getValue().length;
            //     field.selectText(cursorPos, cursorPos);
            // });
            var precision = field.getDecPrecision();
            var angka     = field.getValue();
            if(accounting.unformat(angka) < 0){
                field.setRawValue(accounting.formatMoney(angka, { format : { neg : "%s -%v" }, precision : precision }));
            }
            else{
                field.setRawValue(accounting.formatMoney(angka, { precision : precision }));
            }
        },
        blur : function(field) {
            var precision = field.getDecPrecision();
            var angka     = field.getValue();
            if(accounting.unformat(angka) < 0){
                field.setRawValue(accounting.formatMoney(angka, { format : { neg : "%s -%v" }, precision : precision }));
            }
            else{
                field.setRawValue(accounting.formatMoney(angka, { precision : precision }));
            }
        },
        focus : function(field) {
            if(!field.readOnly){
                if(accounting.unformat(field.getValue()) == 0){
                    field.setRawValue('');
                }
                else{
                    var me = this;
                    me.setRawvalue(field, 'focus');
                }
            }
        },
        keyup : function(field){
            var me = this;
            me.setRawvalue(field, 'keyup');
        },
    },
    setValuem: function(val) {
        var precision = this.getDecPrecision();
        if(val < 0){
            this.setValue(accounting.formatMoney(val, { format : { neg : "%s -%v" }, precision : precision }));
        }
        else{
            this.setValue(accounting.formatMoney(val, { precision : precision }));
        }
    },
    getValuem:function(){
       return accounting.unformat(this.getValue());
    },
    toCurrency:function(){
        var precision = this.getDecPrecision();
        var val       = this.getValue();
        if(val < 0){
            this.setValue(accounting.formatMoney(val, { format : { neg : "%s -%v" }, precision : precision }));
        }
        else{
            this.setValue(accounting.formatMoney(val, { precision : precision }));
        }
    },
    setRawvalue : function(field, events='focus'){
        var angka     = field.getValue(),
            minus     = angka.includes('-') ? '-' : '',
            numstr    = angka.replace(/[^.\d]/g, '').toString(),
            split     = numstr.split('.'),
            sisa      = split[0].length % 3,
            rupiah    = split[0].substr(0, sisa),
            ribuan    = split[0].substr(sisa).match(/\d{3}/gi);

        if(ribuan){
            separator = sisa ? ',' : '';
            rupiah += separator + ribuan.join(',');
        }

        if(events == 'focus'){
            rupiah = split[1] != undefined && split[1] > 0 ? rupiah + '.' + split[1] : rupiah;
        }
        else if(events == 'keyup'){
            rupiah = split[1] != undefined ? rupiah + '.' + split[1] : rupiah;
        }
        else{
            rupiah = 0;
        }

        rupiah = minus + rupiah;
        
        field.setRawValue(rupiah);
    }
});