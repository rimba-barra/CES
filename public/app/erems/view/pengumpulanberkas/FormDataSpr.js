Ext.define('Erems.view.pengumpulanberkas.FormDataSpr', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.pengumpulanberkasformdataspr',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    //    width: 800,
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
                    itemId: 'fdms_berkas_surat_id',
                    name: 'berkas_surat_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_unit_id',
                    name: 'unit_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_berkas_spr_id',
                    name: 'berkas_spr_id'
                },

                {
                    xtype: 'panel', bodyPadding: 10, title: 'INFORMATION', collapsible: true,
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
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Kawasan / Cluster',
                                                anchor: '-5',
                                                name: 'code',
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
                                            items: [{
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
                                            }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                xtype: 'combobox',
                                                fieldLabel: 'Kavling / Unit No. ',
                                                anchor: '-5',
                                                name: 'unit_unit_number',
                                                flex: 6,
                                                readOnly: true,
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                            }]
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
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Purchase Letter No.',
                                                anchor: '-5',
                                                name: 'purchaseletter_no',
                                                flex: 1,
                                                readOnly: true,
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                            }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Customer Name',
                                                anchor: '-5',
                                                name: 'customer_name',
                                                flex: 1,
                                                readOnly: true,
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                            }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Purchase Letter Date',
                                                anchor: '-5',
                                                name: 'purchase_date',
                                                flex: 1,
                                                readOnly: true,
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u'
                                            }
                                            ]
                                        },

                                    ]
                                }
                            ]
                        }

                    ]
                },

                {
                    xtype: 'panel', bodyPadding: 10, title: 'GENERATE SPR', collapsible: true,
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
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Nomor SPr',
                                                anchor: '-5',
                                                name: 'spr_no',
                                                flex: 1,
                                                allowBlank: false,
                                            },
                                            { xtype: 'splitter', width: 20 },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Tanggal Pembuatan Spr',
                                                anchor: '-5',
                                                name: 'spr_date',
                                                flex: 1,
                                                value: new Date(),
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                allowBlank: false,
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Spr Ke',
                                                anchor: '-5',
                                                name: 'spr_index',
                                                flex: 1,
                                                readOnly: true,
                                                //                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                allowBlank: false,
                                            },
                                            { xtype: 'splitter', width: 20 },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Tanggal SPr Selanjutnya',
                                                anchor: '-5',
                                                name: 'spr_next_date',
                                                flex: 1,
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                allowBlank: false,
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                { xtype: 'splitter', width: 450 },
                                                {
                                                    xtype: 'label',
                                                    name: 'lbl_tglum',
                                                    hidden: true,
                                                    text: 'Tanggal UM Terakhir: 20-03-2020',
                                                    width: 300
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                xtype      : 'xnotefieldEST',
                                                fieldLabel : 'Notes',
                                                anchor     : '-5',
                                                name       : 'notes',
                                                flex       : 1,
                                            }]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'pengumpulanberkasgridsprdetail',
                                                    width: '100%',
                                                    //                                                                        itemId: 'M_formundanganajbgriddetail'
                                                }
                                            ]
                                        },



                                    ]
                                },
                            ]
                        }
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
                        action: 'savespr',
                        itemId: 'btnSaveSpr',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
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

