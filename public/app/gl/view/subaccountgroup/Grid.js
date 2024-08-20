Ext.define('Gl.view.subaccountgroup.Grid',{
    extend:'Gl.library.template.view.Grid',
    alias:'widget.subaccountgroupgrid',
    store:'Subaccountgroup',
    bindPrefixName:'Subaccountgroup',
   // itemId:'',
    newButtonLabel:'Add New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
         //   dockedItems: me.generateDockedItems(),
             dockedItems: me.generateDockedItemsCustome(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'kelsub_id',
                    text: 'ID'
                },
                */
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 100,
                    dataIndex: 'kelsub',
                    hideable: false,
                    text: 'Group Sub COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 300,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemsCustome: function() {
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
                        action: 'import',
                        hidden: true,
                        itemId: 'btnImport',
                       // id: 'btnImport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Import',
                        text: 'Import Data'
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
});


