Ext.define('Erems.view.masterberkas.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.masterberkasgrid',
    store:'Masterberkas',
    bindPrefixName:'Masterberkas',
   // itemId:'',
    newButtonLabel:'New',
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
                    xtype: 'rownumberer',
                    width: 40,
                    resizable: true
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 200,
                    dataIndex: 'code',
                    text: 'Code'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_berkas',
                    width: 300,
                    dataIndex: 'berkas',
                    hideable: false,
                    text: 'Nama Berkas'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 400,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                }
                
				
//                me.generateActionColumn()
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
                        action: 'documents',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDocuments',
                        iconCls : 'icon-archive',
                        text    : 'Documents'
                    },
//                    {
//                        xtype: 'button',
//                        action: 'print',
//                        hidden: true,
//                        itemId: 'btnPrint',
//                        margin: '0 5 0 0',
//                        bindAction: me.bindPrefixName + 'Print',
//                        iconCls: 'icon-print',
//                        text: 'Print / Save'
//                    },
//					{
//                        xtype: 'button',
//                        action: 'lrp_project_setting',
//                        itemId: 'btnLRPProjectSetting',
//                        margin: '0 5 0 0',
//						//iconCls: 'icon-setting',
//                        text: 'Setting LRP Project'
//                    },
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

});


