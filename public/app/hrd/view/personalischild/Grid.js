Ext.define('Hrd.view.personalischild.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalischildgrid',
    storeConfig:{
        id:'PersonalischildGridStore',
        idProperty:'Employee_id',
        extraParams:{}
    },
    bindPrefixName: 'Personalischild',
    newButtonLabel: 'New Personalischild',
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
                },{
                   dataIndex: 'nik_group',
                   text: 'NIK Group',
                   width:100
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Employee Name',
                   width:150
                },
                {
                   dataIndex: 'ktp_number',
                   text: 'KTP number',
                   width:150
                },
                {
                   dataIndex: 'banding',
                   text: 'Banding',
                   width:100
                },
                {
                   dataIndex: 'project_name',
                   text: 'Project Name',
                   width:150
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT Name',
                   width:150
                },
                {
                   dataIndex: 'employeestatus',
                   text: 'Emp Status',
                   width:100
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Do not count as an employee',
                    dataIndex   : 'is_child',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 160,
                    resizable   : false,
                    align       : 'center'
                },
                // me.generateActionColumn()
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
                        action: 'checked',
                        hidden: false,
                        itemId: 'btnChecked',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Checked'
                    },
                    {
                        xtype: 'button',
                        action: 'unchecked',
                        hidden: false,
                        itemId: 'btnUnchecked',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Unchecked'
                    },
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