Ext.define('Hrd.view.shifttype.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.shifttypegrid',
    storeConfig: {
        id: 'ShifttypeGridStore',
        idProperty: 'shifttype_id',
        extraParams: {}
    },
    bindPrefixName: 'Shifttype',
    newButtonLabel: 'New Shift Type',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
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
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    dataIndex: 'shifttype',
                    text: 'Shift Type Name'
                },
                {
                    dataIndex: 'in_time',
                    text: 'Time in'
                },
                {
                    dataIndex: 'out_time',
                    text: 'Time out'
                },
                {
                    dataIndex: 'different_day',
                    text: 'Different Day',
                    xtype: 'booleancolumn',
                    trueText: 'Yes',
                    falseText: 'No'
                },
                {
                    dataIndex: 'holyday',
                    xtype: 'booleancolumn',
                    trueText: 'Yes',
                    falseText: 'No',
                    text: 'Holiday'
                }
                ,
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});