Ext.define('Hrd.view.lookup.sanksiketerlambatanview.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.lookupsanksiketerlambatanviewgrid',
    storeConfig:{
        id:'SanksiketerlambatanviewGridStore',
        idProperty:'sanksiketerlambatan_id',
        extraParams:{}
    },
    bindPrefixName: 'Sanksi Keterlambatan',
    newButtonLabel: 'New Sanksi Keterlambatan',
    initComponent: function() {
        var me = this;
		
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
                 xtype: 'gridcolumn',                
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
				checkOnly : true
            }),
            columns: [
                {
                    xtype: 'rownumberer',
					width:30
                },
                // {
                //     xtype: 'hiddenfield',
                //     name: 'extraleave_id'
                // },
                {
                    dataIndex: 'periode_month',
                    text: 'Month',
                    width:100
                },
                {
                    dataIndex: 'periode',
                    text: 'Year',
                    width:100
                },
                {
                    dataIndex: 'amount',
                    text: 'Leave Entitlements',
                    width:150
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width:300
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Process',
                    dataIndex   : 'proses',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Cancel',
                    dataIndex   : 'cancel',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                // me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    
    // generateActionColumn: function () {
    //     var me = this;
    //     var ac = {
    //         xtype: 'actioncolumn',
    //         hidden: false,
    //         width: 75,
    //         resizable: false,
    //         align: 'center',
    //         items: [
    //             {
    //                 xtype: 'button',
    //                 icon: 'app/main/images/icons/user.png',
    //                 action: 'viewemployee',
    //                 bindAction: me.bindPrefixName + 'Update',
    //                 // text: 'View',
    //                 tooltip: 'View Employee',
    //                 margin: '0 30'
    //             },
    //             {
    //                 xtype: 'button',
    //                 icon: 'app/main/images/icons/delete.png',
    //                 action: 'cancelproses',
    //                 bindAction: me.bindPrefixName + 'Update',
    //                 // text: 'View',
    //                 tooltip: 'Cancel',
    //                 margin: '0 0 0 30'
    //             },
    //             {
    //                 defaultIcon: 'icon-edit',
    //                 iconCls: ' ux-actioncolumn icon-edit act-update',
    //                 action: 'updatev',
    //                 altText: 'Edit',
    //                 tooltip: 'Edit'
    //             }
    //         ]
    //     }

    //     return ac;

    // },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
					{
						xtype: 'tbfill'
					},
                    {
                        xtype: 'button',
                        border:1,
                        action: 'viewproses',
                        margin: '0 5 0 0',
		        		iconCls: 'icon-new',
                        text: 'View Employee'
                    },
                    {
                        xtype: 'button',
                        border:1,
                        action: 'editproses',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add Another Employee'
                    },
                    {
                        xtype: 'button',
                        border:1,
                        action: 'cancelproses',
                        margin: '0 5 0 0',
                        iconCls: 'icon-cancel',
                        text: 'Cancel Process'
                    },
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