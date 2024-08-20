Ext.define('Erems.view.aktappjb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.aktappjbformdata',
    requires: ['Erems.library.template.component.Clustercombobox', 'Erems.library.template.component.Notariscombobox'],
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
    initComponent: function() {
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
                    itemId: 'aktappjb_id',
                    name: 'aktappjb_id'
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
                    itemId: 'fdms_unit_electricity',
                    name: 'unit_electricity'
                },
                {xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    items: [
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'PT name',
                                    anchor: '-5',
                                    name: 'unit_pt_name',
                                    flex: 1,
                                    readOnly: true,
                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
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
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
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
                                                }, {
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
                                                {xtype: 'label', text: '', flex: 2}]
                                        }
                                    ]
                                },
                                {xtype: 'splitter', width: 30},
                                {
                                    xtype: 'panel', flex: 7,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
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
                                                    name: 'unit_productcategory',
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
                                                    name: 'unit_type_name',
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
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Long',
                                                    anchor: '-5',
                                                    name: 'unit_long',
                                                    flex: 6,
                                                    readOnly: true,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
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
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Width',
                                                    anchor: '-5',
                                                    name: 'unit_width',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
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
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
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
                                                {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /* PURCHASE LETTER INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER INFORMATION', collapsible: true,
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
                                                    fieldLabel: 'Purchase Letter No.',
                                                    anchor: '-5',
                                                    name: 'purchaseletter_no',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Purchase Letter Date',
                                                    anchor: '-5',
                                                    name: 'purchase_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
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
                                                    fieldLabel: 'Customer Name',
                                                    anchor: '-5',
                                                    name: 'customer_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype            : 'xnumericfieldEST',
                                                    fieldLabel       : 'KTP Number',
                                                    anchor           : '-5',
                                                    name             : 'customer_ktp',
                                                    flex             : 1,
                                                    allowBlank       : false,
                                                    maxLength        : 16,
                                                    minLength        : 1
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    mask: '##.###.###.#-###.###',
                                                    fieldLabel: 'NPWP',
                                                    anchor: '-5',
                                                    name: 'customer_npwp',
                                                    flex: 1,
                                                    maskRe: /[0-9-.]/,
                                                    allowBlank: false
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Akta PPJB Name',
                                                    anchor: '-5',
                                                    name: 'aktappjb_name',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    enforceMaxLength:true,
                                                    minLength:3,
                                                    maxLength:50
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Akta PPJB Address',
                                                    anchor     : '-5',
                                                    name       : 'aktappjb_address',
                                                    flex       : 1,
                                                    allowBlank : false,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Pendanaan',
                                                    anchor: '-5',
                                                    name: 'aktappjb_pendanaan',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                /* PPJB INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'PPJB INFORMATION', collapsible: true,
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
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype            : 'xnumericfieldEST',
                                                    fieldLabel       : 'Akta PPJB Number',
                                                    anchor           : '-5',
                                                    name             : 'aktappjb_no',
                                                    flex             : 1,
                                                    allowBlank       : false,
                                                    enforceMaxLength : true,
                                                    minLength        : 1,
                                                    maxLength        : 15
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                }, 
                                                {
                                                    xtype            : 'datefield',
                                                    fieldLabel       : 'Akta PPJB Date',
                                                    anchor           : '-5',
                                                    name             : 'aktappjb_date',
                                                    flex             : 1,
                                                    allowBlank       : false,
                                                    value            : new Date(),
                                                    format           : 'd-m-Y',
                                                    altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat     : 'Y-m-d H:i:s.u',
                                                    maskRe           :/[0-9-]/,
                                                    enforceMaxLength :true,
                                                    maxLength        :10,
                                                    listeners        : {
                                                        blur : function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'notariscombobox',
                                                    fieldLabel: 'Notaris',
                                                    anchor: '-5',
                                                    allowBlank: false,
                                                    name: 'notaris_id',
                                                    itemId: 'fd_notaris_id',
                                                    forceSelection:true,
                                                    listeners:{
                                                        beforequery: function(record){
                                                            record.query = new RegExp(record.query, 'i');
                                                            record.forceAll = true;
                                                        }
                                                    },
                                                    flex: 1
                                                },
                                                {xtype: 'splitter', width: 20},
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Pelunasan Date',
                                                    anchor: '-5',
                                                    name: 'pelunasan_date',
                                                    flex: 1,
                                                    // allowBlank: false,
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
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
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Installment Duration (Month)',
                                                    anchor: '-5',
                                                    name: 'duration',
                                                    flex: 1,
                                                    value: 0,
                                                    minValue: 0,
                                                    //readOnly: true,
                                                    // allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Sign Date',
                                                    anchor: '-5',
                                                    name: 'sign_date',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    value: new Date(),
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
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
                                                    xtype: 'datefield',
                                                    fieldLabel: 'First Installment Date',
                                                    anchor: '-5',
                                                    name: 'firstinstallment_date',
                                                    flex: 1,
                                                    //readOnly: true,
                                                    // allowBlank: false,
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Hand Over Date',
                                                    anchor: '-5',
                                                    name: 'handover_date',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    value: new Date(),
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
                                                }]
                                        },
                                        {
                                            xtype: 'splitter', height: 20,
                                        },
                                        {
                                            xtype: 'fieldset',
                                            bodyPadding: 10,
                                            width: '100%',
                                            title: 'Rencana Serah Terima',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 30,
                                                    bodyStyle: 'background:none;border:0;',
                                                    anchor: '100%',
                                                    layout: {
                                                        type: 'column'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            anchor: '100%',
                                                            boxLabel: 'Tanggal rencana serah terima rumah / kavling',
                                                            itemId: 'rencana_st_tgl',
                                                            name: 'radio_st_group',
                                                            labelWidth: 275,
                                                            inputValue: 'radio_tgl_st',
                                                            checked: true,
                                                            handler: function(field, value) {
                                                                if (value) {
                                                                    me.down('[name=serahterimaplan_month]').setDisabled(true);
                                                                    me.down('[name=serahterimaplan_date]').setDisabled(false);
                                                                } else {
                                                                    me.down('[name=serahterimaplan_month]').setDisabled(false);
                                                                    me.down('[name=serahterimaplan_date]').setDisabled(true);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: ' ',
                                                            labelWidth: 10,
                                                            name: 'serahterimaplan_date',
                                                            itemId: 'serahterimaplan_date',
                                                            value: dateOneYear(),
                                                            format: 'd-m-Y',
                                                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                            submitFormat: 'Y-m-d H:i:s.u',
                                                            maskRe:/[0-9-]/,
                                                            enforceMaxLength:true,
                                                            maxLength:10,
                                                            listeners: {
                                                                blur: function(field) {
                                                                    var today = new Date();
                                                                    if(!field.isValid()) {
                                                                        Ext.Msg.alert('Info', 'Date is invalid!');
                                                                        field.setValue(today);
                                                                    }
                                                                }
                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 30,
                                                    bodyStyle: 'background:none;border:0;',
                                                    anchor: '100%',
                                                    layout: {
                                                        type: 'column'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            anchor: '100%',
                                                            boxLabel: 'Lama serah terima rumah / kavling (Bulan)',
                                                            itemId: 'rencana_st_bln',
                                                            name: 'radio_st_group',
                                                            labelWidth: 275,
                                                            inputValue: 'radio_bln_st',
                                                        },
                                                        {
                                                            xtype: 'numberfield',
                                                            fieldLabel: ' ',
                                                            labelWidth: 10,
                                                            value: 6,
                                                            name: 'serahterimaplan_month',
                                                            itemId: 'serahterimaplan_month'
                                                        }
                                                    ]
                                                }
                                            ]
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