Ext.define('Cashier.view.offsetreport.GridSub', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.offsetreportgridsub',
    bindPrefixName: 'Offsetreport',
    store: 'Subaccountcode',
    height: 400,
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'subgl_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'code',
                    text: 'Code',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'code1',
                    text: 'Code 1',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'code2',
                    text: 'Code 2',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'code3',
                    text: 'Code 3',
                    align: 'center',
                    renderer: function(value, meta, record) {
                        if (value == 0) { 
                            return '';
                        }else { 
                            return value;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'code4',
                    text: 'Code 4',
                    align: 'center',
                    renderer: function(value, meta, record) {
                        if (value == 0) { 
                            return '';
                        }else { 
                            return value;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'description',
                    text: 'Description'
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
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'process',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnProcess',
                        margin: '0 5 0 0',
                        text: 'Process',
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnCancel',
                        margin: '0 5 0 0',
                        text: 'Cancel',
                    }
                ]
            },
            // {
            //     xtype: 'pagingtoolbar',
            //     dock: 'bottom',
            //     width: 360,
            //     displayInfo: true,
            //     store: this.getStore()
            // }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    action: 'delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }

            ]
        };
        return ac;
    },
});


