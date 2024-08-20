Ext.define('Erems.view.masterperiodecutoff.Grid',{
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.masterperiodecutoffgrid',
    store          : 'Masterperiodecutoff',
    bindPrefixName : 'Masterperiodecutoff',
    newButtonLabel : 'New',
    initComponent  : function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selType     : 'cellmodel',
            selModel    : Ext.create('Ext.selection.CheckboxModel', { mode : "SINGLE" }),
            columns     : [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'audit_periode_cutoff_id',
                    text      : 'Periode Cut Off ID',
                    hidden    : true
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'periode',
                    width     : 50,
                    text      : 'Periode'
                },
                {
                    xtype     : 'datecolumn',
                    dataIndex : 'periode_cutoff',
                    text      : 'Cut Off',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'addby_name',
                    width     : 150,
                    text      : 'Add By'
                },
                {
                    xtype     : 'datecolumn',
                    dataIndex : 'addon',
                    text      : 'Add On',
                    width     : 120,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'modiby_name',
                    width     : 150,
                    text      : 'Edit By'
                },
                {
                    xtype     : 'datecolumn',
                    dataIndex : 'modion',
                    text      : 'Edit On',
                    width     : 120,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


