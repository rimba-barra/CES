Ext.define('Hrd.view.ubahstatus.GridStatusInfo', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.ubahstatusinfogrid',
    storeConfig: {
        id: 'UbahstatusInfoGridStore',
        idProperty: 'statuschange_id',
        extraParams: {
            mode_read:'statuschange'
            
        }
    },
    bindPrefixName: 'Ubahstatus',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            // dockedItems:[],
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
                    dataIndex:'employeestatus_employeestatus',
                    text:'New Status',
                    width:75
                },
                {
                    dataIndex: 'sk_number',
                    text: 'No. SK',
                    width:120
                },
                {
                   xtype:'datecolumn',
                   dataIndex: 'effective_date',
                   format:'d-m-Y',
                   text: 'Effective',
                   width:70
                },
                {
                   xtype:'booleancolumn',
                   dataIndex: 'approved',
                   align: 'center',
                   falseText: ' ',
                   trueText: '&#10003;',
                   text: 'Approval',
                   width:52
                },
                // add by wulan sari 03122020
                {
                   xtype:'booleancolumn',
                   dataIndex: 'is_applied',
                   align: 'center',
                   falseText: ' ',
                   trueText: '&#10003;',
                   text: 'Applied',
                   width:52
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
                height: 'auto',
                overflowX: 'auto',
                items: [
                    {
                        xtype: 'button',
                        action: 'viewlog',
                        // hidden: true,
                        disabled: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Update',
                        text: "View history"
                    },
                    
                ]
            },
        ];
        return dockedItems;
    },
    
});