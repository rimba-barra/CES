Ext.define('Erems.view.masterdocumentcustomer.GridDocumentHistory',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.masterdocumentcustomergriddocumenthistory',
    storeConfig:{
        id:'MasterCustomerGridDocumentStore',
        idProperty:'customerdocument_id',
        extraParams:{
            mode_read:'documentsHistory'
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
            viewConfig: {
            },
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
                    dataIndex: 'type',
                    text: 'Type'
                },{
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'description',
                    text: 'Description'
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'user_fullname',
                    text: 'User Download'
                },{
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'Addon',
                    text: 'Tgl. Download'
                },{
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'alasan',
                    text: 'Alasan'
                }
            ]
        });

        me.callParent(arguments);
    },
});


