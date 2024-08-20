Ext.define('Cashier.view.mastercoaconfig.Grid',{
     extend: 'Cashier.library.template.view.GridDS2',
     storeConfig: {
        id: 'MasterCoaGridStore',
        idProperty: 'coa_config_id',
        extraParams: {}
    },
    alias:'widget.mastercoaconfiggrid',
    bindPrefixName:'Mastercoaconfig',
   // itemId:'',
    newButtonLabel:'New Template ',
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
                    itemId: 'colms_sides',
                    width: 200,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notes',
                    width: 200,
                    dataIndex: 'notes',
                    hideable: false,
                    text: 'Notes'
                }, 
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    dataIndex: 'is_default',
                    text: 'Default',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
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
                        //bindAction: me.bindPrefixName + 'Create',
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
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
               
            ]
        };
        return ac;
    },
});


