Ext.define('Erems.view.popupchgpricesatubulan.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.popupchgpricesatubulangrid',
    storeConfig: {
        id: 'PopupchgpricesatubulanGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Popupchgpricesatubulan',
    newButtonLabel: 'New Form Order AJB',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'cluster_code',
                    text: 'Cluster Code'
                },
                {
                    dataIndex: 'block_block',
                    text: 'Block'
                },
                {
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number'
                },
                {
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    text: 'Purchaseletter Number'
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'purchaseletter_purchase_date',
                    text: 'Old Purchase Date',
                    format:'d-m-Y'
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'harga_total_jual',
                    text: 'Old Sales Price',
                },
                {
                    dataIndex: 'type_name',
                    text: 'Old Type Name'
                },
                {
                    dataIndex: 'unit_land_size',
                    text: 'Old Land Size'
                },
                {
                    dataIndex: 'unit_kelebihan',
                    text: 'Old Land Over Size'
                },
                {
                    dataIndex: 'unit_building_size',
                    text: 'Old Building Size'
                },
                {
                    dataIndex: 'pricetype_pricetype_id',
                    text: 'Old Pays',
                    renderer:function (value, metaData, record, row, col, store, gridView) {
                        if(parseInt(value)==1){
                            return 'T';
                        }else if(parseInt(value)==2){
                            return 'K';
                        }else{
                            return 'I';
                        }
                    }
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'changeprice_date',
                    text: 'New Purchase Date',
                    format:'d-m-Y'
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'harga_total_jual_new',
                    text: 'New Sales Price'
                },
                {
                    dataIndex: 'typenew_name',
                    text: 'New Type Name'
                },
                {
                    dataIndex: 'unitnew_land_size',
                    text: 'New Land Size'
                    
                },
                {
                    dataIndex: 'unitnew_kelebihan',
                    text: 'New Land Over Size'
                },
                {
                    dataIndex: 'unitnew_building_size',
                    text: 'New Building Size'
                },
                {
                    dataIndex: 'pricetypenew_pricetype_id',
                    text: 'New Pays',
                    renderer:function (value, metaData, record, row, col, store, gridView) {
                        if(parseInt(value)==1){
                            return 'T';
                        }else if(parseInt(value)==2){
                            return 'K';
                        }else{
                            return 'I';
                        }
                    }
                },
                {
                    xtype:'booleancolumn',
                    dataIndex:'purchaseletterrevision_is_approve',
                    text:'Approved',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'purchaseletterrevision_approve_date',
                    text: ' Approve Date',
                    format:'d-m-Y'
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
