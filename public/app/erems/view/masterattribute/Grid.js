Ext.define('Erems.view.masterattribute.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterattributegrid',
    store: 'Masterattribute',
    bindPrefixName: 'Masterattribute',
    // itemId:'',
    newButtonLabel: 'New Attribute',
    initComponent: function() {
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
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'attribute',
                    hideable: false,
                    text: 'Attribute Name'
                }, {
                    xtype: 'booleancolumn',
                    width: 75,
                    dataIndex: 'is_default',
                    text: 'Default',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_createdby',
                    width: 110,
                    dataIndex: 'user_name',
                    hideable: false,
                    text: 'Created By'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_createddate',
                    width: 110,
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Created Date'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    width: 110,
                    dataIndex: 'modi_user_name',
                    hideable: false,
                    text: 'Last Edit By'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    width: 110,
                    dataIndex: 'Modion',
                    hideable: false,
                    text: 'Last Edit Date'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


