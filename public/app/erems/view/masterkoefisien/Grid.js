Ext.define('Erems.view.masterkoefisien.Grid',{
    extend: 'Erems.library.template.view.Grid',
    alias:'widget.masterkoefisiengrid',
    store:'Masterkoefisien',
    bindPrefixName:'Masterkoefisien',
   // itemId:'',
    newButtonLabel:'New Koefisien',
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
                    dataIndex: 'pricetype',
                    text: 'Pricetype'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pricelist',
                    text: 'Pricelist'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'koefisien',
                    text: 'Koefisien'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_asuransi',
                    text: 'Asuransi'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_bphtb',
                    text: 'BPHTB'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_bbn',
                    text: 'BBN'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_ajb',
                    text: 'AJB'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_administrasi',
                    text: 'ADMINISTRASI'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'tandajadi',
                    text: 'Tanda Jadi'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_admsubsidi',
                    text: 'Adm Subsidi',
                    hidden: true
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_pmutu',
                    text: 'Pengendali Mutu',
                    hidden: true
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'biaya_paket_tambahan',
                    text: 'Paket Tambahan',
                    hidden: true
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'um_inh_persen',
                    text: 'UM / INH Persen'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'um_inh_termin',
                    text: 'UM / INH Termin'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


