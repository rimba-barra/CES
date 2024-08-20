Ext.define('Hrd.view.codeofconduct.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.codeofconductformsearch',
    requires: [],
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description',
                    readOnly: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});