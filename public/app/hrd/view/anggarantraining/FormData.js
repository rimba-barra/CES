Ext.define('Hrd.view.anggarantraining.FormData', {
    alias: 'widget.anggarantrainingformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType','Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;

       


        Ext.applyIf(me, {
            defaults: {
                xtype: 'xmoneyfield'
            },
            items: [
                {
                  xtype:'hiddenfield',
                  name:'anggarantraining_id'
                },
                
                {
                    xtype:'textfield',
                    readOnly:true,
                    keepRO:true,
                    name:'year',
                    fieldLabel:'Tahun',
                    width:150
                },
                {
                    xtype:'textfield',
                    readOnly:true,
                    keepRO:true,
                    name:'department_code',
                    fieldLabel:'Departemen',
                    width:250
                },
                {
                    xtype:'textfield',
                    readOnly:true,
                    keepRO:true,
                    name:'employee_employee_name',
                    fieldLabel:'Nama Karyawan',
                    width:300
                },
                {
                    xtype:'xmoneyfield',
                    name:'nilai',
                    fieldLabel:'Nilai Anggaran'
                },
                {
                    xtype:'xmoneyfield',
                    name:'pemakaian',
                    fieldLabel:'Total Pemakaian'
                },
                {
                    xtype:'xmoneyfield',
                    name:'sisa',
                    fieldLabel:'Sisa Anggaran'
                }
            ],
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});