Ext.define('Erems.view.batasplafon.Grid',{
     extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSideGridStore',
        idProperty: 'batasplafon_id',
        extraParams: {}
    },
    alias:'widget.batasplafongrid',
    bindPrefixName:'Batasplafon',
   // itemId:'',
    newButtonLabel:'New Batas Plafon',
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
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 200,
                    dataIndex: 'plafon_plafon',
                    hideable: false,
                    text: 'Plafon'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 50,
                    dataIndex: 'persen_desc',
                    hideable: false,
                    text: 'Percent'
                },
                {
                    xtype: 'gridcolumn',
          
                    width: 70,
                    dataIndex: 'target_RS',
                    hideable: false,
                    text: 'Target RS'
                },
                {
                    xtype: 'gridcolumn',
                   
                    width: 70,
                    dataIndex: 'target_RE',
                    hideable: false,
                    text: 'Target RE'
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
                        action: 'generate',
                        iconCls: 'icon-new',
                        text: 'Generate Default'
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


