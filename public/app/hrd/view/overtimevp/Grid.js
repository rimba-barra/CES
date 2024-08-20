Ext.define('Hrd.view.overtimevp.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.overtimevpgrid',
    
    storeConfig: {
        id: 'OvertimevpGridStore',
        idProperty: 'tandakasih_id',
        extraParams: {}
    },
    bindPrefixName: 'Overtimevp',
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
                    dataIndex: 'start_year',
                    width:120,
                    text: 'Start Year'
                },
                {
                    dataIndex: 'end_year',
                    width:120,
                    text: 'End Year'
                },
                {
                    dataIndex: 'value',
                    xtype:'numbercolumn',
                    width:120,
                    text: 'Value'
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