Ext.define('Erems.view.masterdocumentcustomer.GridDocument',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.masterdocumentcustomergriddocument',
    storeConfig:{
        id:'MasterCustomerGridDocumentStore',
        idProperty:'customerdocument_id',
        extraParams:{
            mode_read:'documents'
        }
    },
    bindPrefixName:'masterdocumentcustomer',
   // itemId:'',
    height:250,
    newButtonLabel:'New Document',
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
                   
                    width: 150,
                   // align: 'right',
                    dataIndex: 'filename',
                    text: 'Filename'
                },{
                    xtype: 'gridcolumn',
                    width: 75,
                    dataIndex: 'documenttype_documenttype',
                    text: 'Type'
                },{
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'description',
                    text: 'Description'
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
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
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


