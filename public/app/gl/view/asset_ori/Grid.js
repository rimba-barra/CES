Ext.define('Gl.view.asset.Grid',{
    extend:'Gl.library.template.view.Grid',
    alias:'widget.assetgrid',
    store:'Asset',
    bindPrefixName:'Asset',
   // itemId:'',
    newButtonLabel:'Add New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_asset_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'asset_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_asset_account',
                    width: 100,
                    dataIndex: 'asset_account',
                    hideable: false,
                    text: 'Account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_asset_name',
                    width: 100,
                    dataIndex: 'asset_name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_asset_note',
                    width: 100,
                    dataIndex: 'asset_note',
                    hideable: false,
                    text: 'Note'
                },
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


