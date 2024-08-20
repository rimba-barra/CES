Ext.define('Erems.view.popupholdbook.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupholdbookformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [{
                    fieldLabel:'Unit Number',
                    xtype: 'textfield',
                    name: 'unit_number',
                    enableKeyEvents: true
                },],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
