Ext.define('Erems.view.popuplogkomunikasicustomer.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popuplogkomunikasicustomerformsearch',
    initComponent : function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_department',
                    name       : 'department',
                    fieldLabel : 'Department'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});