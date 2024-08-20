Ext.define('Hrd.view.absenttype.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absenttypegrid',
    storeConfig:{
        id:'AbsenttypeGridStore',
        idProperty:'absenttype_id',
        extraParams:{}
    },
    bindPrefixName: 'Absenttype',
    newButtonLabel: 'New Absent Type',
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
                   dataIndex: 'code',
                   text: 'Code'
                },
                {
                   dataIndex: 'absenttype',
                   text: 'Description',
                   width:300
                },
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'is_cutleave',
                    text: 'Cut OFF'
                },
                {
                    dataIndex: 'absenttypegroup_absenttypegroup',
                   text: 'Group'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});