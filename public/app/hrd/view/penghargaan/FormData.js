Ext.define('Hrd.view.penghargaan.FormData', {
    alias: 'widget.penghargaanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField'],
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
                    name: 'penghargaan_id'
                },
               
                {
                    xtype: 'combobox',
                    name: 'employee_employee_id',
                    width:500,
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                    fieldLabel: 'Nama Karyawan'
                },
                {
                    xtype:'combobox',
                    width:300,
                    name:'jenispenghargaan_jenispenghargaan_id',
                    displayField: 'jenispenghargaan',
                    valueField: 'jenispenghargaan_id',
                    fieldLabel:'Jenis Penghargaan'
                },
               
                {
                    xtype:'textareafield',
                    name:'description',
                    rows:8,
                    cols:75,
                    fieldLabel:'Keterangan'
                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});