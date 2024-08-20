Ext.define('Hrd.view.personal.GridEducation', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personaleducationgrid',
    storeConfig: {
        id: 'PersonalGridEducationStore',
        idProperty: 'educationhistory_id',
        extraParams: {
            mode_read: 'education',
            employee_id:0
        }
    },
    id: 'PrsEducationGridID',
    bindPrefixName: 'Personal',
    newButtonLabel: 'New Employee',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            defaults: {
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
                    dataIndex: 'stage',
                    text: 'Stage'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'start_year',
                    text: 'Start Year'
                },
                {
                    dataIndex: 'end_year',
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    text: 'End Year'
                },
                {
                    dataIndex: 'school',
                    text: 'School Name'
                },
                {
                    dataIndex: 'subjected',
                    text: 'Subject'
                },
                me.generateActionColumn()
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
                        action: 'create',
                        iconCls: 'icon-new',
                        text: 'New'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        iconCls: 'icon-edit',
                        text: 'Edit'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        text: 'Delete'
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
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }
});