Ext.define('Hrd.view.personalselfservice.GridJobHis', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.familyjobhisgrid',
    store: 'JobHistory',
    bindPrefixName: 'Personalselfservice',
    itemId: 'Personalselfservice',
    title: 'DATA JOB HISTORY',
    uniquename: '_familyjobhisgrid',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
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
                    itemId: 'colms_company_name',
                    dataIndex: 'company_name',
                    width: 250,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Company Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_division',
                    dataIndex: 'division',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Division'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_position',
                    dataIndex: 'position',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Position'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_lamakerja',
                    dataIndex: 'lamakerja',
                    width: 120,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Length of Work'
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
//                    {
//                        xtype: 'button',
//                        action: 'view',
//                        hidden: true,
//                        itemId: 'btnView',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        bindAction: me.bindPrefixName + 'Read',
//                        text: 'View Data'
//                    }

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
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
//                {
//                    defaultIcon: 'icon-edit',
//                    iconCls: ' ux-actioncolumn icon-edit act-update',
//                    action: 'update',
//                    altText: 'Edit',
//                    tooltip: 'Edit'
//                },
//                {
//                    defaultIcon: 'icon-delete',
//                    action: 'destroy',
//                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                }
            ]
        }

        return ac;

    },

});




