Ext.define('Hrd.view.allclaim.GridExport', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.allclaimexportgrid',
    storeConfig:{
        id:'AllClaimGridExportStore',
        idProperty:'id',
        extraParams:{
            mode_read: 'exportlist'
        }
    },
    height:400,
    id:'ExportclaimexportgridID',
    bindPrefixName: 'Allclaim',
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
                   text: 'Column',
                   width:150
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
                        icon: 'app/main/images/icons/excel.png',
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