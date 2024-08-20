Ext.define('Hrd.view.employeeptkp.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.employeeptkpgriddetail',
    storeConfig: {
        id: 'EmployeeptkpGridDetailStore',
        idProperty: 'employeeptkp_id',
        extraParams: {
            mode_read: 'employeeptkpdetaillist'
        }
    },
    bindPrefixName: 'Employeeptkpdetail',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
		
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });
		
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            plugins : [cellEditing],
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig      : {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                        dataIndex   : 'group',
                        text        : 'Group (Golongan)',
                        width       : 200
                }, {
                        xtype		: 'booleancolumn',
                        text		: 'Approve',
                        dataIndex	: 'is_approve',
                        trueText	: '&#10003;',
                        falseText	: ' ',
                        resizable	: false,
                        width		: 55,
                        align		: 'center'
                }, {
                        dataIndex   : 'approveon',
                        text        : 'Approve Date',
                        width       : 85,
                        renderer: Ext.util.Format.dateRenderer('d-M-Y')
                }, {
                        dataIndex   : 'approveby_name',
                        text        : 'Approve By',
                        width       : 80
                }, {
                        xtype		: 'booleancolumn',
                        text		: 'Reject',
                        dataIndex	: 'is_reject',
                        trueText	: '&#10003;',
                        falseText	: ' ',
                        resizable	: false,
                        width		: 50,
                        align		: 'center'
                }, {
                        dataIndex   : 'rejecton',
                        text        : 'Reject Date',
                        width       : 80,
                        renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },{
                        dataIndex   : 'rejectby_name',
                        text        : 'Reject By',
                        width       : 80
                }, {
                        xtype		: 'booleancolumn',
                        text		: 'Submit',
                        dataIndex	: 'is_submitforapproval',
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
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add',
                        itemId: 'btnAddDetail',
                        action: 'addDetail',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDeleteDetail',
                        action: 'deleteDetail',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                    {
                        text: 'Approve Selected',
                        itemId: 'btnApproveDetail',
                        action: 'approveDetail',
                        iconCls: 'icon-approve',
                        hidden: true,
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Approve'
                    },
                    {
                        text: 'Reject Selected',
                        itemId: 'btnRejectDetail',
                        action: 'rejectDetail',
                        iconCls: 'icon-unapprove',
                        hidden: true,
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Reject'
                    }
                ]
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };

        return ac;
    }
});