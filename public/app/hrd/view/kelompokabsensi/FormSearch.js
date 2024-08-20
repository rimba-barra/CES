Ext.define('Hrd.view.kelompokabsensi.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.kelompokabsensiformsearch',
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
                    name: 'name',
                    fieldLabel: 'Name',
                    readOnly: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});