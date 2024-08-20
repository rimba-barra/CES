Ext.define('Erems.view.mastercustomer.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.mastercustomerbrowsegrid',
    store: 'Mastercustomer',
    bindPrefixName: 'Mastercustomer',
    
    newButtonLabel: 'New customer',
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
                    itemId: 'colms_code',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 100,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_home_phone',
                    width: 110,
                    dataIndex: 'home_phone',
                    hideable: false,
                    text: 'Home Phone'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_office_phone',
                    width: 110,
                    dataIndex: 'office_phone',
                    hideable: false,
                    text: 'Office Phone'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_mobile_phone',
                    width: 110,
                    dataIndex: 'mobile_phone',
                    hideable: false,
                    text: 'Handphone'
                },
                me.generateActionColumn()
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
                        action: 'select',
                        hidden: false,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName+'SelectUnit',
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