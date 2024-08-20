Ext.define('Hrd.view.transaksimod.FormData', {
    alias: 'widget.transaksimodformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType',
        'Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'transaksimod_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'karyawanmod_karyawanmod_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        keepRO: true,
                        readOnly: true
                    },
                    items: [
                        {
                            name: 'employee_employee_nik',
                            fieldLabel: 'N.I.K/Nama',
                            margin: '0 5px 5px 0',
                            width: '200px'
                        },
                        {
                            name: 'employee_employee_name',
                            fieldLabel: '',
                            margin: '0 5px 5px 0',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: 'BROWSE',
                            action: 'lookup',
                            width: '200px'
                        }
                    ]
                },
                {
                    fieldLabel: 'Departemen',
                    name:'department_code',
                    keepRO:true,
                    readOnly:true
                },
                {
                    fieldLabel: 'Jabatan',
                    name:'position_code',
                    keepRO:true,
                    readOnly:true
                },
                {
                    xtype:'dfdatefield',
                    name:'date',
                    fieldLabel: 'Tanggal MOD'
                },
                {
                    name:'nomor_form',
                    fieldLabel: 'Nomor Form'
                },
                {
                    name:'date_off',
                    xtype:'dfdatefield',
                    fieldLabel: 'Tanggal OFF Form'
                },
                {
                    name:'keterangan',
                    xtype: 'textareafield',
                    fieldLabel: 'Keterangan'
                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});