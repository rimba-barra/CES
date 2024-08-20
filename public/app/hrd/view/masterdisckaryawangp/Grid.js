Ext.define('Hrd.view.masterdisckaryawangp.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.masterdisckaryawangpgrid',
    store: 'Masterdisckaryawangp',
    bindPrefixName: 'Masterdisckaryawangp',
    itemId: 'Masterdisckaryawangp',
    newButtonLabel: 'Add New',
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
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 200,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_value',
                    width: 200,
                    dataIndex: 'employee_value',
                    hideable: false,
                    text: 'Value'
                },
                {
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
                        renderer    : Ext.util.Format.dateRenderer('d-M-Y')
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
              
                me.generateActionColumn(),
               
            ],
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
});


