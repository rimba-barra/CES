Ext.define('Cashier.view.masterconsolidation.DetailGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.masterconsolidationdetailgrid',
    bindPrefixName: 'MasterConsolidation',
    height: 200,
    storeConfig: {
        id: 'MasterConsolidationDetailGridStore',
        idProperty: 'multiprojectdetail_id',
        extraParams: {mode_read: 'detailpt'},
    },
    // itemId:'',
    newButtonLabel: 'Detail Company',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
               
                //checkOnly : true // for prevent clicked grid row and canceled all check box checked status
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'code',
                    width: 50,
                    hideable: false,
                    text: 'CODE'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pt_id',
                    width: 50,
                    hideable: false,
                    text: 'PT ID'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'project_id',
                    hideable: false,
                    width: 60,
                    text: 'Project ID'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'Group Consolidation'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Tipe'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'percentage',
                    hideable: false,
                    text: '%'
                },
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'destroy',
                        hidden: false,
                        //disabled: true,
                        itemId: 'btnDelete',
                        //bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                ]
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            //hidden: false,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'left',
            //hideable: false,
            items: [
                {
                    xtype: 'button',
                    action: 'destroy',
                    //disabled: false,
                    //hidden: false,
                    itemId: 'btnDelete',
                    //bindAction: me.bindPrefixName + 'Delete',
                    iconCls: 'icon-delete',
                    text: 'Delete Selected'
                }

            ]
        };
        return ac;
    },
});


