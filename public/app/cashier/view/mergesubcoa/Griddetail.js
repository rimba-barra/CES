Ext.define('Cashier.view.mergesubcoa.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.mergesubcoagriddetail',
    store: 'Mergesubcoadetail',
    bindPrefixName: 'Mergesubcoa',
    itemId: 'Mergesubcoadetail',
    title: 'SUB ACCOUNT',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
               /* {
                    xtype: 'rownumberer',

                },*/
                
              //  me.generateActionColumn(),
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectpt_name',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'projectpt_name',
                    hideable: false,
                    text: 'Project / PT'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sub_group',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'kelsub',
                    hideable: false,
                    text: 'Sub Group'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_desc',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'code1',
                    hideable: false,
                    text: 'Code 1 '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code2',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'code2',
                    hideable: false,
                    text: 'Code 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code3',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'code3',
                    hideable: false,
                    text: 'Code 3'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code4',
                    width: 60,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'code4',
                    hideable: false,
                    text: 'Code 4'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_id',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'unit_id',
                    hideable: false,
                    text: 'Unit ID EREMS'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 130,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number EREMS'
                },
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
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
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


