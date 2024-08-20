Ext.define('Hrd.view.personal.GridCompany', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalcompanygrid',
    storeConfig:{
        id:'PersonalGridCompanyStore',
        idProperty:'jobhistory_id',
        extraParams:{
            mode_read: 'jobhistory',
            employee_id:0
        }
    },
    id:'PrsCompanyGridID',
    bindPrefixName: 'Personal',
    newButtonLabel: 'New Employee',
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
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'company_name',
                   text: 'Company Name'
                },
                {
                   dataIndex: 'division',
                   text: 'Division'
                },
                {
                   dataIndex: 'position',
                   text: 'Position'
                },
                {
                   dataIndex: 'start_date',
                   text: 'Start Date',
                   format:'d-m-Y',
                   xtype:'datecolumn'
                },
                {
                   dataIndex: 'end_date',
                   text: 'End Date',
                   format:'d-m-Y',
                   xtype:'datecolumn'
                },
                {
                   dataIndex: 'line_of_business',
                   text: 'Line of Business'
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
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        iconCls: 'icon-new',
                        text: 'New'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        iconCls: 'icon-edit',
                        text: 'Edit'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        text: 'Delete'
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
            hidden: false,
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
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