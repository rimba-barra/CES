Ext.define('Gl.view.asset.FormData', {
    alias: 'widget.assetformdata',
    extend: 'Gl.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Gl.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'asset_id'
                },
                {
                    xtype: 'textfield',
                    name: 'asset_account',
                    fieldLabel: 'Account',
                    size: 30
                },
                {
                    xtype: 'textfield',
                    name: 'asset_name',
                    fieldLabel: 'Name',
                    size: 30
                }
                
            ],
            dockedItems: me.generateDockedItem()

        });

        me.callParent(arguments);
    }

});
      