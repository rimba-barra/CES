Ext.define('Erems.library.template.component.Testmonthfield', {
    extend: 'Ext.form.field.Month',
    alias: 'widget.testmonthfield',
    flagSelect: false,
    tempD: null,
    listeners: {
        select: function(el, val) {
            el.tempD = val;
            el.flagSelect = true;

        },
        change: function(el, val) {
            if (el.flagSelect) {
                el.setValue(el.tempD);
                el.flagSelect = false;
            }

        },
        blur: function(el, val) {

            el.setValue(el.tempD);


        }
    },
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    getFakeValue:function(){
        return this.tempD;
    }
})

