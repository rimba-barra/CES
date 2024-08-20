Ext.define('Hrd.view.personalselfservice.GridEducationNonFormal', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.familyeducationnonformalgrid',
    store: 'EducationNonFormal',
    bindPrefixName: 'Personalselfservice',
    itemId: 'familyeducationnonformalgrid',
    title: 'DATA EDUCATION NON FORMAL',
    uniquename: '_familyeducationnonformalgrid',
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
                    itemId: 'colms_training',
                    dataIndex: 'training',
                    width: 220,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Training / Topic'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_organizer',
                    dataIndex: 'organizer',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Organizer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_city_name',
                    dataIndex: 'city_name',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'City'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_years',
                    dataIndex: 'years',
                    width: 120,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Year',
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




