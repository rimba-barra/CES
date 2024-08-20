Ext.define('Hrd.view.klaimpengobatan.FormDataIntranet', {
    alias: 'widget.klaimpengobatanformdataintranet',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    height:570,
    uniquename: "_klaimpengobatanformdataintranet",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            id: 'klaimpengobatan_id' + me.uniquename,
                            name: 'klaimpengobatan_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'jenispengobatan_id' + me.uniquename,
                            name: 'jenispengobatan_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'tipe_klaim' + me.uniquename,
                            name: 'tipe_klaim',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id' + me.uniquename,
                            name: 'employee_id',
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'nama',
                                    id: 'name',
                                    name: 'name',
                                    fieldLabel: 'Nama',
                                    emptyText: 'Nama',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'deptcode',
                                    id: 'deptcode',
                                    name: 'deptcode',
                                    fieldLabel: 'Department',
                                    emptyText: 'Department',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'jenispengobatan',
                                    id: 'jenispengobatan',
                                    name: 'jenispengobatan',
                                    fieldLabel: 'Jenis Pengobatan',
                                    emptyText: 'Jenis Pengobatan',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tanggal Klaim ESS',
                                    itemId: 'claim_date_ess' + me.uniquename,
                                    id: 'claim_date_ess' + me.uniquename,
                                    name: 'claim_date_ess',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Tanggal Klaim ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tanggal Klaim',
                                    itemId: 'claim_date' + me.uniquename,
                                    id: 'claim_date' + me.uniquename,
                                    name: 'claim_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Tanggal Klaim',
                                    width: 300,
                                    // readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tanggal Kwitansi ESS',
                                    itemId: 'kwitansi_date_ess' + me.uniquename,
                                    id: 'kwitansi_date_ess' + me.uniquename,
                                    name: 'kwitansi_date_ess',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Tanggal Kwitansi ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tanggal Kwitansi',
                                    itemId: 'kwitansi_date' + me.uniquename,
                                    id: 'kwitansi_date' + me.uniquename,
                                    name: 'kwitansi_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Tanggal Kwitansi',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Dokter ESS',
                                    itemId: 'docter_name_ess' + me.uniquename,
                                    id: 'docter_name_ess' + me.uniquename,
                                    name: 'docter_name_ess',
                                    emptyText: 'Nama Dokter ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Dokter',
                                    itemId: 'docter_name' + me.uniquename,
                                    id: 'docter_name' + me.uniquename,
                                    name: 'docter_name',
                                    emptyText: 'Nama Dokter',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Rumah Sakit ESS',
                                    itemId: 'hospital_name_ess' + me.uniquename,
                                    id: 'hospital_name_ess' + me.uniquename,
                                    name: 'hospital_name_ess',
                                    emptyText: 'Nama Rumah Sakit ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Rumah Sakit',
                                    itemId: 'hospital_name' + me.uniquename,
                                    id: 'hospital_name' + me.uniquename,
                                    name: 'hospital_name',
                                    emptyText: 'Nama Rumah Sakit',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Pasien ESS',
                                    itemId: 'nama_pasien_ess' + me.uniquename,
                                    id: 'nama_pasien_ess' + me.uniquename,
                                    name: 'nama_pasien_ess',
                                    emptyText: 'Nama Pasien ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Pasien',
                                    itemId: 'nama_pasien' + me.uniquename,
                                    id: 'nama_pasien' + me.uniquename,
                                    name: 'nama_pasien',
                                    emptyText: 'Nama Pasien',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Apotik ESS',
                                    itemId: 'apotic_name_ess' + me.uniquename,
                                    id: 'apotic_name_ess' + me.uniquename,
                                    name: 'apotic_name_ess',
                                    emptyText: 'Nama Apotik ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Apotik',
                                    itemId: 'apotic_name' + me.uniquename,
                                    id: 'apotic_name' + me.uniquename,
                                    name: 'apotic_name',
                                    emptyText: 'Nama Apotik',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Keterangan (Diagnosa) ESS',
                                    itemId: 'description_ess' + me.uniquename,
                                    id: 'description_ess' + me.uniquename,
                                    name: 'description_ess',
                                    emptyText: 'Keterangan (Diagnosa) ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Keterangan (Diagnosa)',
                                    itemId: 'description_default' + me.uniquename,
                                    id: 'description_default' + me.uniquename,
                                    name: 'description_default',
                                    emptyText: 'Keterangan (Diagnosa)',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Rawat Inap ESS',
                                    itemId: 'rawat_inap_ess' + me.uniquename,
                                    id: 'rawat_inap_ess' + me.uniquename,
                                    name: 'rawat_inap_ess',
                                    emptyText: 'Rawat Inap ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Rawat Inap',
                                    itemId: 'rawat_inap' + me.uniquename,
                                    id: 'rawat_inap' + me.uniquename,
                                    name: 'rawat_inap',
                                    emptyText: 'Rawat Inap',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Klaim untuk ESS',
                                    itemId: 'claim_subject_ess' + me.uniquename,
                                    id: 'claim_subject_ess' + me.uniquename,
                                    name: 'claim_subject_ess',
                                    emptyText: 'Klaim untuk ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    store : new Ext.data.SimpleStore({
                                    data : [['S', 'Sendiri'], ['W', 'Istri/Suami'], ['D', 'Anak']],
                                        fields : ['value', 'text']
                                    }),
                                    valueField : 'value',
                                    displayField : 'text',
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Klaim untuk',
                                    itemId: 'claim_subject' + me.uniquename,
                                    id: 'claim_subject' + me.uniquename,
                                    name: 'claim_subject',
                                    emptyText: 'Klaim untuk',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    store : new Ext.data.SimpleStore({
                                    data : [['S', 'Sendiri'], ['W', 'Istri/Suami'], ['D', 'Anak']],
                                        fields : ['value', 'text']
                                    }),
                                    valueField : 'value',
                                    displayField : 'text',
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Nilai Kwitansi ESS',
                                    itemId: 'total_ess' + me.uniquename,
                                    id: 'total_ess' + me.uniquename,
                                    name: 'total_ess',
                                    emptyText: 'Nilai Kwitansi ESS',
                                    width: 300,
                                    keepRO:true,
                                    readOnly:true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Nilai Kwitansi',
                                    itemId: 'total_ess1' + me.uniquename,
                                    id: 'total_ess1' + me.uniquename,
                                    name: 'total_ess1',
                                    emptyText: 'Nilai Kwitansi',
                                    width: 300,
                                    keepRO:true,
                                    readOnly:true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    // fieldLabel: 'Nilai Kwitansi',
                                    fieldLabel: 'Amount Penggantian (approve by HC)',
                                    itemId: 'total' + me.uniquename,
                                    id: 'total' + me.uniquename,
                                    name: 'total',
                                    // emptyText: 'Nilai Kwitansi',
                                    emptyText: 'Amount Penggantian (approve by HC)',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Tahun Plafon',
                                    itemId: 'year' + me.uniquename,
                                    id: 'year' + me.uniquename,
                                    name: 'year',
                                    emptyText: 'TahunPlafon',
                                    width: 300,
                                    readOnly: true
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Plafon',
                                    itemId: 'plafon' + me.uniquename,
                                    id: 'plafon' + me.uniquename,
                                    name: 'plafon',
                                    emptyText: 'Plafon',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Persentase Penggantian',
                                    itemId: 'percent_pengganti' + me.uniquename,
                                    id: 'percent_pengganti' + me.uniquename,
                                    name: 'percent_pengganti',
                                    emptyText: 'Persentase Penggantian',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Amount Penggantian',
                                    itemId: 'amount_pengganti' + me.uniquename,
                                    id: 'amount_pengganti' + me.uniquename,
                                    name: 'amount_pengganti',
                                    emptyText: 'Amount Penggantian',
                                    width: 300,
                                    keepRO:false,
                                    readOnly:true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Penggantian',
                                    itemId: 'claim_value' + me.uniquename,
                                    id: 'claim_value' + me.uniquename,
                                    name: 'claim_value',
                                    emptyText: 'Penggantian',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Total Penggantian',
                                    itemId: 'total_klaim' + me.uniquename,
                                    id: 'total_klaim' + me.uniquename,
                                    name: 'total_klaim',
                                    emptyText: 'Total Penggantian',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Saldo',
                                    itemId: 'saldo' + me.uniquename,
                                    id: 'saldo' + me.uniquename,
                                    name: 'saldo',
                                    emptyText: 'Saldo',
                                    width: 300,
                                    readOnly: true,
                                    keepRO:true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    maskRe: /[0-9]/
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    name:'paid',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    fieldLabel: 'Status Bayar',
                                    boxLabel: 'Ya',
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'splitter',
                                    width: '430'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tanggal Bayar',
                                    itemId: 'pay_date' + me.uniquename,
                                    id: 'pay_date' + me.uniquename,
                                    name: 'pay_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Tanggal Bayar',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },


                        {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'attachment',
                                            fieldLabel: 'Attachment',
                                            readOnly: true,
                                            width:300,
                                            margin: '10 0px',
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file',
                                            action:'view_file',
                                            margin: '10 0px',
                                        }
                                    ]
                        },

                        {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'attachment1',
                                            fieldLabel: 'Surat keterangan dari tempat kerja suami',
                                            readOnly: true,
                                            width:300,
                                            margin: '10 0px',
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file1',
                                            action:'view_file1',
                                            margin: '25 0px',
                                        }
                                    ]
                        },

                        {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'attachment2',
                                            fieldLabel: 'Surat keterangan tidak mampu dari RT RW',
                                            readOnly: true,
                                            width:300,
                                            margin: '10 0px',
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file2',
                                            action:'view_file2',
                                            margin: '27 0px',
                                        }
                                    ]
                        },

                        {
                            xtype: 'textareafield',
                            itemId: 'hrd_comment+' + me.uniquename,
                            id: 'hrd_comment' + me.uniquename,
                            name: 'hrd_comment',
                            fieldLabel: 'HRD Comment',
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: '100%',
                        },

                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                
                                {
                                    name:'is_show',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    // fieldLabel: 'Show to Intranet Employee',
                                    fieldLabel: 'Employee Edit',
                                    boxLabel: 'Ya',
                                },
                            ]
                        },

                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                
                                {
                                    name:'is_block',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    fieldLabel: 'Block this request',
                                    boxLabel: 'Ya',
                                },
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'notes+' + me.uniquename,
                            id: 'notes' + me.uniquename,
                            name: 'notes',
                            fieldLabel: 'Notes for Internal',
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: '100%',
                        },

                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'process',
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'reject',
                        itemId: 'btnReject',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Reject'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});