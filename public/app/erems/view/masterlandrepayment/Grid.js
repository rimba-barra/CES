Ext.define('Erems.view.masterlandrepayment.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.masterlandrepaymentgrid',
    store:'Masterlandrepayment',
    bindPrefixName:'Masterlandrepayment',
   // itemId:'',
    newButtonLabel:'New LRP',
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
                    itemId: 'colms_id',
                    width: 50,
                    align: 'right',
					hidden: true,
                    dataIndex: 'landrepayment_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 75,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Kode'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_keterangan',
                    width: 200,
                    dataIndex: 'keterangan',
                    hideable: false,
                    text: 'Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_management_fee',
                    width: 100,
                    dataIndex: 'management_fee',
                    hideable: false,
					align: 'right',
                    text: 'Management Fee'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_royalty',
                    width: 100,
                    dataIndex: 'royalty',
                    hideable: false,
					align: 'right',
                    text: 'Royalty'
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
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
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
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
					{
                        xtype: 'button',
                        action: 'lrp_project_setting',
                        itemId: 'btnLRPProjectSetting',
                        margin: '0 5 0 0',
						//iconCls: 'icon-setting',
                        text: 'Setting LRP Project'
                    },
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


