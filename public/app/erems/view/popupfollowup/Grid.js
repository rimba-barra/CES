Ext.define('Erems.view.popupfollowup.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ProcessCacGridStore',
       idProperty: 'followup_id',
        extraParams: {}
    },
    alias:'widget.popupfollowupgrid',
    
    bindPrefixName:'Popupfollowup',
   // itemId:'',
    newButtonLabel:'New CAC',
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
                    xtype: 'rownumberer',
                    width:30
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase No.', width: 200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number', width: 100
                },
               
                
                
             
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
                   
               /*     {
                        xtype: 'button',
                        action: 'excel_page',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export this page'
                    },
                     {
                        xtype: 'button',
                        action: 'excel_selected',
                        itemId: 'btnExportSelected',
                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export selected'
                    },
                    */
                     {
                        xtype: 'button',
                        action: 'excel_all',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export all'
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


