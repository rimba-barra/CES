Ext.define('Hrd.view.personal.GridChild', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalchildgrid',
    storeConfig:{
        id:'PersonalGridChildStore',
        idProperty:'relation_id',
        extraParams:{
            mode_read: 'child',
            employee_id:0
        }
    },
    id: 'PrsChildGridID',
    bindPrefixName: 'Personal',
    newButtonLabel: 'New Employee',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
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
                   dataIndex: 'name',
                   text: 'Name'
                },
                {
                   dataIndex: 'sex',
                   text: 'Gender',
                   helperName:'genderRadioButton'
                },
                {
                   dataIndex: 'birth_place',
                   text: 'Birth Place'
                },
                {
                   dataIndex: 'birth_date',
                   text: 'Birth Date',
                   xtype:'datecolumn'
                },
                {
                   dataIndex: 'education_education',
                   idFieldName:'education_education_id',
                   helperComboBox:'cbeducation',
                   text: 'Highest Education'
                },
                {
                   dataIndex: 'rip_date',
                   text: 'R.I.P Date',
                   xtype:'datecolumn'
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