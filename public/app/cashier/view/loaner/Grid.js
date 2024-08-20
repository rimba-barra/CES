Ext.define('Cashier.view.loaner.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.loanergrid',
    store: 'Loaner',
    bindPrefixName: 'Loaner',
    itemId: 'Loaner',
    newButtonLabel: 'Add New',
    initComponent: function () {
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
                    itemId: 'colms_code',
                    width: 80,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_loaner',
                    width: 200,
                    dataIndex: 'loaner',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_address',
                    width: 300,
                    dataIndex: 'address',
                    hideable: false,
                    text: 'Address'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 200,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Departement'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pekerjaan',
                    width: 140,
                    dataIndex: 'pekerjaan',
                    hideable: false,
                    text: 'Job Position'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_office_phone',
                    width: 120,
                    dataIndex: 'office_phone',
                    hideable: false,
                    text: 'Office Phone'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_mobile_phone',
                    width: 120,
                    dataIndex: 'mobile_phone',
                    hideable: false,
                    text: 'Mobile Phone'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fax',
                    width: 120,
                    dataIndex: 'fax',
                    hideable: false,
                    text: 'FAX'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_email',
                    width: 150,
                    dataIndex: 'email',
                    hideable: false,
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Desc'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


