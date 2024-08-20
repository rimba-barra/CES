Ext.define('Hrd.view.accessgroupuser.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.accessgroupusergrid',
    storeConfig: {
        id: 'AccessgroupuserGridStore',
        idProperty: 'access_id',
        extraParams: {}
    },
    bindPrefixName: 'Accessgroupuser',
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
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
                    width: 40
                },
				{
                    dataIndex: 'accessgroup',
                    text: 'Access Group',
                    width: 150
                },
				{
                    dataIndex: 'employee_nik',
                    text: 'NIK',
                    width: 100
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Name',
                    width: 180
                },
				{
                    dataIndex: 'position',
                    text: 'Position',
                    width: 200
                },{
					xtype		: 'booleancolumn',
					text		: 'Approve',
					dataIndex	: 'is_approve',
					trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 55,
					align		: 'center'
				},{
					dataIndex   : 'approveon',
					text        : 'Approve Date',
					width       : 80,
				   	renderer: Ext.util.Format.dateRenderer('d-M-Y')
				},{
					dataIndex   : 'approveby_name',
					text        : 'Approve By',
					width       : 100
				},{
					xtype		: 'booleancolumn',
					text		: 'Reject',
					dataIndex	: 'is_reject',
					trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 50,
					align		: 'center'
				},{
					dataIndex   : 'rejecton',
					text        : 'Reject Date',
					width       : 80,
				   	renderer: Ext.util.Format.dateRenderer('d-M-Y')
				},{
					dataIndex   : 'rejectby_name',
					text        : 'Reject By',
					width       : 100
				},
				{
					dataIndex	: 'is_submitforapproval',
					xtype		: 'booleancolumn',
					text		: 'Submit',
					trueText	: '&#10003;',
					falseText	: ' ',
					resizable	: false,
					width		: 50,
					align		: 'center'
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    }, {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    }, {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    }, 
					{
                        xtype: 'button',
                        action: 'approve',
                        itemId: 'btnApprove',
                        margin: '0 5 0 0',
                        disabled: true,
                        hidden: true,
                        iconCls: 'icon-approve',
                        text: 'Approve Selected',
                        bindAction: me.bindPrefixName + 'Approve'
                    },
					{
                        xtype: 'button',
                        action: 'reject',
                        itemId: 'btnReject',
                        margin: '0 5 0 0',
                        disabled: true,
                        hidden: true,
                        iconCls: 'icon-unapprove',
                        text: 'Reject Selected',
                        bindAction: me.bindPrefixName + 'Reject'
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
                    },
					{
						xtype:'tbfill'
					},
					{
                        xtype: 'button',
                        action: 'submitforapp',
                        itemId: 'btnSubmitforapp',
                        margin: '0 5 0 0',
                        disabled: true,
                        hidden: true,
                        //iconCls: 'icon-edit',
                        text: 'Submit for Approval',
                        bindAction: me.bindPrefixName + 'Submitforapp'
                    }]
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
            resizable: true,
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
                }, {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }/*, {
                    text: 'Approve',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Approve',
                    altText: 'Approve',
                    tooltip: 'Approve'
                }, {
                    text: 'Reject',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Reject',
                    altText: 'Reject',
                    tooltip: 'Reject'
                }*/]
        };

        return ac;
    }
});