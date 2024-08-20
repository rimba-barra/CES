Ext.define('Hrd.view.personalselfservice.FormDocument', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformdocument',
    requires: [
        'Hrd.view.personalselfservice.GridDocument',
    ],
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformdocument',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    autoScroll: true,
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        /* start untuk dokumen upload */
                        {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Kartu Keluarga',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_kk'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_kk',
                                    width: 500
                                },
                            ]
                        },
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'KTP',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_ktp'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_ktp',
                                    width: 500
                                },
                            ]
                        },
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Ijazah',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_ijazah'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_ijazah',
                                    width: 500
                                },
                            ]
                        },
                        {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'NPWP',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_npwp'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_npwp',
                                    width: 500
                                },
                            ]
                        }, 
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Rekening',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_rekening'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_rekening',
                                    width: 500
                                },
                            ]
                        }, 
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Manulife',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_manulife_p'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_manulife_p',
                                    width: 500
                                },
                            ]
                        }, 
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'BPJS Jaminan Pensiun',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_bpjs_pp'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_bpjs_pp',
                                    width: 500
                                },
                            ]
                        }, 
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'BPJS Kesehatan',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_bpjs_k'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_bpjs_k',
                                    width: 500
                                },
                            ]
                        },
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'BPJS Ketenagakerjaan',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_bpjs_kk'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_bpjs_kk',
                                    width: 500
                                },
                            ]
                        }, 
                         {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Asuransi Swasta (dari perusahaan)',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_asuransi'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_asuransi',
                                    width: 500
                                },
                            ]
                        },  
                        //added by michael 09/08/2021
                        {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Vaksin Covid 1',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_vaksin1'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_vaksin1',
                                    width: 500
                                },
                            ]
                        }, 
                        {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Vaksin Covid 2',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_vaksin2'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_vaksin2',
                                    width: 500
                                },
                            ]
                        },  
                        //end added by michael 09/08/2021
                        //added by anas 090220222
                        {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Vaksin Covid 3',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_vaksin3'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_vaksin3',
                                    width: 500
                                },
                            ]
                        }, 
                        //end added by anas
                        {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Pas Foto',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_pas_foto'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_pas_foto',
                                    width: 500
                                },
                            ]
                        }, 
                        {
                            // fieldcontainer
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'STNK',
                                    width: 150
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Lihat dokumen',
                                    action: 'lihatdokumen_stnk'
                                },
                                {
                                    fieldLabel:' &nbsp; No',
                                    labelWidth:30,
                                    xtype: 'textfield',
                                    name: 'no_stnk',
                                    width: 500
                                },
                            ]
                        }, 
                      
                        /* end untuk dokumen upload */
                        {
                            xtype: 'personaldocumentgrid',
                            name: 'griddatadocument',
                            readOnly: false,
                            width: 900,
                            height: 180,
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});

