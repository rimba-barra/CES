Ext.define('Hrd.view.group.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.groupgrid',
    storeConfig:{
        id:'GroupGridStore',
        idProperty:'group_id',
        extraParams:{}
    },
    bindPrefixName: 'Group',
    newButtonLabel: 'New Group',
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
                   dataIndex: 'group',
                   text: 'Group Name'
                },
                {
                   dataIndex: 'code',
                   text: 'Code'
                },
                {
                    text:'Uang Makan',
                    dataIndex:'uang_makan'
                },
                {
                    text:'Uang Makan Extra',
                    dataIndex:'uang_makan_extra'
                },
                {
                    text:'Uang Transport',
                    dataIndex:'uang_transport'
                },
                {
                    text:'Uang Hadir',
                    dataIndex:'uang_hadir'
                },
             
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'lembur',
                    text: 'Lembur'
                },
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'lambat',
                    text: 'Lambat'
                },
                {
                    text:'Denda Terlambat',
                    dataIndex:'denda_terlambat'
                },
                {
                    text:'Uang Transport MOD',
                    dataIndex:'uang_transport_mod'
                },
                {
                    text:'Uang Makan MOD',
                    dataIndex:'uang_makan_mod'
                },
                {
                    text:'point',
                    dataIndex:'point'
                },
                {
                    text:'Split Shift',
                    dataIndex:'split_shift'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});