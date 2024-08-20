Ext.define('Erems.view.mastercustomer.browse.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.mastercustomerbrowseformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'xname',
                    itemId     : 'fs_unit_number',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name',
                    anchor     :'-5'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});