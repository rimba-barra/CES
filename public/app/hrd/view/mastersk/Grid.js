Ext.define('Hrd.view.mastersk.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.masterskgrid',
    storeConfig:{
        id:'MasterskGridStore',
        idProperty:'Mastersk_id',
        extraParams:{}
    },
    bindPrefixName: 'Mastersk',
    newButtonLabel: 'New Mastersk',
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
                },{
                   dataIndex: 'name',
                   text: 'Document Name',
                   width:200
                },
                {
                   dataIndex: 'nomor',
                   text: 'Number',
                   width:200
                },
                {
                   dataIndex: 'masterkategorisk_name',
                   text: 'Category',
                   width:200
                },
                {
                   dataIndex: 'tanggal',
                   text: 'From Date',
                   format:'d/m/Y',
                   xtype:'datecolumn'
                },
                {
                   dataIndex: 'tanggal_habis',
                   text: 'End Date',
                   format:'d/m/Y',
                   xtype:'datecolumn'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Internal',
                    dataIndex   : 'private',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Active',
                    dataIndex   : 'active',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
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
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: 'New Document'
                    },
                    {
                        xtype: 'hidden',
                        action: 'import',
                        hidden: true,
                        itemId: 'btnImport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Copy Document (Head Office)'
                    },
                    {
                        xtype: 'button',
                        action: 'export_apply',
                        hidden: true,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Share Document to Project PT'
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