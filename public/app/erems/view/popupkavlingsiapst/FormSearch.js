Ext.define('Erems.view.popupkavlingsiapst.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.popupkavlingsiapstformsearch',
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
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
