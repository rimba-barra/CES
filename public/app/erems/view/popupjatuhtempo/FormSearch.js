Ext.define('Erems.view.popupjatuhtempo.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.popupjatuhtempoformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                   
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                   
                },
                {
                    xtype      : 'xnamefieldEST',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name',
                },
                {
                    xtype      : 'xnumericfieldEST',
                    name       : 'today_plus',
                    fieldLabel : 'Due date from Today +',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
