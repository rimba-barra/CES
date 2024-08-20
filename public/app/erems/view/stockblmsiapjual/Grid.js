Ext.define('Erems.view.stockblmsiapjual.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.stockblmsiapjualgrid',
    storeConfig: {
        id: 'StockblmsiapjualGridStore',
        idProperty: 'unit_id',
        extraParams: {}
    },
    bindPrefixName: 'Stockblmsiapjual',
    newButtonLabel: 'New Town Planning',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            defaults:{
                align: 'center',
                xtype:'gridcolumn'
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'unit_id',
                    text: 'ID',
                    width:50
                },
				{
                    dataIndex: 'unit_number',
                    text: 'Kav. Number',
                    width:65
                },
                {
                    xtype:'booleancolumn',
                    dataIndex: 'is_readystock',
                    text: 'Siap Stock',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype:'booleancolumn',
                    dataIndex: 'is_readylegal',
                    text: 'Siap Legal',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster'
                },{
                    dataIndex: 'block_block',
                    text: 'Block Name'
                },{
                    dataIndex: 'pt_name',
                    text: 'PT. Name'
                },{
                    dataIndex: 'type_name',
                    text: 'Type'
                },{
                    dataIndex: 'productcategory_productcategory',
                    text: 'Category'
                },{
                    dataIndex: 'land_size',
                    text: 'Land Size',
                    width:40
                },{
                    dataIndex: 'building_size',
                    text: 'Building Size',
                    width:40
                },{
                    dataIndex: 'kelebihan',
                    text: 'Kelebihan',
                    width:40
                },{
                    dataIndex: 'floor',
                    text: 'Floor',
                    width:40
                },{
                    dataIndex: 'floor_size',
                    text: 'Floor size',
                    width:40
                },{
                    dataIndex: 'bedroom',
                    text: 'Bedroom',
                    width:40
                },{
                    dataIndex: 'bathroom',
                    text: 'Bathroom',
                    width:40
                },{
                    dataIndex: 'electricity',
                    text: 'Electricity',
                    width:40
                },{
                    dataIndex: 'unitstatus_status',
                    text: 'Status'
                },{
                    dataIndex: 'progress',
                    text: 'Progress ( % )'
                },

                {
                    dataIndex: 'useradd',
                    text: 'Added By'
                },
                {
                    dataIndex: 'Addon',
                    text: 'Added Date'
                },
                {
                    dataIndex: 'useredit',
                    text: 'Edited By'
                },
                {
                    dataIndex: 'Modion',
                    text: 'Edited Date'
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
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
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
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: []
        };
        return ac;
    },
});
