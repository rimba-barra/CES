Ext.define('Erems.view.popupholdteknik.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.popupholdteknikgrid',
    
    bindPrefixName:'Popupholdteknik',
   // itemId:'',
    newButtonLabel:'New CAC',
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
                    xtype: 'rownumberer',
                    width:30
                },
                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'block_block',
                    text: 'Block',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    text: 'Unit',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'type_name',
                    text: 'Tipe Rumah',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_land_size',
                    text: 'Luas Tanah',
                    width:70
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_building_size',
                    text: 'Luas Bangunan',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'notes_holdteknik',
                    text: 'Notes Hold Teknik',
                    width:200
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

       var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                   
                    {
                        xtype: 'button',
                        action: 'excel_page',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export this page'
                    },
                     {
                        xtype: 'button',
                        action: 'excel_selected',
                        itemId: 'btnExportSelected',
                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export selected'
                    },
                     {
                        xtype: 'button',
                        action: 'excel_all',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export all'
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
    },
});


