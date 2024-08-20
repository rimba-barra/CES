Ext.define('Hrd.view.accessgroupdetail.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.accessgroupdetailgrid',
    storeConfig: {
        id: 'AccessgroupdetailGridStore',
        idProperty: 'accessgroup_id',
        extraParams: {}
    },
    bindPrefixName: 'Accessgroupdetail',
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width: 75
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
				{
                    dataIndex: 'index_no',
                    text: 'Level',
                    width: 100
                },
				{
                    dataIndex: 'accessgroup',
                    text: 'Access Group',
                    width: 300
                },		
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
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
                        text: 'Approve Selected',
                        itemId: 'btnApprove',
                        action: 'approve',
                        iconCls: 'icon-approve',
                        disabled: true,
						hidden:true,
                        bindAction: me.bindPrefixName + 'Approve'
                    },
                    {
                        text: 'Reject Selected',
                        itemId: 'btnReject',
                        action: 'reject',
                        iconCls: 'icon-reject',
                        disabled: true,
						hidden:true,
                        bindAction: me.bindPrefixName + 'Reject'
                    }
				]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [{
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                            // }, {
                            //     text        : 'View',
                            //     iconCls     : 'icon-search',
                            //     // bindAction  : me.bindPrefixName + 'Read',
                            //     altText     : 'View',
                            //     tooltip     : 'View'
                }]
        };

        return ac;
    }
});