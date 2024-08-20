Ext.define('Erems.view.suratperingatan.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.suratperingatanformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    //    width: 400,
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
                itemId: 'fdms_suratperingatan_id',
                name: 'suratperingatan_id'
            },
            {
                xtype: 'hiddenfield',
                itemId: 'fdms_suratperingatan_index',
                name: 'suratperingatan_index'
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
                                        //                                                        {
                                        //                                                            layout: 'hbox',
                                        //                                                            bodyStyle: 'border:0px',
                                        //                                                            width: '100%',
                                        //                                                            items: [{
                                        //                                                                        xtype: 'textfield',
                                        //                                                                        fieldLabel: 'PT',
                                        //                                                                        anchor: '-5',
                                        //                                                                        name: 'unit_pt_name',
                                        //                                                                        flex: 1,
                                        //                                                                        readOnly: true,
                                        //                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        //                                                                    }]
                                        //                                                        },
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
                                            },
                                                //                                                                    {
                                                //                                                                        xtype: 'splitter', width: 5,
                                                //                                                                    }, {
                                                //                                                                        xtype: 'button',
                                                //                                                                        text: 'Browse Unit',
                                                //                                                                        itemId: 'fd_browse_unit_btn',
                                                //                                                                        padding: '2px 5px',
                                                //                                                                        action: 'browse_unit',
                                                //                                                                        iconCls: 'icon-search',
                                                //                                                                        style: 'background-color:#FFC000;'
                                                //                                                                    },
                                                //                                                                    {xtype: 'label', text: '', flex: 2}
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

                                            ]
                                        }
                                        ]
                                    }

                                    ]
                                },
                                {
                                    xtype: 'panel', bodyPadding: 10, title: 'Generate Surat Peringatan', collapsible: true,
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
                                                fieldLabel: 'Nomor Surat',
                                                anchor: '-5',
                                                name: 'suratperingatan_no',
                                                flex: 1,
                                                // allowBlank: false,
                                                readOnly: true
                                            },
                                            { xtype: 'splitter', width: 20 },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Tanggal Pembuatan',
                                                anchor: '-5',
                                                name: 'suratperingatan_date',
                                                flex: 1,
                                                value: new Date(),
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                allowBlank: false,
                                                maskRe: /[0-9\-]/
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'label',
                                                text: '',
                                                flex: 1,
                                                itemId: 'indexspr',
                                                style: {
                                                    'font-size': '20px'
                                                },
                                                // labelStyle: {
                                                //     'font-size': '32px'
                                                // }
                                            }]
                                        },
                                        {
                                            layout: 'hbox',
                                            padding: '10px 0 0 0',
                                            bodyStyle: 'border:0px',
                                            items: [
                                            {
                                                xtype: 'suratperingatangriddetail',
                                                width: '100%',
                                                    //                                                                        itemId: 'M_formundanganajbgriddetail'
                                                }
                                                ]
                                            },
                                            {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'label', text: 'Total Rest (Remaining Balance)', flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: '',
                                                anchor: '-1',
                                                name: 'total_remaining_balance',
                                                flex: 2,
                                                allowBlank: false,
                                                currencyFormat: true,
                                                readOnly: true
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'label', text: 'Total Rest Denda', flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: '',
                                                //                                                                    anchor: '-5',
                                                name: 'total_remaining_denda',
                                                flex: 2,
                                                allowBlank: false,
                                                currencyFormat: true,
                                                readOnly: true
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'label', text: 'Total', flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: '',
                                                name: 'total_nilai',
                                                flex: 2,
                                                allowBlank: false,
                                                currencyFormat: true,
                                                readOnly: true
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'label', text: 'Tanggal Surat Peringatan Selanjutnya*', flex: 1
                                            },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: '',
                                                name: 'suratperingatan_next_date',
                                                flex: 2,
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                allowBlank: false,
                                                maskRe: /[0-9\-]/
                                            }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype: 'label', text: 'Notes', flex: 1
                                                },
                                                {
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : '',
                                                    name       : 'notes',
                                                    flex       : 2,
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
            action: 'save',
            itemId: 'btnSave',
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

