Ext.define('Cashier.view.mergesubcoa.browse.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.mergesubcoabrowsegrid',
    store: 'Mergesubcoasubdetail',
    bindPrefixName: 'Mergesubcoa',
    height: 300,
   // newButtonLabel: 'New Purchaseletter',
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
                    itemId: 'colms_projectpt_name',
                    width: 150,
                    align: 'left',
                    dataIndex: 'projectpt_name',
                    text: 'Project / PT'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 100,
                    align: 'right',
                    dataIndex: 'kelsub',
                    text: 'Sub Group'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    width: 100,
                    dataIndex: 'code1',
                    hideable: false,
                    text: 'Code 1'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code2',
                    width: 100,
                    dataIndex: 'code2',
                    hideable: false,
                    text: 'Code 2'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code3',
                    width: 100,
                    dataIndex: 'code3',
                    hideable: false,
                    text: 'Code 3'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code4',
                    width: 100,
                    dataIndex: 'code4',
                    hideable: false,
                    text: 'Code 4'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_id',
                    width: 100,
                    dataIndex: 'unit_id',
                    hideable: false,
                    text: 'Unit ID EREMS'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 120,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number EREMS'
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
         
                items: [
                     {
                        xtype: 'button',
                        action: 'findduplicate',
                        disabled: false,
                        //hidden: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Find Duplicate"
                    },
                      {
                        xtype: 'button',
                        action: 'select',
                        itemId: 'btnPick',
                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Pick Sub Account"
                    },
                 /*   {
                        xtype: 'button',
                        action: 'select',
                        hidden: false,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Select Unit'
                    } */

                ]
            },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            } */
            
        ];
        return dockedItems;
    }
});