Ext.define('Hrd.view.personalselfservice.GridContact', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.familycontactgrid',
    store: 'ContactEmergency',
    bindPrefixName: 'Personalselfservice',
    itemId: 'Personalselfservice',
    title: 'DATA CONTACT EMERGENCY',
    uniquename: '_familycontactgrid',
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
                    itemId: 'colms_name',
                    dataIndex: 'name',
                    width: 250,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tiperelation',
                    dataIndex: 'tiperelation',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Relation'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_address',
                    dataIndex: 'address',
                    width: 250,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Address'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hp_number',
                    dataIndex: 'phone_number',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Mobile Phone'
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




