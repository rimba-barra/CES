Ext.define('Hrd.view.personalselfservice.GridEducationFormal', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.familyeducationformalgrid',
    store: 'EducationFormal',
    bindPrefixName: 'Personalselfservice',
    itemId: 'familyeducationformalgrid',
    title: 'DATA EDUCATION FORMAL',
    uniquename: '_familyeducationformalgrid',
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
                    itemId: 'colms_stage',
                    dataIndex: 'stage',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Stage'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_school',
                    dataIndex: 'school',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'institution Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subjected',
                    dataIndex: 'subjected',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Major'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_start_year',
                    dataIndex: 'start_year',
                    width: 120,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Start Year',
                    renderer: Ext.util.Format.dateRenderer('Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_end_year',
                    dataIndex: 'end_year',
                    width: 120,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'End Year',
                    renderer: Ext.util.Format.dateRenderer('Y')
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




