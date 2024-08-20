Ext.define('Erems.view.admincollection.BankFormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.admincollectionbankformdatadetail',
    requires: [
        'Erems.library.template.component.Bankkprcombobox',
        'Erems.view.admincollection.BankGridAkad'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function () {
        var me = this;

        function dateOneYear() {
            var x = 12;
            var CurrentDate = new Date();
            CurrentDate.setMonth(CurrentDate.getMonth() + x);
            return CurrentDate;
        }

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_plbankkpr_id',
                    name: 'purchaseletter_bankkpr_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_temp_id_detail',
                    name: 'temp_id_detail'
                },
                /* BANK KPR PROCESS */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'BANK KPR PROCESS', collapsible: true,
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
                                                xtype: 'bankkprcombobox',
                                                fieldLabel: 'Bank KPR',
                                                anchor: '-5',
                                                itemId: 'fd_bank',
                                                name: 'bank_id',
                                                allowBlank: false,
                                                flex: 1,
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                listeners: {
                                                    beforequery: function(record){
                                                        record.query = new RegExp(record.query, 'i');
                                                        record.forceAll = true;
                                                    },
                                                    change: function () {
                                                        me.down('[name=bank_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Created By',
                                                anchor     : '-5',
                                                name       : 'bank_createdby_name',
                                                readOnly   : true,
                                                flex       : 1,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* APPRAISAL */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'APPRAISAL', collapsible: true,
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
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Created By',
                                                anchor     : '-5',
                                                name       : 'appraisal_createdby_name',
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Appraisal Request Date',
                                                anchor: '-5',
                                                name: 'appraisalplan_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=appraisal_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype: 'datefield',
                                                fieldLabel: 'Appraisal Date',
                                                anchor: '-5',
                                                name: 'appraisal_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=appraisal_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* PENGUMPULAN BERKAS */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'PENGUMPULAN BERKAS', collapsible: true,
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
                                            padding: '0 0 0 110px',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                anchor: '100%',
                                                fieldLabel: '',
                                                boxLabel: 'Check Berkas',
                                                name: 'is_cekberkas',
                                                inputValue: 1,
                                                uncheckedValue: 0,
                                                hidden: true
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Created By',
                                                anchor     : '-5',
                                                name       : 'berkasbank_createdby_name',
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Tanggal berkas masuk',
                                                anchor: '-5',
                                                name: 'berkasmasuk_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=berkasbank_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype: 'datefield',
                                                fieldLabel: 'Tanggal di Bank',
                                                anchor: '-5',
                                                name: 'berkasbank_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=berkasbank_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* INTERVIEW (RS ONLY) */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'INTERVIEW (RS ONLY)', collapsible: true,
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
                                            padding: '0 0 0 110px',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                anchor: '100%',
                                                fieldLabel: '',
                                                boxLabel: 'Check Wawancara',
                                                name: 'is_cekinterview',
                                                inputValue: 1,
                                                uncheckedValue: 0,
                                                hidden: true
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Created By',
                                                anchor     : '-5',
                                                name       : 'interview_createdby_name',
                                                flex       : 1,
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, 
                                            {
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Interview PIC',
                                                anchor     : '-5',
                                                name       : 'interview_pic',
                                                flex       : 1,
                                                listeners  : {
                                                    change: function () {
                                                        me.down('[name=interview_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Interview plan date',
                                                anchor: '-5',
                                                name: 'interviewplan_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=interview_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype: 'datefield',
                                                fieldLabel: 'Interview date',
                                                anchor: '-5',
                                                name: 'interview_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=interview_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* MONITORING KPR */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'MONITORING KPR', collapsible: true,
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
                                            padding: '0 0 0 110px',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                anchor: '100%',
                                                fieldLabel: '',
                                                boxLabel: 'Acc KPR',
                                                name: 'is_cekkpr',
                                                inputValue: 1,
                                                uncheckedValue: 0,
                                                hidden: true
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Created By',
                                                anchor     : '-5',
                                                name       : 'kpr_createdby_name',
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
                                                flex       : 1

                                            },
                                            //added by anas 21062021
                                            {
                                                xtype: 'splitter', width: 30,
                                            },
                                            {
                                                xtype      : 'textfield',
                                                fieldLabel : 'No. SPPK',
                                                anchor     : '-5',
                                                name       : 'no_sppk',
                                                flex       : 1,
                                                maskRe     : /[A-Za-z0-9\.\/\-\,]/,
                                            }
                                            //end added by anas
                                            ]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype        : 'datefield',
                                                    fieldLabel   : 'ACC Date',
                                                    anchor       : '-5',
                                                    name         : 'kpr_acc_date',
                                                    flex         : 1,
                                                    editable     : false,
                                                    format       : 'd-m-Y',
                                                    altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat : 'Y-m-d H:i:s.u',
                                                    listeners    : {
                                                        change: function () {
                                                            me.down('[name=kpr_createdby_name]').setValue(apps.loginname);
                                                        }
                                                    }
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                }, 
                                                {
                                                    xtype           : 'xnumericfieldEST',
                                                    fieldLabel      : 'KPR Tenor (Month)',
                                                    anchor          : '-5',
                                                    name            : 'kpr_tenor',
                                                    flex            : 1,
                                                    value           : 0,
                                                    enableKeyEvents : true,
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
                                                fieldLabel: 'KPR Realisation amount',
                                                anchor: '-5',
                                                name: 'kpr_realisation',
                                                //currencyFormat: true,
                                                flex: 1,
                                                //allowBlank: false,
                                                readOnly: true,
                                                maskRe: /[0-9\.]/,
                                                value: 0.00,
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                currencyFormat: true,
                                                enableKeyEvents: true,
                                                /*listeners: {
                                                    change: function(){ 
                                                        me.down('[name=kpr_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }*/
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype: 'textfield',
                                                fieldLabel: 'KPR Interest (%)',
                                                anchor: '-5',
                                                name: 'kpr_interest',
                                                flex: 1,
                                                //allowBlank: false,
                                                maskRe: /[0-9\.]/,
                                                value: 0.00,
                                                currencyFormat: true,
                                                enableKeyEvents: true,
                                                decimalPrecision:2,
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                listeners: {
                                                    change: function(el){ 
                                                        if(el.value >= 100){
                                                            el.setValue(100);
                                                        }else if(el.value < 0){
                                                            el.setValue(0);
                                                        }
                                                    }
                                                }
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'KPR Cicilan',
                                                anchor: '-5',
                                                name: 'kpr_cicilan',
                                                //currencyFormat: true,
                                                //allowBlank: false,
                                                maskRe: /[0-9\.]/,
                                                value: 0.00,
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                currencyFormat: true,
                                                enableKeyEvents: true,
                                                /*listeners: {
                                                    change: function(){ 
                                                        me.down('[name=kpr_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }*/
                                                flex: 1
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Nama Debitur',
                                                anchor     : '-5',
                                                name       : 'debitur_name',
                                                flex       : 1
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Admin Fee KPR',
                                                    anchor: '-5',
                                                    name: 'admin_fee_kpr',
                                                    maskRe: /[0-9\.]/,
                                                    value: 0.00,
                                                    currencyFormat: true,
                                                    enableKeyEvents: true
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    anchor: '100%',
                                                    fieldLabel: '',
                                                    boxLabel: 'Cair Fee KPR',
                                                    name: 'is_cair_fee_kpr',
                                                    inputValue: 1,
                                                    uncheckedValue: 0
                                                }
                                            ]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Cair Fee KPR',
                                                    anchor: '-5',
                                                    name: 'tanggal_cair_fee_kpr',
                                                    editable : false,
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                },

                                            ]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                xtype      : 'xnotefieldEST',
                                                fieldLabel : 'Note Fee KPR',
                                                anchor     : '-5',
                                                name       : 'notes_fee_kpr',
                                                flex       : 1
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* BUYBACK */
                // added by rico 12072023
                {
                    xtype: 'panel', bodyPadding: 10, title: 'BUYBACK', collapsible: true,
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
                                            padding: '10px 0 10px 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'collectorcombobox',
                                                    itemId: 'fd_collectorcb',
                                                    fieldLabel: 'Collector',
                                                    anchor: '-5',
                                                    name: 'collector_buyback_id',
                                                    flex: 1,
                                                    forceSelection:true,
                                                    listeners: {
                                                        beforequery: function (record) {
                                                            record.query = new RegExp(record.query, 'i');
                                                            record.forceAll = true;
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'splitter', width: 20,
                                                },
                                                {
                                                    xtype      : 'textfield',
                                                    fieldLabel : 'Collector Phone',
                                                    name       : 'collector_phone',
                                                    flex       : 1,
                                                    maskRe     : /[0-9\-\/]/,
                                                    anchor     : '-5',
                                                },
                                                {
                                                    xtype: 'splitter', width: 5,
                                                },
                                                {
                                                    xtype : 'label',
                                                    text  : ''
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 65,
                                            width: '100%',
                                            title: 'Konfirmasi Tunggakan 1',
                                            items: [
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '0px 0 0 0',
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Nomor',
                                                            width:225,
                                                            labelWidth:50,
                                                            name: 'nomor_konfirmasi_tunggakan_bank',
                                                            listeners:{
                                                                change:function(){
                                                                    me.down("#tunggakan_2").show();
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Tanggal',
                                                            name: 'tanggal_konfirmasi_tunggakan',
                                                            labelWidth:50,
                                                            width:175,
                                                            editable : false,
                                                            format: 'd-m-Y',
                                                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                            submitFormat: 'Y-m-d',
                                                            listeners:{
                                                                change:function(){
                                                                    me.down("#tunggakan_2").show();
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Lama Tunggakan',
                                                            anchor: '-5',
                                                            labelWidth:100,
                                                            width:130,
                                                            name: 'lama_tunggakan_konfirmasi_tunggakan',
                                                            maskRe: /[0-9]/,
                                                            listeners:{
                                                                change:function(){
                                                                    var val = me.down("[name=lama_tunggakan_konfirmasi_tunggakan]").getValue();

                                                                    if(parseInt(val) > 0){
                                                                        me.down("#tunggakan_2").show();
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 5,
                                                        },
                                                        {
                                                            xtype : 'label',
                                                            text  : 'Kali',
                                                            style: 'height: 25px;line-height: 25px;vertical-align: center;'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 65,
                                            width: '100%',
                                            title: 'Konfirmasi Tunggakan 2',
                                            hidden:true,
                                            itemId:"tunggakan_2",
                                            items: [
                                                {
                                                    padding: '00px 0 0 0',
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Nomor',
                                                            anchor: '-5',
                                                            width:225,
                                                            labelWidth:50,
                                                            name: 'nomor_konfirmasi_tunggakan_bank_2',
                                                            listeners:{
                                                                change:function(){
                                                                    me.down("#tunggakan_3").show();
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Tanggal',
                                                            anchor: '-5',
                                                            name: 'tanggal_konfirmasi_tunggakan_2',
                                                            labelWidth:50,
                                                            width:175,
                                                            editable : false,
                                                            format: 'd-m-Y',
                                                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                            submitFormat: 'Y-m-d',
                                                            listeners:{
                                                                change:function(){
                                                                    me.down("#tunggakan_3").show();
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Lama Tunggakan',
                                                            anchor: '-5',
                                                            labelWidth:100,
                                                            width:130,
                                                            name: 'lama_tunggakan_konfirmasi_tunggakan_2',
                                                            maskRe: /[0-9]/,
                                                            listeners:{
                                                                change:function(){
                                                                    var val = me.down("[name=lama_tunggakan_konfirmasi_tunggakan_2]").getValue();
                                                                    
                                                                    if(parseInt(val) > 0){
                                                                        me.down("#tunggakan_3").show();
                                                                    }

                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 5,
                                                        },
                                                        {
                                                            xtype : 'label',
                                                            text  : 'Kali',
                                                            style: 'height: 25px;line-height: 25px;vertical-align: center;'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 65,
                                            width: '100%',
                                            title: 'Konfirmasi Tunggakan 3',
                                            hidden:true,
                                            itemId:"tunggakan_3",
                                            items: [
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '00px 0 0 0',
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Nomor',
                                                            anchor: '-5',
                                                            width:225,
                                                            labelWidth:50,
                                                            name: 'nomor_konfirmasi_tunggakan_bank_3',
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Tanggal',
                                                            anchor: '-5',
                                                            name: 'tanggal_konfirmasi_tunggakan_3',
                                                            labelWidth:50,
                                                            width:175,
                                                            editable : false,
                                                            format: 'd-m-Y',
                                                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                            submitFormat: 'Y-m-d',
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Lama Tunggakan',
                                                            anchor: '-5',
                                                            labelWidth:100,
                                                            width:130,
                                                            name: 'lama_tunggakan_konfirmasi_tunggakan_3',
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 5,
                                                        },
                                                        {
                                                            xtype : 'label',
                                                            text  : 'Kali',
                                                            style: 'height: 25px;line-height: 25px;vertical-align: center;'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: '0px 10px 10px 10px',
                                            width: '100%',
                                            title: 'Buyback',
                                            items: [
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Nomor',
                                                            anchor: '-5',
                                                            width:225,
                                                            labelWidth:50,
                                                            name: 'nomor_surat_pemberitahuan_buyback_bank'
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Tanggal',
                                                            anchor: '-5',
                                                            name: 'tanggal_surat_pemberitahuan_buyback',
                                                            labelWidth:50,
                                                            width:175,
                                                            editable : false,
                                                            format: 'd-m-Y',
                                                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                            submitFormat: 'Y-m-d'
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Lama Tunggakan',
                                                            anchor: '-5',
                                                            labelWidth:100,
                                                            width:130,
                                                            name: 'lama_tunggakan_surat_pemberitahuan_buyback',
                                                            maskRe: /[0-9]/,
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 5,
                                                        },
                                                        {
                                                            xtype : 'label',
                                                            text  : 'Kali',
                                                            style: 'height: 25px;line-height: 25px;vertical-align: center;'
                                                        },
                                                    ]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'PIC Bank',
                                                            anchor: '-5',
                                                            name: 'nama_pic_bank',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'PIC Bank Email',
                                                            anchor: '-5',
                                                            name: 'email_pic_bank',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 5,
                                                        },
                                                        {
                                                            xtype : 'label',
                                                            text  : ''
                                                        },
                                                    ]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    items: [
                                                        {
                                                            xtype      : 'textfield',
                                                            fieldLabel : 'PIC Bank Phone',
                                                            name       : 'phone_pic_bank',
                                                            maskRe     : /[0-9\-\/]/,
                                                            flex       : 1,
                                                            anchor     : '-5'
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 5,
                                                        },
                                                        {
                                                            xtype : 'label',
                                                            text  : ''
                                                        },
                                                    ]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '20px 0 0 0',
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    items: [
                                                        {
                                                            xtype      : 'xaddressfieldEST',
                                                            fieldLabel : 'Alamat Bank',
                                                            anchor     : '-5',
                                                            name       : 'alamat_bank',
                                                            flex       : 1
                                                        },
                                                        {
                                                            xtype: 'splitter', width: 5,
                                                        },
                                                        {
                                                            xtype : 'label',
                                                            text  : ''
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* REJECT / APPROVE */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'REJECT / APPROVE', collapsible: true,
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
                                                fieldLabel: 'Created By',
                                                anchor: '-5',
                                                name: 'reject_createdby_name',
                                                readOnly: true,
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Rejected date',
                                                anchor: '-5',
                                                name: 'rejected_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=reject_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype: 'datefield',
                                                fieldLabel: 'Next process date',
                                                anchor: '-5',
                                                name: 'nextprocess_date',
                                                flex: 1,
                                                editable : false,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=reject_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* AKAD KREDIT */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'AKAD KREDIT', collapsible: true,
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
                                            padding: '0 0 0 110px',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                anchor: '100%',
                                                fieldLabel: '',
                                                boxLabel: 'Check Akad',
                                                name: 'is_cekakad',
                                                inputValue: 1,
                                                uncheckedValue: 0,
                                                hidden: true
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Created By',
                                                anchor     : '-5',
                                                name       : 'akad_createdby_name',
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Akad plan date',
                                                anchor: '-5',
                                                name: 'akadplan_date',
                                                flex: 1,
                                                editable : false,
                                                readOnly: true,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=akad_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }, {
                                                xtype: 'splitter', width: 20,
                                            }, {
                                                xtype: 'datefield',
                                                fieldLabel: 'Akad date',
                                                anchor: '-5',
                                                name: 'akad_date',
                                                flex: 1,
                                                editable : false,
                                                readOnly: true,
                                                //allowBlank: false,
                                                //value: new Date(),
                                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                format: 'd-m-Y',
                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                listeners: {
                                                    change: function () {
                                                        me.down('[name=akad_createdby_name]').setValue(apps.loginname);
                                                    }
                                                }
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* AKAD CONFIRMATION */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'AKAD CONFIRMATION', collapsible: true,
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
                                                fieldLabel: 'Pembayaran Pajak Rp. :',
                                                labelWidth: 135,
                                                anchor: '-5',
                                                name: 'pajak_amount',
                                                maskRe: /[0-9\.]/,
                                                //value: 0.00,
                                                currencyFormat: true
                                            }, {
                                                xtype: 'splitter', width: 10,
                                            }, {
                                                xtype: 'checkboxfield',
                                                fieldLabel: '',
                                                itemId: 'is_bayarpajak',
                                                name: 'is_bayarpajak',
                                                inputValue: '1',
                                                uncheckedValue: '0',
                                                listeners: {
                                                    change: function () {
                                                        var txt = me.down('[name=pajak_amount]');
                                                        if (this.checked) {
                                                            txt.allowBlank = false;
                                                        } else {
                                                            txt.allowBlank = true;
                                                        }
                                                    }
                                                }
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'admincollectionbankgridakad',
                                                width: '100%',
                                                itemId: 'MyAkadConfirmationGrid'
                                            }]
                                        },
                                        {
                                            xtype: 'splitter', height: 10,
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                xtype      : 'xnotefieldEST',
                                                fieldLabel : 'Note',
                                                anchor     : '-5',
                                                name       : 'note',
                                                flex       : 1,
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});