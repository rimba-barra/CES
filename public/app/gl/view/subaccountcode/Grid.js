Ext.define('Gl.view.subaccountcode.Grid',{
    extend:'Gl.library.template.view.Grid',
    alias:'widget.subaccountcodegrid',
    store:'Subaccountcode',
    bindPrefixName:'Subaccountcode',
   // itemId:'',
    newButtonLabel:'Add New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
          //  dockedItems: me.generateDockedItems(),
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
                    itemId: 'colms_subgl_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'subgl_id',
                    text: 'ID'
                },
                */
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 150,
                    dataIndex: 'accountgroup',
                    hideable: false,
                    text: 'Kelompok sub account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 150,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code sub account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    width: 60,
                    dataIndex: 'code1',
                    hideable: false,
                    text: 'Code 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code2',
                    width: 60,
                    dataIndex: 'code2',
                    hideable: false,
                    text: 'Code 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code3',
                    width: 100,
                    dataIndex: 'subdsk3',
                    hideable: false,
                    text: 'Code 3'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code4',
                    width: 100,
                    dataIndex: 'subdsk4',
                    hideable: false,
                    text: 'Code 4'
                },
              
				
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
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
                        //id: 'btnImport',
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


