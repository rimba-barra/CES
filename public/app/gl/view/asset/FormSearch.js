Ext.define('Gl.view.Asset.FormSearch', {
    extend: 'Gl.library.box.view.FormSearch',
    alias: 'widget.assetformsearch',
    requires: [],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name:'code',
                    fieldLabel:'Code'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});