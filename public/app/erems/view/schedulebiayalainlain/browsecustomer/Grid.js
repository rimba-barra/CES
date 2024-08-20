Ext.define('Erems.view.schedulebiayalainlain.browsecustomer.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.schedulebiayalainlainbrowsecustomergrid',
    // store: 'Purchaseletterbl',
    store: 'Customerschedulebll',
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
                    width: 50,
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 150,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'KTP_number',
                    text: 'NIK'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'home_phone',
                    text: 'Home Phone'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'office_phone',
                    text: 'Office Phone'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'mobile_phone',
                    text: 'Mobile Phone'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'address',
                    text: 'Address'
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
                        itemId: 'btnCustomer',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        text: 'Select Customer'
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