Ext.define('Erems.view.installmentpayment.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.installmentpaymentformdata',
    requires: [
        // 'Erems.library.template.component.Paymentmethodcombobox',
        // 'Erems.library.template.component.Pricetypecombobox',
        // 'Erems.library.template.component.Kprstatuscombobox',
        'Erems.view.installmentpayment.PaymentDetailGrid',
        //  'Erems.library.template.view.combobox.Paymentmethod',
        'Erems.library.template.view.MoneyField'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    fieldNamePrefix: 'customer_',
    editedRow: -1,
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'hiddenfield',
                name: 'payment_id'
            }, {
                xtype: 'hiddenfield',
                name: 'purchaseletter_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'cd_amount'
            },
            {
                xtype: 'hiddenfield',
                name: 'cdn_val'
            },
            {
                xtype: 'panel',
                bodyPadding: '10px',
                items: [
                    {
                        layout: 'hbox', bodyStyle: 'border:0px',
                        items: [{
                            xtype: 'label',
                            flex: 3
                        }, {
                            flex: 2,
                            bodyPadding: 10,
                            layout: 'hbox',
                            bodyStyle: 'background-color:#FFFF99;border:0px',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'State',
                                labelWidth: 35,
                                name: 'unitstatus_status',
                                value: '',
                                readOnly: true,
                                flex: 1,
                                fieldStyle: 'background-color:#FFCC00;background-image: none;'

                            }, {
                                xtype: 'splitter', width: 5,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Const. Progress',
                                name: 'email',
                                value: '0%',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#FFCC00;background-image: none;'
                            }]
                        }]
                    },
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
                                        xtype: 'textfield',
                                        name: 'pt_name',
                                        width: 368,
                                        fieldLabel: 'PT',
                                        keepRO: true,
                                        readOnly: true,
                                        defaultMargins: { top: 0, right: 0, bottom: 5, left: 0 }

                                    },
                                    {
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
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
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            anchor: '-5',
                                            name: 'cluster_cluster',
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
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            anchor: '-5',
                                            name: 'block_block',
                                            flex: 6,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                // width: '100%',
                                                name: 'unit_unit_number',
                                                readOnly: true,
                                                fieldLabel: 'Kavling / Unit No.',
                                                margin: '0 5px 0 0',
                                                flex: 6,
                                                anchor: '-5',
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                            },
                                            // {
                                            //     xtype: 'combobox',
                                            //     queryMode:'local',
                                            //     fieldLabel: 'Kavling / Unit No. ',
                                            //     anchor: '-5',
                                            //     name: 'unit_unit_number',
                                            //     flex: 6,
                                            //     readOnly: true,
                                            //     fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                            //     typeAhead: true,
                                            //     queryMode: 'local',
                                            //     lastQuery: '',
                                            //     forceSelection:true,
                                            //     listeners:{
                                            //         beforequery: function(record){
                                            //             record.query = new RegExp(record.query, 'i');
                                            //             record.forceAll = true;
                                            //         }
                                            //     }
                                            // }, 
                                            {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'button',
                                                text: 'Browse Unit',
                                                itemId: 'fd_browse_unit_btn',
                                                padding: '2px 5px',
                                                action: 'browse_unit',
                                                iconCls: 'icon-search',
                                                style: 'background-color:#FFC000;'
                                            },
                                            { xtype: 'label', text: '', flex: 2 }]
                                    },
                                    {
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'PPNDTP',
                                            anchor: '-5',
                                            name: 'is_nonppn',
                                            flex: 5,
                                            readOnly: true,
                                            hidden: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Netto',
                                            anchor: '-5',
                                            name: 'price_harga_neto',
                                            flex: 5,
                                            readOnly: true,
                                            hidden: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }


                                        ]
                                    },
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
                                            fieldLabel: 'Product Category',
                                            anchor: '-5',
                                            name: 'productcategory_productcategory',
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
                                            fieldLabel: 'Type',
                                            anchor: '-5',
                                            name: 'type_name',
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
                                            fieldLabel: 'Land Size',
                                            anchor: '-5',
                                            name: 'unit_land_size',
                                            flex: 12,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        { xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px' },
                                        {
                                            xtype: 'splitter', width: 30,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Long',
                                            anchor: '-5',
                                            name: 'unit_long',
                                            flex: 6,
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
                                        items: [{
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
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Width',
                                            anchor: '-5',
                                            name: 'unit_width',
                                            flex: 6,
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
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Kelebihan Tanah',
                                            anchor: '-5',
                                            name: 'unit_kelebihan',
                                            flex: 12,
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
                xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER INFORMATION', collapsible: true,
                width: '100%',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'vbox',
                        bodyStyle: 'border:0px',
                        items: [
                            {
                                xtype: 'panel',
                                flex: 2,
                                width: '100%',
                                layout: 'hbox',
                                bodyStyle: 'border:0px',
                                items: [
                                    {
                                        xtype: 'panel',
                                        flex: 3,
                                        layout: 'vbox',
                                        bodyStyle: 'border:0px',
                                        items: [
                                            {
                                                //  bodyPadding: 10,
                                                padding: '10px 0 0 0',
                                                layout: 'hbox',
                                                width: '100%',
                                                bodyStyle: 'border:0px',
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
                                                //  bodyPadding: 10,
                                                padding: '10px 0 0 0',
                                                layout: 'hbox',
                                                width: '100%',
                                                bodyStyle: 'border:0px',
                                                items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Price Type',
                                                    anchor: '-5',
                                                    name: 'pricetype_pricetype',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, { xtype: 'label', text: '', flex: 1 }]
                                            },
                                            {
                                                //  bodyPadding: 10,
                                                padding: '10px 0 0 0',
                                                layout: 'hbox',
                                                width: '100%',
                                                bodyStyle: 'border:0px',
                                                items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'Total Price',
                                                    anchor: '-5',
                                                    name: 'harga_total_jual',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                            }

                                        ]
                                    },
                                    { xtype: 'splitter', width: 30 },
                                    {
                                        xtype: 'panel',
                                        flex: 2,
                                        layout: 'vbox',
                                        bodyStyle: 'border:0px',
                                        items: [
                                            {
                                                //  bodyPadding: 10,
                                                padding: '10px 0 0 0',
                                                layout: 'hbox',
                                                width: '100%',
                                                bodyStyle: 'border:0px',
                                                items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Purchase Letter Date',
                                                    anchor: '-5',
                                                    name: 'purchase_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                            },
                                            {
                                                //  bodyPadding: 10,
                                                padding: '10px 0 0 0',
                                                layout: 'hbox',
                                                width: '100%',
                                                bodyStyle: 'border:0px',
                                                items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Serah Terima',
                                                    anchor: '-5',
                                                    name: 'rencana_serahterima_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                            }
                                        ]
                                    }
                                ]
                            },
                            //////// bagian bawah ///

                        ]
                    }
                ]
            },
            /* CUSTOMER INFORMATION */
            {
                xtype: 'panel', bodyPadding: 10, title: 'CUSTOMER INFORMATION', collapsible: true,
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
                                            fieldLabel: 'Customer ID',
                                            anchor: '-5',
                                            name: me.fieldNamePrefix + 'customer_id',
                                            flex: 3,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }, {
                                            xtype: 'splitter', width: 20,
                                        },
                                        {
                                            xtype: 'label', flex: 5
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Customer Name',
                                            anchor: '-5',
                                            name: me.fieldNamePrefix + 'name',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }]
                                    },
                                    {
                                        padding   : '10px 0 0 0',
                                        layout    : 'hbox',
                                        bodyStyle : 'border:0px',
                                        items     : [
                                            {
                                                xtype      : 'xaddressfieldEST',
                                                fieldLabel : 'Address',
                                                anchor     : '-5',
                                                name       : me.fieldNamePrefix + 'address',
                                                flex       : 1,
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2;'
                                            }
                                        ]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'City',
                                            anchor: '-5',
                                            name: 'city_city_name',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }, {
                                            xtype: 'splitter', width: 20,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Zip Code',
                                            anchor: '-5',
                                            name: me.fieldNamePrefix + 'zipcode',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Home phone',
                                            name       : me.fieldNamePrefix + 'home_phone',
                                            flex       : 1,
                                            readOnly   : true,
                                            anchor     : '-5',
                                            fieldStyle : 'background:none;background-color:#F2F2F2;'
                                        }, {
                                            xtype: 'splitter', width: 20,
                                        }, {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Mobile phone',
                                            name       : me.fieldNamePrefix + 'mobile_phone',
                                            flex       : 1,
                                            readOnly   : true,
                                            anchor     : '-5',
                                            fieldStyle : 'background:none;background-color:#F2F2F2;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Office phone',
                                            name       : me.fieldNamePrefix + 'office_phone',
                                            flex       : 1,
                                            readOnly   : true,
                                            anchor     : '-5',
                                            fieldStyle : 'background:none;background-color:#F2F2F2;'
                                        }, {
                                            xtype: 'splitter', width: 20,
                                        }, {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'FAX',
                                            anchor     : '-5',
                                            name       : me.fieldNamePrefix + 'fax',
                                            flex       : 1,
                                            readOnly   : true,
                                            fieldStyle : 'background:none;background-color:#F2F2F2;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'KTP Number',
                                            anchor: '-5',
                                            name: me.fieldNamePrefix + 'KTP_number',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'NPWP Number',
                                            anchor: '-5',
                                            name: me.fieldNamePrefix + 'NPWP',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Email Address',
                                            anchor: '-5',
                                            name: me.fieldNamePrefix + 'email',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }]
                                    }



                                ]
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                width: '100%',
                                padding: '10px 0 0 10px',
                                bodyStyle: 'border:0px',
                                items: [
                                    /*  {
                                     xtype: 'panel', flex: 1, height: 200, bodyStyle: 'background-color:#F2F2F2;',
                                     padding: '0 0 10px 0'},*/
                                    {
                                        xtype: 'panel',
                                        height: 200,
                                        bodyStyle: 'background:none',
                                        itemId: 'photo_image',
                                        html: '',
                                        // flex: 1,
                                        width: 160
                                    },
                                    // {xtype: 'button', text: 'Create New Customer', flex: 1}
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel', bodyPadding: 10, title: 'PAYMENT INFORMATION', collapsible: true,
                width: '100%',
                items: [
                    {
                        layout: 'hbox', bodyStyle: 'border:0px',
                        items: [
                            {
                                xtype: 'panel', flex: 2, layout: 'vbox', bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Payment No',
                                            name: 'payment_no',
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                            flex: 1,
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'combobox',
                                            queryMode: 'local',
                                            displayField: 'paymentmethod',
                                            fieldLabel: 'Payment Method',
                                            valueField: 'paymentmethod_id',
                                            name: 'paymentmethod_paymentmethod_id',
                                            flex: 2,
                                            typeAhead: true,
                                            queryMode: 'local',
                                            lastQuery: '',
                                            forceSelection: true,
                                            listeners: {
                                                beforequery: function (record) {
                                                    record.query = new RegExp(record.query, 'i');
                                                    record.forceAll = true;
                                                }
                                            }
                                        }, {
                                            xtype: 'splitter', width: 30
                                        }, {
                                            xtype: 'checkboxfield',
                                            fieldLabel: 'Reference Rejected',
                                            name: 'is_referencerejected',
                                            flex: 1,
                                            hideLabel: true,
                                            boxLabel: 'Reference Rejected'

                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Reference No',
                                            name: 'reference_no',
                                            flex: 1,
                                            enforceMaxLength: true,
                                            maxLength: 30
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'textfield',
                                            enableKeyEvents: true,
                                            fieldLabel: 'Receipt No',
                                            name: 'receipt_no',
                                            flex: 1,
                                            enforceMaxLength: true,
                                            maxLength: 30
                                        }]
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        fieldLabel: '',
                                        // Arrange radio buttons into two columns, distributed vertically
                                        itemId: 'cdnID',
                                        labelWidth: 1,
                                        width: '100%',
                                        layout: 'hbox',
                                        defaults: {
                                            margin: '0 20 0 0'
                                        },
                                        flex: 3,
                                        items: [
                                            { boxLabel: 'Credit Note', name: 'cdn', inputValue: 1 },
                                            { boxLabel: 'Debit Note', name: 'cdn', inputValue: 2 },
                                            { boxLabel: 'None', name: 'cdn', inputValue: 3, checked: true }
                                        ]
                                    }



                                ]
                            }, { xtype: 'splitter', width: 20 },
                            {
                                xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'datefield',
                                            fieldLabel: 'Payment Date',
                                            name: 'payment_date',
                                            value: new Date(),
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d H:i:s.u',
                                            flex: 1,
                                            editable: false
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'datefield',
                                            fieldLabel: 'Due date',
                                            name: 'duedate',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d H:i:s.u',
                                            flex: 1,
                                            editable: false
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'datefield',
                                            fieldLabel: 'Tanggal Cair',
                                            name: 'cair_date',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d H:i:s.u',
                                            flex: 1,
                                            // editable:false
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'No. Voucher Finance',
                                            name: 'voucher_no',
                                            keepRO: true,
                                            readOnly: true,
                                            flex: 1,
                                        }]
                                    },
                                ]
                            }

                        ]
                    },
                    {
                        //  bodyPadding: 10,
                        padding: '10px 0 0 0',
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        itemId: 'inpaGridfdHolder',
                        width: '100%',
                        items: [{
                            xtype: 'installmentpaymentpaymentdetailgrid',
                            width: '100%',
                            itemId: 'MyScheduleGrid',
                            plugins: null

                        }]
                    },
                    {
                        layout: 'hbox', bodyStyle: 'border:0px',
                        items: [
                            {
                                xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                items: [
                                    {
                                        padding   : '10px 0 0 0',
                                        layout    : 'hbox',
                                        bodyStyle : 'border:0px',
                                        width     : '100%',
                                        items     : [{
                                            xtype      : 'xnotefieldEST',
                                            fieldLabel : 'Notes',
                                            name       : 'note',
                                            height     : 120,
                                            labelWidth : 50,
                                            flex       : 1,
                                        }]
                                    }

                                ]
                            }, { xtype: 'splitter', width: 20 },
                            {
                                xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'xmoneyfield',
                                            fieldLabel: 'CURRENT DENDA',
                                            name: 'current_denda',
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
                                            value: 0.00,
                                            flex: 1,
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'xmoneyfield',
                                            fieldLabel: 'TOTAL DENDA',
                                            name: 'denda',
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
                                            value: 0.00,
                                            flex: 1,
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [
                                            {
                                                xtype: 'button',
                                                action: 'fullpayment',
                                                text: 'Full',
                                                width: 35,
                                                margin: '0 10px 0 0'
                                            }
                                            , {
                                                xtype: 'xmoneyfield',
                                                fieldLabel: 'PAYMENT',
                                                name: 'payment',
                                                labelWidth: 55,
                                                //  currencyFormat: true,
                                                fieldStyle: 'text-align:right',
                                                value: 0.00,
                                                flex: 1,
                                            }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'xmoneyfield',
                                            fieldLabel: 'ADM FEE',
                                            name: 'admin_fee',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //  currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00,
                                            flex: 1,
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'xmoneyfield',
                                            fieldLabel: 'CN / DN VALUE',
                                            name: 'cdn_value',
                                            readOnly: true,
                                            maskRe: /[0-9\.]/,
                                            //  currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00,
                                            flex: 1,
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                            xtype: 'xmoneyfield',
                                            fieldLabel: 'TOTAL PAYMENT',
                                            name: 'total_payment',
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
                                            value: 0.00,
                                            flex: 1,
                                        }]
                                    }
                                ]
                            }

                        ]
                    }
                ]
            }

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
                    },
                    //add by fatkur 21092020
                    {
                        xtype: 'button',
                        action: 'saveDraft',
                        itemId: 'btnSaveDraft',
                        disabled: true,
                        hidden: true,
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-save',
                        text: 'Save Draft'
                    }
                    //end add
                ]
            }
        ];
        return x;
    },
});