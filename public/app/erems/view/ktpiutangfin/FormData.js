Ext.define('Erems.view.ktpiutangfin.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.ktpiutangfinformdata',
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 5,
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'checkboxfield',
                    name: 'flag_sj',
                    fieldLabel: 'Flag SJ',
                },
                 {
                    xtype: 'checkboxfield',
                    name: 'flag_pj',
                    fieldLabel: 'Flag Pajak Jurnal',
                },
                 {
                    xtype: 'checkboxfield',
                    name: 'flag_pph_partner',
                    fieldLabel: 'Flag PPH Partner',
                },
                 {
                    xtype: 'checkboxfield',
                    name: 'flag_pph_owner',
                    fieldLabel: 'Flag PPH Owner',
                },
                 {
                    xtype: 'textfield',
                    name: 'project_name',
                    fieldLabel: 'Project',
                },
                 {
                    xtype: 'textfield',
                    name: 'pt_name',
                    fieldLabel: 'PT',
                },
                 {
                    xtype: 'textfield',
                    name: 'cluster_code',
                    fieldLabel: 'Cluster',
                },
                 {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Unit Number',
                },
                 {
                    xtype: 'textfield',
                    
                    name: 'tgl_vch',
                    fieldLabel: 'Tgl Voucher',
                },
                 {
                    xtype: 'textfield',
                    name: 'no_vch',
                    fieldLabel: 'No. Voucher',
                },
                 {
                    xtype: 'textfield',
                    name: 'kode_acc',
                    fieldLabel: 'Kode Account',
                },
                 {
                    xtype: 'textfield',
                    name: 'sub_kode_sub',
                    fieldLabel: 'Kode Sub Account',
                },
                 {
                    xtype: 'textfield',
                    name: 'ket',
                    fieldLabel: 'Keterangan',
                },
                 {
                    xtype: 'textfield',
                    name: 'mutasi',
                    fieldLabel: 'Nilai Mutasi',
                },
                 {
                    xtype: 'textfield',
                    name: 'sts_mutasi',
                    fieldLabel: 'D/C (Debet/Kredit)',
                },
                 {
                    xtype: 'textfield',
                    name: 'flag_posting',
                    fieldLabel: 'Flag Sub Account',
                },
            ],
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});