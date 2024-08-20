Ext.define('Hrd.view.klaimpengobatan.FormDataIntranetKacamata', {
    alias: 'widget.klaimpengobatanformdataintranetkacamata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    height:570,
    uniquename: "_klaimpengobatanformdataintranetkacamata",
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
                                    xtype: 'textareafield',
                                    fieldLabel: 'Keterangan ESS',
                                    itemId: 'keterangan_ess' + me.uniquename,
                                    id: 'keterangan_ess' + me.uniquename,
                                    name: 'keterangan_ess',
                                    emptyText: 'Keterangan ESS',
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
                                    fieldLabel: 'Keterangan',
                                    itemId: 'keterangan' + me.uniquename,
                                    id: 'keterangan' + me.uniquename,
                                    name: 'keterangan',
                                    emptyText: 'Keterangan',
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
                                    name:'rekomendasi_dokter_ess',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    fieldLabel: 'Rekomendasi Dokter ESS',
                                    boxLabel: 'Ya',
                                    width: 300,
                                    readOnly: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    name:'rekomendasi_dokter',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    fieldLabel: 'Rekomendasi Dokter',
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Optik ESS',
                                    itemId: 'nama_optik_ess' + me.uniquename,
                                    id: 'nama_optik_ess' + me.uniquename,
                                    name: 'nama_optik_ess',
                                    emptyText: 'Optik ESS',
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
                                    fieldLabel: 'Optik',
                                    itemId: 'nama_optik' + me.uniquename,
                                    id: 'nama_optik' + me.uniquename,
                                    name: 'nama_optik',
                                    emptyText: 'Optik',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Tipe Lensa ESS',
                                    itemId: 'tipe_klaim_lensa_ess' + me.uniquename,
                                    id: 'tipe_klaim_lensa_ess' + me.uniquename,
                                    name: 'tipe_klaim_lensa_ess',
                                    emptyText: 'Klaim untuk ESS',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    store : new Ext.data.SimpleStore({
                                    data : [['SPH', 'SPH'], ['CYL', 'CYL'], ['AXIS', 'AXIS'], ['PROGRESIVE', 'PROGRESIVE']],
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
                                    fieldLabel: 'Tipe Lensa',
                                    itemId: 'tipe_klaim_lensa' + me.uniquename,
                                    id: 'tipe_klaim_lensa' + me.uniquename,
                                    name: 'tipe_klaim_lensa',
                                    emptyText: 'Tipe Lensa',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    store : new Ext.data.SimpleStore({
                                    data : [['SPH', 'SPH'], ['CYL', 'CYL'], ['AXIS', 'AXIS'], ['PROGRESIVE', 'PROGRESIVE']],
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Kiri Minus ESS',
                                    itemId: 'ki_minus_ess' + me.uniquename,
                                    id: 'ki_minus_ess' + me.uniquename,
                                    name: 'ki_minus_ess',
                                    emptyText: 'Kiri Minus ESS',
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
                                    fieldLabel: 'Kiri Minus',
                                    itemId: 'ki_minus' + me.uniquename,
                                    id: 'ki_minus' + me.uniquename,
                                    name: 'ki_minus',
                                    emptyText: 'Kiri Minus',
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
                                    fieldLabel: 'Kanan Minus ESS',
                                    itemId: 'ka_minus_ess' + me.uniquename,
                                    id: 'ka_minus_ess' + me.uniquename,
                                    name: 'ka_minus_ess',
                                    emptyText: 'Kanan Minus ESS',
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
                                    fieldLabel: 'Kanan Minus',
                                    itemId: 'ka_minus' + me.uniquename,
                                    id: 'ka_minus' + me.uniquename,
                                    name: 'ka_minus',
                                    emptyText: 'Kanan Minus',
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
                                    fieldLabel: 'Kiri Plus ESS',
                                    itemId: 'ki_plus_ess' + me.uniquename,
                                    id: 'ki_plus_ess' + me.uniquename,
                                    name: 'ki_plus_ess',
                                    emptyText: 'Kiri Plus ESS',
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
                                    fieldLabel: 'Kiri Plus',
                                    itemId: 'ki_plus' + me.uniquename,
                                    id: 'ki_plus' + me.uniquename,
                                    name: 'ki_plus',
                                    emptyText: 'Kiri Plus',
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
                                    fieldLabel: 'Kanan Plus ESS',
                                    itemId: 'ka_plus_ess' + me.uniquename,
                                    id: 'ka_plus_ess' + me.uniquename,
                                    name: 'ka_plus_ess',
                                    emptyText: 'Kanan Plus ESS',
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
                                    fieldLabel: 'Kanan Plus',
                                    itemId: 'ka_plus' + me.uniquename,
                                    id: 'ka_plus' + me.uniquename,
                                    name: 'ka_plus',
                                    emptyText: 'Kanan Plus',
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
                                    fieldLabel: 'Kiri Silinder ESS',
                                    itemId: 'ki_silinder_ess' + me.uniquename,
                                    id: 'ki_silinder_ess' + me.uniquename,
                                    name: 'ki_silinder_ess',
                                    emptyText: 'Kiri Silinder ESS',
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
                                    fieldLabel: 'Kiri Silinder',
                                    itemId: 'ki_silinder' + me.uniquename,
                                    id: 'ki_silinder' + me.uniquename,
                                    name: 'ki_silinder',
                                    emptyText: 'Kiri Silinder',
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
                                    fieldLabel: 'Kanan Silinder ESS',
                                    itemId: 'ka_silinder_ess' + me.uniquename,
                                    id: 'ka_silinder_ess' + me.uniquename,
                                    name: 'ka_silinder_ess',
                                    emptyText: 'Kanan Silinder ESS',
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
                                    fieldLabel: 'Kanan Silinder',
                                    itemId: 'ka_silinder' + me.uniquename,
                                    id: 'ka_silinder' + me.uniquename,
                                    name: 'ka_silinder',
                                    emptyText: 'Kanan Silinder',
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
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Nilai Kwitansi ESS',
                                    itemId: 'total_ess' + me.uniquename,
                                    id: 'total_ess' + me.uniquename,
                                    name: 'total_ess',
                                    emptyText: 'Nilai Kwitansi ESS',
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
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Nilai Kwitansi',
                                    itemId: 'total_ess1' + me.uniquename,
                                    id: 'total_ess1' + me.uniquename,
                                    name: 'total_ess1',
                                    emptyText: 'Nilai Kwitansi',
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
                                    // width: 300,
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