Ext.define('Erems.view.schedulebiayalainlain.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.schedulebiayalainlainbrowsegrid',
    store: 'Unitschedulebll',
    bindPrefixName: 'Purchaseletter',
    
    newButtonLabel: 'New Purchaseletter',
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
                    itemId: 'colms_unit_number',
                    width: 80,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_code',
                    width: 80,
                    align: 'right',
                    dataIndex: 'cluster_code',
                    text: 'Cluster Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kawasan',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block_code',
                    width: 80,
                    align: 'right',
                    dataIndex: 'block_code',
                    text: 'Block Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    align: 'right',
                    dataIndex: 'block',
                    text: 'Block'
                },
                
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',         
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        hidden: false,
                        itemId: 'btnUnit',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        text: 'Select Unit'
                    }
                ]
            },
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