Ext.define('Erems.view.formundanganajb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.formundanganajbformdata',
    requires: [
        'Erems.view.formundanganajb.GridDetail',
        'Erems.library.template.component.Responundanganajbcombobox',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'hgbajb_id',
                    name: 'hgbajb_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'buktipemilik_id',
                    name: 'buktipemilik_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'unit_id',
                    name: 'unit_id'
                },
                //		{
                //                    xtype: 'hiddenfield',
                //                    itemId: 'pbbinduk_id',
                //                    name: 'pbbinduk_id'
                //                },
                //		{
                //                    xtype: 'hiddenfield',
                //                    itemId: 'temp_formundanganajb_id',
                //                    name: 'temp_formundanganajb_id'
                //                },
                //		{
                //                    xtype: 'hiddenfield',
                //                    itemId: 'is_hgbajb_detail',
                //                    name: 'is_hgbajb_detail',
                //                    value: 'no'
                //                },
                {
                    xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    items: [
                        {
                            layout: 'hbox',
                            padding: '10px 0 0 0',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'panel', flex: 8,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: { top: 0, right: 0, bottom: 10, left: 0 }
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    anchor: '-5',
                                                    name: 'cluster_code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                },
                                                {
                                                    xtype: 'clustercombobox',
                                                    itemId: 'fd_clustercb',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'unit_cluster_id',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Block name',
                                                    anchor: '-5',
                                                    name: 'block_code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'blockcombobox',
                                                    itemId: 'fd_blockcb',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'unit_block_id',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Kavling / Unit No. ',
                                                    anchor: '-5',
                                                    name: 'unit_unit_number',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, /*{
                                                                                    xtype: 'button',
                                                                                    text: 'Browse Unit',
                                                                                    itemId: 'fd_browse_unit_btn',
                                                                                    padding: '2px 5px',
                                                                                    action: 'browse_unit',
                                                                                    iconCls: 'icon-search',
                                                                                    style: 'background-color:#FFC000;'
                                                                                },*/
                                                { xtype: 'label', text: '', flex: 2 }
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'splitter', width: 30 },
                                {
                                    xtype: 'panel', flex: 7,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: { top: 0, right: 0, bottom: 10, left: 0 }
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PT Name',
                                                    anchor: '-5',
                                                    name: 'unit_pt_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Product Category',
                                                    anchor: '-5',
                                                    name: 'unit_productcategory',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Type',
                                                    anchor: '-5',
                                                    name: 'unit_type_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Land Size',
                                                    anchor: '-5',
                                                    name: 'unit_land_size',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                { xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px' },
                                                {
                                                    xtype: 'splitter', width: 30,
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Long',
                                                    anchor: '-5',
                                                    name: 'unit_long',
                                                    flex: 6,
                                                    readOnly: true,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                { xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px' }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Building Size',
                                                    anchor: '-5',
                                                    name: 'unit_building_size',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                { xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px' },
                                                {
                                                    xtype: 'splitter', width: 30,
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Width',
                                                    anchor: '-5',
                                                    name: 'unit_width',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                { xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px' }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kelebihan Tanah',
                                                    anchor: '-5',
                                                    name: 'unit_kelebihan',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                { xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px' },
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Floor',
                                                    anchor: '-5',
                                                    name: 'unit_floor',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                { xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px' }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel', bodyPadding: 10, title: 'DATA UNDANGAN', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'hgbajb_undangan_id',
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal Undangan',
                                                    anchor: '-5',
                                                    name: 'undangan_date',
                                                    value: new Date(),
                                                    flex: 6,
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                },
                                                { xtype: 'splitter', width: 20 },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal Janjian AJB',
                                                    anchor: '-5',
                                                    name: 'janjian_ajb_date',
                                                    flex: 6,
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'responundanganajbcombobox',
                                                    itemId: 'fd_responundanganajbcb',
                                                    fieldLabel: 'Respon Undangan AJB',
                                                    anchor: '-5',
                                                    name: 'respon_undanganajb_id',
                                                    flex: 7,
                                                },
                                                { xtype: 'splitter', width: 20 },
                                                {
                                                    // xtype: 'timefield',
                                                    // name: 'jam_janjian_ajb',
                                                    // fieldLabel: 'Jam Janjian AJB',
                                                    // format: 'H:i',
                                                    // altFormats: 'H:i',
                                                    // // minValue: '6:00 AM',
                                                    // // maxValue: '8:00 PM',
                                                    // increment: 15,
                                                    // flex: 6,
                                                    xtype: 'numberfield',
                                                    minValue: 0,
                                                    maxValue: 24,
                                                    value: 0,
                                                    fieldLabel: 'Jam Janjian AJB',
                                                    anchor: '-5',
                                                    name: 'jam_janjian_ajb',
                                                    flex: 3

                                                    // fieldLabel: 'TimePicker',
                                                    // xtype: 'timefield',
                                                    // width: 280,
                                                    // labelSeparator: ':',
                                                    // msgTarget: 'side',
                                                    // autoFitErrors: false,
                                                    // maxValue: '18:00',
                                                    // maxText: 'limit to 18:00',
                                                    // minValue: '10:00',
                                                    // minText: 'limit to 10:00',
                                                    // pickerMaxHeight: 200,
                                                    // increment: 60,
                                                    // format: 'G:i:s',
                                                    // invalidText: 'invalid format'
                                                },
                                                { xtype: 'label', text: ':', margin: '0 0 0 10px' },
                                                {
                                                    xtype: 'numberfield',
                                                    minValue: 0,
                                                    maxValue: 60,
                                                    value: 0,
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'jam_janjian_ajb_menit',
                                                    flex: 1
                                                },
                                                { xtype: 'label', text: '', margin: '0 0 0 100px' },
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: '',
                                                    name: 'is_got_email',
                                                    itemId: 'is_got_email_value',
                                                    checked: false,
                                                    inputValue: '1',
                                                    uncheckedValue: '0',
                                                    margin: '0 0 0 0px',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Memiliki Email',
                                                    itemId: 'is_got_email_label',
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    bodyPadding: 10,
                                                    width: '100%',
                                                    title: 'Email',
                                                    items: [

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Email 1',
                                                                    anchor: '-5',
                                                                    name: 'email_1_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Email 3',
                                                                    anchor: '-5',
                                                                    name: 'email_3_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },


                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [

                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'email_1_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Gagal Kirim',
                                                                            name: 'emailstatus1',
                                                                            inputValue: '1',
                                                                            itemId: 'emailstatus1_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Berhasil Kirim',
                                                                            name: 'emailstatus1',
                                                                            inputValue: '2',
                                                                            itemId: 'emailstatus1_2'
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'email_3_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Gagal Kirim',
                                                                            name: 'emailstatus3',
                                                                            inputValue: '1',
                                                                            itemId: 'emailstatus3_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Berhasil Kirim',
                                                                            name: 'emailstatus3',
                                                                            inputValue: '2',
                                                                            itemId: 'emailstatus3_2'
                                                                        }
                                                                    ]
                                                                },


                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Email 2',
                                                                    anchor: '-5',
                                                                    name: 'email_2_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Email 4',
                                                                    anchor: '-5',
                                                                    name: 'email_4_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'email_2_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Gagal Kirim',
                                                                            name: 'emailstatus2',
                                                                            inputValue: '1',
                                                                            itemId: 'emailstatus2_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Berhasil Kirim',
                                                                            name: 'emailstatus2',
                                                                            inputValue: '2',
                                                                            itemId: 'emailstatus2_2'
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'email_4_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Gagal Kirim',
                                                                            name: 'emailstatus4',
                                                                            inputValue: '1',
                                                                            itemId: 'emailstatus4_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Berhasil Kirim',
                                                                            name: 'emailstatus4',
                                                                            inputValue: '2',
                                                                            itemId: 'emailstatus4_2'
                                                                        }
                                                                    ]
                                                                },

                                                            ]
                                                        },

                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    bodyPadding: 10,
                                                    width: '100%',
                                                    title: 'Surat',
                                                    items: [
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Surat 1',
                                                                    anchor: '-5',
                                                                    name: 'surat_1_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Surat 3',
                                                                    anchor: '-5',
                                                                    name: 'surat_3_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },

                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [

                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'surat_1_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dikembalikan',
                                                                            name: 'suratstatus1',
                                                                            inputValue: '1',
                                                                            itemId: 'suratstatus1_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Diterima',
                                                                            name: 'suratstatus1',
                                                                            inputValue: '2',
                                                                            itemId: 'suratstatus1_2'
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'surat_3_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dikembalikan',
                                                                            name: 'suratstatus3',
                                                                            inputValue: '1',
                                                                            itemId: 'suratstatus3_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Diterima',
                                                                            name: 'suratstatus3',
                                                                            inputValue: '2',
                                                                            itemId: 'suratstatus3_2'
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Surat 2',
                                                                    anchor: '-5',
                                                                    name: 'surat_2_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Surat 4',
                                                                    anchor: '-5',
                                                                    name: 'surat_4_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [

                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'surat_2_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dikembalikan',
                                                                            name: 'suratstatus2',
                                                                            inputValue: '1',
                                                                            itemId: 'suratstatus2_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Diterima',
                                                                            name: 'suratstatus2',
                                                                            inputValue: '2',
                                                                            itemId: 'suratstatus2_2'
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 2,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'surat_4_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dikembalikan',
                                                                            name: 'suratstatus4',
                                                                            inputValue: '1',
                                                                            itemId: 'suratstatus4_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Diterima',
                                                                            name: 'suratstatus4',
                                                                            inputValue: '2',
                                                                            itemId: 'suratstatus4_2'
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        },

                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    bodyPadding: 10,
                                                    width: '100%',
                                                    title: 'Whatsapp',
                                                    // style: 'font-size: 12px;',
                                                    items: [
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Whatsapp 1',
                                                                    anchor: '-5',
                                                                    name: 'wa_1_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Whatsapp 3',
                                                                    anchor: '-5',
                                                                    name: 'wa_3_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },

                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [

                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 3,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'wa_1_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Terkirim',
                                                                            name: 'wastatus1',
                                                                            inputValue: '1',
                                                                            itemId: 'wastatus1_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Hanya Dibaca',
                                                                            name: 'wastatus1',
                                                                            inputValue: '2',
                                                                            itemId: 'wastatus1_2'
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dibaca & Ditanggapi',
                                                                            name: 'wastatus1',
                                                                            inputValue: '3',
                                                                            itemId: 'wastatus1_3'
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 3,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'wa_3_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Terkirim',
                                                                            name: 'wastatus3',
                                                                            inputValue: '1',
                                                                            itemId: 'wastatus3_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Hanya Dibaca',
                                                                            name: 'wastatus3',
                                                                            inputValue: '2',
                                                                            itemId: 'wastatus3_2'
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dibaca & Ditanggapi',
                                                                            name: 'wastatus3',
                                                                            inputValue: '3',
                                                                            itemId: 'wastatus3_3'
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            layout    : 'hbox',
                                                            bodyStyle : 'border:0px',
                                                            width     : '100%',
                                                            items     : [
                                                                {
                                                                    xtype      : 'xnotefieldEST',
                                                                    fieldLabel : 'Ket. Whatsapp 1',
                                                                    anchor     : '-5',
                                                                    name       : 'wa_1_keterangan',
                                                                    flex       : 6,
                                                                    readOnly   : true,
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype      : 'xnotefieldEST',
                                                                    fieldLabel : 'Ket. Whatsapp 3',
                                                                    anchor     : '-5',
                                                                    name       : 'wa_3_keterangan',
                                                                    flex       : 6,
                                                                    readOnly   : true,
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Whatsapp 2',
                                                                    anchor: '-5',
                                                                    name: 'wa_2_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Whatsapp 4',
                                                                    anchor: '-5',
                                                                    name: 'wa_4_date',
                                                                    flex: 6,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [

                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 3,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'wa_2_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Terkirim',
                                                                            name: 'wastatus2',
                                                                            inputValue: '1',
                                                                            itemId: 'wastatus2_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Hanya Dibaca',
                                                                            name: 'wastatus2',
                                                                            inputValue: '2',
                                                                            itemId: 'wastatus2_2'
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dibaca & Ditanggapi',
                                                                            name: 'wastatus2',
                                                                            inputValue: '3',
                                                                            itemId: 'wastatus2_3'
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    columns: 3,
                                                                    flex: 6,
                                                                    fieldLabel: '',
                                                                    name: 'wa_4_status',
                                                                    items: [
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Terkirim',
                                                                            name: 'wastatus4',
                                                                            inputValue: '1',
                                                                            itemId: 'wastatus4_1',
                                                                            //                                                                                                    checked: true
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Hanya Dibaca',
                                                                            name: 'wastatus4',
                                                                            inputValue: '2',
                                                                            itemId: 'wastatus4_2'
                                                                        },
                                                                        {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Dibaca & Ditanggapi',
                                                                            name: 'wastatus4',
                                                                            inputValue: '3',
                                                                            itemId: 'wastatus4_3'
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            layout    : 'hbox',
                                                            bodyStyle : 'border:0px',
                                                            width     : '100%',
                                                            items     : [
                                                                {
                                                                    xtype      : 'xnotefieldEST',
                                                                    fieldLabel : 'Ket. Whatsapp 2',
                                                                    anchor     : '-5',
                                                                    name       : 'wa_2_keterangan',
                                                                    flex       : 6,
                                                                    readOnly   : true,
                                                                },
                                                                { xtype: 'splitter', width: 20 },
                                                                {
                                                                    xtype      : 'xnotefieldEST',
                                                                    fieldLabel : 'Ket. Whatsapp 4',
                                                                    anchor     : '-5',
                                                                    name       : 'wa_4_keterangan',
                                                                    flex       : 6,
                                                                    readOnly   : true,
                                                                },
                                                            ]
                                                        },

                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            layout    : 'hbox',
                                            padding   : '10px 0 0 0',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Keterangan',
                                                    name       : 'description_undangan',
                                                    width      : '100%',
                                                    flex       : 6,
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            align: 'right',
                                            items: [
                                                {
                                                    xtype: 'splitter', width: 110,
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Save',
                                                    padding: '2px 5px',
                                                    action: 'save_detail',
                                                    name: 'btn_save',
                                                    //iconCls: 'icon-save',
                                                    style: 'background-color:#FFC000;'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Update',
                                                    padding: '2px 5px',
                                                    action: 'update_detail',
                                                    name: 'btn_update',
                                                    //iconCls: 'icon-save',
                                                    hidden: true,
                                                    style: 'background-color:#FFC000;'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Cancel',
                                                    padding: '2px 5px',
                                                    action: 'cancel_detail',
                                                    name: 'btn_cancel',
                                                    hidden: true,
                                                    //iconCls: 'icon-save',
                                                    style: 'background-color:#FFC000;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'formundanganajbgriddetail',
                                                    width: '100%',
                                                    itemId: 'M_formundanganajbgriddetail'
                                                }
                                            ]
                                        }

                                    ]
                                },
                            ]
                        }
                    ]
                },
                // {
                //     xtype: 'panel', bodyPadding: 10, title: 'DATA UNDANGAN', collapsible: true,
                //     items: [
                //         {
                //             layout: 'hbox',
                //             padding: '10px 0 0 0',
                //             bodyStyle: 'border:0px',
                //             width: '100%',
                //             items: [
                //                 {
                //                     xtype: 'panel', flex: 7,
                //                     layout: {
                //                         type: 'vbox',
                //                         defaultMargins: { top: 0, right: 0, bottom: 10, left: 0 }
                //                     },
                //                     bodyStyle: 'border:0px',
                //                     items: [
                //                         {
                //                             layout: 'hbox',
                //                             bodyStyle: 'border:0px',
                //                             width: '100%',
                //                             items: [
                //                                 {
                //                                     xtype: 'hiddenfield',
                //                                     name: 'hgbajb_undangan_id',
                //                                 },
                //                                 {
                //                                     xtype: 'datefield',
                //                                     fieldLabel: 'Tanggal Undangan',
                //                                     anchor: '-5',
                //                                     name: 'undangan_date',
                //                                     value: new Date(),
                //                                     flex: 6,
                //                                     format: 'd-m-Y',
                //                                     altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                     submitFormat: 'Y-m-d H:i:s.u'
                //                                 },
                //                             ]
                //                         },
                //                         {
                //                             layout: 'hbox',
                //                             bodyStyle: 'border:0px',
                //                             width: '100%',
                //                             items: [
                //                                 {
                //                                     xtype: 'responundanganajbcombobox',
                //                                     itemId: 'fd_responundanganajbcb',
                //                                     fieldLabel: 'Respon Undangan AJB',
                //                                     anchor: '-5',
                //                                     name: 'respon_undanganajb_id',
                //                                     flex: 6,
                //                                 },
                //                             ]
                //                         },
                //                         {
                //                             layout: 'hbox',
                //                             bodyStyle: 'border:0px',
                //                             width: '100%',
                //                             items: [
                //                                 {
                //                                     xtype: 'checkboxfield',
                //                                     fieldLabel: '',
                //                                     name: 'is_got_email',
                //                                     itemId: 'is_got_email_value',
                //                                     checked: false,
                //                                     inputValue: '1',
                //                                     uncheckedValue: '0',
                //                                     margin: '0 0 0 0px',
                //                                     width: 20
                //                                 },
                //                                 {
                //                                     xtype: 'label',
                //                                     text: 'Memiliki Email',
                //                                     itemId: 'is_got_email_label',
                //                                 }
                //                             ]
                //                         },
                //                     ]


                //                 },
                //                 { xtype: 'splitter', width: 30 },
                //                 {
                //                     xtype: 'panel', flex: 7,
                //                     layout: {
                //                         type: 'vbox',
                //                         defaultMargins: { top: 0, right: 0, bottom: 10, left: 0 }
                //                     },
                //                     bodyStyle: 'border:0px',
                //                     items: [
                //                         {
                //                             layout: 'hbox',
                //                             bodyStyle: 'border:0px',
                //                             width: '100%',
                //                             items: [
                //                                 {
                //                                     xtype: 'datefield',
                //                                     fieldLabel: 'Tanggal Janjian AJB',
                //                                     anchor: '-5',
                //                                     name: 'janjian_ajb_date',
                //                                     flex: 6,
                //                                     format: 'd-m-Y',
                //                                     altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                     submitFormat: 'Y-m-d H:i:s.u'
                //                                 },
                //                             ]
                //                         },

                //                     ]
                //                 },
                //             ]
                //         },
                //         {
                //             layout: 'hbox',
                //             bodyStyle: 'border:0px',
                //             width: '100%',
                //             items: [
                //                 {
                //                     xtype: 'panel', flex: 12,
                //                     layout: {
                //                         type: 'vbox',
                //                         defaultMargins: { top: 0, right: 0, bottom: 10, left: 0 }
                //                     },
                //                     bodyStyle: 'border:0px',
                //                     items: [
                //                         {
                //                             xtype: 'fieldset',
                //                             bodyPadding: 10,
                //                             width: '100%',
                //                             title: 'Email',
                //                             items: [

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Email 1',
                //                                             anchor: '-5',
                //                                             name: 'email_1_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },
                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'email_1_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Gagal Kirim',
                //                                                     name: 'emailstatus1',
                //                                                     inputValue: '1',
                //                                                     itemId: 'emailstatus1_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Berhasil Kirim',
                //                                                     name: 'emailstatus1',
                //                                                     inputValue: '2',
                //                                                     itemId: 'emailstatus1_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Email 2',
                //                                             anchor: '-5',
                //                                             name: 'email_2_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'email_2_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Gagal Kirim',
                //                                                     name: 'emailstatus2',
                //                                                     inputValue: '1',
                //                                                     itemId: 'emailstatus2_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Berhasil Kirim',
                //                                                     name: 'emailstatus2',
                //                                                     inputValue: '2',
                //                                                     itemId: 'emailstatus2_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Email 3',
                //                                             anchor: '-5',
                //                                             name: 'email_3_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'email_3_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Gagal Kirim',
                //                                                     name: 'emailstatus3',
                //                                                     inputValue: '1',
                //                                                     itemId: 'emailstatus3_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Berhasil Kirim',
                //                                                     name: 'emailstatus3',
                //                                                     inputValue: '2',
                //                                                     itemId: 'emailstatus3_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Email 4',
                //                                             anchor: '-5',
                //                                             name: 'email_4_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'email_4_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Gagal Kirim',
                //                                                     name: 'emailstatus4',
                //                                                     inputValue: '1',
                //                                                     itemId: 'emailstatus4_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Berhasil Kirim',
                //                                                     name: 'emailstatus4',
                //                                                     inputValue: '2',
                //                                                     itemId: 'emailstatus4_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },
                //                             ]
                //                         },

                //                     ]
                //                 }
                //             ]
                //         },
                //         {
                //             layout: 'hbox',
                //             bodyStyle: 'border:0px',
                //             width: '100%',
                //             items: [
                //                 {
                //                     xtype: 'panel', flex: 12,
                //                     layout: {
                //                         type: 'vbox',
                //                         defaultMargins: { top: 0, right: 0, bottom: 10, left: 0 }
                //                     },
                //                     bodyStyle: 'border:0px',
                //                     items: [
                //                         {
                //                             xtype: 'fieldset',
                //                             bodyPadding: 10,
                //                             width: '100%',
                //                             title: 'Surat',
                //                             items: [
                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Surat 1',
                //                                             anchor: '-5',
                //                                             name: 'surat_1_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'surat_1_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Dikembalikan',
                //                                                     name: 'suratstatus1',
                //                                                     inputValue: '1',
                //                                                     itemId: 'suratstatus1_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Diterima',
                //                                                     name: 'suratstatus1',
                //                                                     inputValue: '2',
                //                                                     itemId: 'suratstatus1_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Surat 2',
                //                                             anchor: '-5',
                //                                             name: 'surat_2_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'surat_2_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Dikembalikan',
                //                                                     name: 'suratstatus2',
                //                                                     inputValue: '1',
                //                                                     itemId: 'suratstatus2_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Diterima',
                //                                                     name: 'suratstatus2',
                //                                                     inputValue: '2',
                //                                                     itemId: 'suratstatus2_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Surat 3',
                //                                             anchor: '-5',
                //                                             name: 'surat_3_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'surat_3_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Dikembalikan',
                //                                                     name: 'suratstatus3',
                //                                                     inputValue: '1',
                //                                                     itemId: 'suratstatus3_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Diterima',
                //                                                     name: 'suratstatus3',
                //                                                     inputValue: '2',
                //                                                     itemId: 'suratstatus3_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel: 'Tanggal Surat 4',
                //                                             anchor: '-5',
                //                                             name: 'surat_4_date',
                //                                             flex: 6,
                //                                             format: 'd-m-Y',
                //                                             altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                //                                             submitFormat: 'Y-m-d H:i:s.u'
                //                                         },
                //                                     ]
                //                                 },

                //                                 {
                //                                     layout: 'hbox',
                //                                     bodyStyle: 'border:0px',
                //                                     width: '100%',
                //                                     items: [

                //                                         {
                //                                             xtype: 'radiogroup',
                //                                             columns: 2,
                //                                             flex: 6,
                //                                             fieldLabel: '',
                //                                             name: 'surat_4_status',
                //                                             items: [
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Dikembalikan',
                //                                                     name: 'suratstatus4',
                //                                                     inputValue: '1',
                //                                                     itemId: 'suratstatus4_1',
                //                                                     //                                                                                                    checked: true
                //                                                 },
                //                                                 {
                //                                                     xtype: 'radiofield',
                //                                                     boxLabel: 'Diterima',
                //                                                     name: 'suratstatus4',
                //                                                     inputValue: '2',
                //                                                     itemId: 'suratstatus4_2'
                //                                                 }
                //                                             ]
                //                                         },
                //                                     ]
                //                                 },
                //                             ]
                //                         }
                //                     ]
                //                 }
                //             ]
                //         },
                //         {
                //             layout: 'hbox',
                //             bodyStyle: 'border:0px',
                //             width: '100%',
                //             items: [
                //                 {
                //                     xtype: 'panel', flex: 12,
                //                     layout: {
                //                         type: 'vbox',
                //                         defaultMargins: { top: 0, right: 0, bottom: 10, left: 0 }
                //                     },
                //                     bodyStyle: 'border:0px',
                //                     items: [
                //                         {
                //                             xtype: 'textareafield',
                //                             fieldLabel: 'Keterangan',
                //                             name: 'description_undangan',
                //                             width: '100%',
                //                             flex: 6,
                //                         },
                //                         {
                //                             layout: 'hbox',
                //                             bodyStyle: 'border:0px',
                //                             width: '100%',
                //                             align: 'right',
                //                             items: [
                //                                 {
                //                                     xtype: 'splitter', width: 110,
                //                                 },
                //                                 {
                //                                     xtype: 'button',
                //                                     text: 'Save',
                //                                     padding: '2px 5px',
                //                                     action: 'save_detail',
                //                                     name: 'btn_save',
                //                                     //iconCls: 'icon-save',
                //                                     style: 'background-color:#FFC000;'
                //                                 },
                //                                 {
                //                                     xtype: 'button',
                //                                     text: 'Update',
                //                                     padding: '2px 5px',
                //                                     action: 'update_detail',
                //                                     name: 'btn_update',
                //                                     //iconCls: 'icon-save',
                //                                     hidden: true,
                //                                     style: 'background-color:#FFC000;'
                //                                 },
                //                                 {
                //                                     xtype: 'button',
                //                                     text: 'Cancel',
                //                                     padding: '2px 5px',
                //                                     action: 'cancel_detail',
                //                                     name: 'btn_cancel',
                //                                     hidden: true,
                //                                     //iconCls: 'icon-save',
                //                                     style: 'background-color:#FFC000;'
                //                                 }


                //                             ]
                //                         },
                //                         {
                //                             layout: 'hbox',
                //                             padding: '10px 0 0 0',
                //                             bodyStyle: 'border:0px',
                //                             width: '100%',
                //                             items: [
                //                                 {
                //                                     xtype: 'formundanganajbgriddetail',
                //                                     width: '100%',
                //                                     itemId: 'M_formundanganajbgriddetail'
                //                                 }
                //                             ]
                //                         }
                //                     ]
                //                 },
                //             ]
                //         },
                //     ]
                // },

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

    generateDockedItem: function () {
        var me = this;
        var ac = {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                padding: 6,
                type: 'hbox'
            },
            items: [
                //                    {
                //                        xtype: 'button',
                //                        action: 'save',
                //                        itemId: 'btnSave',
                //                        padding: 5,
                //                        width: 75,
                //                        iconCls: 'icon-save',
                //                        text: 'Save'
                //                    },
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
        };
        return ac;
    }

});

