Ext.define('Hrd.view.disckaryawan.FormSearch', {
    extend:'Hrd.library.template.view.FormSearch',	
    alias: 'widget.disckaryawanformsearch',
    itemId: 'disckaryawanformsearch',	
    initComponent: function(){
            var me = this;
            Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Employee Name',
                    itemId: 'employee_name',
                    name: 'employee_name'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Ref',
                    itemId: 'noref',
                    name: 'noref'
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel: 'Project',
                    name: 'project_id',
                    itemId: 'project_id',
                    width: 280
                },
                {
                    xtype: 'ptcombobox',
                    fieldLabel: 'PT',
                    name: 'pt_id',
                    itemId: 'pt_id',
                    width: 280
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel: 'Lokasi Project Pembelian',
                    name: 'lokasi_project_id',
                    itemId: 'lokasi_project_id',
                    width: 280
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Status',
                    itemId: 'discstatus',
                    name: 'discstatus',
                    valueField: 'discstatus_id',
                    displayField:'status_name',
                    width: 200,
                    store: 'Discstatus'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl Pengajuan Dari',
                    name: 'tgl_pengajuan_dari',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    emptyText: 'dd-mm-yyyy',
                    width: 120
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl Pengajuan Sampai',
                    name: 'tgl_pengajuan_sampai',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    emptyText: 'dd-mm-YYYY',
                    width: 120
                },
            ]
            });
            me.callParent(arguments);
    }
});