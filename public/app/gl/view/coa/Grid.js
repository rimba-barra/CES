Ext.define('Gl.view.coa.Grid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.coagrid',
    store: 'Coa',
    bindPrefixName: 'Coa',
    newButtonLabel: 'Add New',
    columnLines: true,
    initComponent: function () {
        var me = this;
        
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsCustome(),
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
                    itemId: 'colms_coacode',
                    width: 100,
                    dataIndex: 'coacode',
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 200,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Account Name'
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 40,
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_level',
                    width: 40,
                    dataIndex: 'level',
                    hideable: false,
                    text: 'Level'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_parent_code',
                    width: 100,
                    dataIndex: 'parent_code',
                    hideable: false,
                    text: 'Parent Account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_statusjournal',
                    width: 80,
                    dataIndex: 'statusjournal',
                    hideable: false,
                    text: 'Journal Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_report',
                    width: 80,
                    dataIndex: 'report',
                    hideable: false,
                    text: 'Report'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 100,
                    dataIndex: 'kelsub',
                    hideable: false,
                    text: 'Sub Account Group'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_group_gl',
                    width: 100,
                    dataIndex: 'group_gl',
                    hideable: false,
                    text: 'Acc Code'
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


