Ext.define('Hrd.view.sanctiontype.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.sanctiontypegrid',
    storeConfig:{
        id:'SanctiontypeGridStore',
        idProperty:'sanctiontype_id',
        extraParams:{}
    },
    bindPrefixName: 'Sanctiontype',
    newButtonLabel: 'New Sanction type',
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
                   dataIndex: 'sanctiontype',
                   text: 'Sanction Type'
                },
                {
                   dataIndex: 'description',
                   text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});