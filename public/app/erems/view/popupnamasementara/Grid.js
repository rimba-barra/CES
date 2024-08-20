Ext.define('Erems.view.popupnamasementara.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.popupnamasementaragrid',
    
    bindPrefixName:'Popupnamasementara',
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
                    xtype: 'rownumberer'
                },
                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_code',
                    text: 'Cluster Code',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Customer Name',
                    width:300
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'mobile_phone',
                    text: 'Handphone',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'home_phone',
                    text: 'Homephone',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'office_phone',
                    text: 'Officephone',
                    width:100
                },
           
                {
                    xtype: 'booleancolumn',
                    
                    width: 100,
                    resizable: false,
                    align: 'center',
                   dataIndex: 'is_temporary',
                    text: 'Temporary Name',
                    
                    falseText: ' ',
                    trueText: '&#10003;'
                }
                
                
             
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
                        action: 'export_excel',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
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


