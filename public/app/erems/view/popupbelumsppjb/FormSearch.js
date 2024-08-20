Ext.define('Erems.view.popupbelumsppjb.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupbelumsppjbformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fs_unit_number',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_purchaseletter_no',
                    name: 'purchaseletter_no',
                    fieldLabel: 'Purchaseletter No'
                },
                {
                    xtype      : 'xnamefieldEST',
                    itemId     : 'fs_customer_name',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name'
                },
                {
                    xtype: 'pricetypecombobox',
                    fieldLabel: 'Price Type',
                    name: 'pricetype_id',
                    anchor: '-15',
                    forceSelection: true,
                    listeners: {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
