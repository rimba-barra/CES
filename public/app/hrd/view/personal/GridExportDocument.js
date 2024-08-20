Ext.define('Hrd.view.personal.GridExportDocument', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalexportdocumentgrid',
    storeConfig:{
        id:'PersonalGridExportDocumentStore',
        idProperty:'id',
        extraParams:{
            mode_read: 'exportlist'
        }
    },
    height:400,
    id:'ExportdocumentgridID',
    bindPrefixName: 'Exportdocument',
    // newButtonLabel: 'New Employee',
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
                },
                {
                   dataIndex: 'header_title',
                   text: 'Document',
                   width:220
                },
                // me.generateActionColumn()
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
                        action: 'export',
                        // hidden: false,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Read',
                        icon: 'app/main/images/icons/pdf.png',
                        text: 'Export'
                    }


                ]
            },
            // {
            //     xtype: 'pagingtoolbar',
            //     dock: 'bottom',
            //     width: 360,
            //     displayInfo: true,
            //     store: this.getStore()
            // }
        ];
        return dockedItems;
    },
});