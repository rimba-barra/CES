Ext.define('Erems.library.template.view.FdBillingInformationfpk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.templateviewfdbillinginformationfpk',
    itemId: 'TemplateViewFdBillingInformationfpk',
    bodyPadding: 10,
    requires:['Erems.library.template.component.Movereasoncombobox'],
    title: 'BILLING INFORMATION',
    collapsible: true,
    width: '100%',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    layout: 'hbox', bodyStyle: 'border:0px',
                    items: [
                        {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                            items: [
                                {
                                    //  bodyPadding: 10,
                                    padding: '10px 0 0 0',
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'BANK KPR',
                                            name: 'bank_bank_id',
                                            enableKeyEvents: true,
                                     
                                            flex: 1
                                        }, {
                                            xtype: 'splitter', width: 5
                                        }, {
                                            xtype: 'bankcombobox',
                                            fieldLabel: '',
                                            readOnly: true,
                                            itemId: 'bank_cb',
                                            name: 'bank_id',
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
                                            xtype: 'formulacombobox',
                                            fieldLabel: 'Billing Rules',
                                            readOnly: true,
                                            name: 'formula',
                                            itemId:'billingrules_id',
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
                                            xtype: 'textfield',
                                            fieldLabel: 'Tanda Jadi',
                                            name: 'j_tanda_jadi',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00
                                        }, {
                                            xtype: 'label', text: ' @ x ', width: 40, padding: '0 5px'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            name: 'n_tanda_jadi',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00

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
                                            fieldLabel: 'Uang muka',
                                            name: 'j_uang_muka',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9]/,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00

                                        }, {
                                            xtype: 'label', text: ' @ x ', width: 40, padding: '0 5px'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            name: 'n_uang_muka',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00

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
                                            fieldLabel: 'Sisa',
                                            name: 'j_sisa',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9]/,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00

                                        }, {
                                            xtype: 'label', text: ' @ x ', width: 40, padding: '0 5px'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            name: 'n_sisa',
                                            flex: 1,
                                            readOnly: true,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00

                                        }]
                                },
                                {
                                    //  bodyPadding: 10,
                                    padding: '10px 0 0 0',
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'checkboxfield',
                                            fieldLabel: '&nbsp;',
                                            name: 'company',
                                            flex: 1,
                                        }, {
                                            xtype: 'label',
                                            text: 'APPROVAL',
                                            flex: 2,
                                            padding: '0 0 0 10px'


                                        }]
                                }

                            ]
                        }, {xtype: 'splitter', width: 20},
                        {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                            items: [
                                {
                                    //  bodyPadding: 10,
                                    padding: '10px 0 0 0',
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Rencana Serah Terima',
                                            name: 'rencana_serahterima',
                                            maskRe: /[0-9]/,
                                            labelWidth: 200,
                                            value: 0,
                                            flex: 6,
                                        }, {
                                            xtype: 'label',
                                            text: 'bulan',
                                            flex: 1,
                                            padding: '0 0 0 10px'


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
                                            labelWidth: 200,
                                            fieldLabel: 'Serah Terima Planning Date',
                                            name: 'rencana_serahterima_date',
                                            format: 'd-m-Y',
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
                                            xtype: 'collectorcombobox',
                                            fieldLabel: 'Collector',
                                            name: 'collector_id',
                                            flex: 1,
                                            itemId: 'collector_cb'
                                        }]
                                }
                            ]
                        }

                    ]
                },
                {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    items: [{
                            xtype: 'purchaseletterschedulegrid',
                            width: '100%',
                            itemId: 'MyScheduleGrid'

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
                            fieldLabel: 'Alasan',
                            name: 'movereason_code',
                            enableKeyEvents: true,
                            flex: 2
                        }, {
                            xtype: 'splitter', width: 5
                        }, {
                            xtype: 'movereasoncombobox',
                            name: 'movereason_id',
                            itemId:'movereason_cb',
                            fieldLabel:'',
                            flex: 2
                        },{xtype:'label',text:'',flex:4}
                        ]
                },
                {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    items: [{
                            xtype: 'textareafield',
                            fieldLabel: 'Notes',
                            name: 'notes',
                            flex: 1,
                        }]
                }
            ]
        });
        
        

        me.callParent(arguments);
    }

});