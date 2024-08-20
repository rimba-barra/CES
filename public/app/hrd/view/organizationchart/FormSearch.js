Ext.define('Hrd.view.organizationchart.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.organizationchartformsearch',
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
                    name: 'project',
                    fieldLabel: 'Project',
                    readOnly: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});