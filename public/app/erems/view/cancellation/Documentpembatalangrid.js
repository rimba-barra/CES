Ext.define('Erems.view.cancellation.Documentpembatalangrid', {
    extend          : 'Erems.library.template.view.GridDS2',
    alias           : 'widget.cancellationdocumentpembatalangrid',
    store          : 'Documentpembatalan',
    bindPrefixName : 'Documentpembatalan',
    newButtonLabel : 'New Document',
    height         : 200,
    initComponent: function() {
        var me         = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns     : [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_filename',
                    dataIndex : 'filename',
                    hideable  : false,
                    width     : 150,
                    text      : 'Filename'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_description',
                    dataIndex : 'description',
                    hideable  : false,
                    width     : 150,
                    text      : 'Description'
                },
                {
                    xtype     : 'datecolumn',
                    itemId    : 'colms_addon',
                    dataIndex : 'Addon',
                    hideable  : false,
                    width     : 150,
                    text      : 'Addon'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_addby',
                    dataIndex : 'addby_fullname',
                    hideable  : false,
                    width     : 150,
                    text      : 'Addby'
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        itemId: 'btnNew',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        itemId: 'btnEdit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        itemId: 'btnDelete',
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
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'center',
            hideable: false,
            items: [
                {
                    tooltip: 'Download',
                    icon: document.URL+'app/main/images/icons/download.png',
                    handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                        this.fireEvent( 'downloadaction', arguments );
                    }
                }
            ]
        };
        return ac;
    }
});