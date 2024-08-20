Ext.define('Gl.view.koreksisetelahposting.Grid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.koreksisetelahpostinggrid',
    store: 'Koreksisetelahposting',
    bindPrefixName: 'Koreksisetelahposting',
    newButtonLabel: 'Add New',
    cls: 'koreksisetelahposting', 
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: {
                injectCheckbox: 0,
                pruneRemoved: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 150,
                    dataIndex: 'no_generate',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    width: 150,
                    dataIndex: 'voucher_date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                    hideable: false,
                    text: 'Voucher Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    width: 150,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Group Voucher Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_posting',
                    width: 200,
                    dataIndex: 'is_post',
                    renderer: function (value) {
                        var status = '';
                        if (value == 1) {
                            status = 'Telah di Posting';
                        } else {
                            status = 'Belum di Posting';
                        }
                        return status;
                    },
                    hideable: false,
                    text: 'Posting'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    width: 100,
                    dataIndex: 'addbyname',
                    hideable: false,
                    text: 'Added by'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    width: 100,
                    dataIndex: 'modibyname',
                    hideable: false,
                    text: 'Modified by'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
     viewConfig: { 
        stripeRows: true 
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
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },                 
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
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
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
               
                
            ]
        };
        return ac;
    },
});


