Ext.define('Hrd.view.anggarantaka.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.anggarantakagrid',
    
    storeConfig: {
        id: 'AnggarantakaGridStore',
        idProperty: 'tandakasih_id',
        extraParams: {}
    },
    bindPrefixName: 'Anggarantaka',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'group_code',
                    width:120,
                    text: 'Category (Golongan)'
                },
                
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});