Ext.define('Cashier.view.kasbondept.FormDataDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kasbondeptdetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 430,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_fdkasbondeptdetail',
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'statedata',
                    id: 'statedata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_id',
                    id: 'kelsub_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbondept_id',
                    id: 'kasbondept_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbondeptdetail_id',
                    id: 'kasbondeptdetail_id' + me.uniquename,
                },
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
                            xtype: 'textfield',
                            name: 'indexdata',
                            id: 'indexdata' + me.uniquename,
                            fieldLabel: 'Index',
                            width: 180,
                            readOnly: true,
                            allowBlank: false,
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Tanggal Pakai',
                            itemId: 'fd_tanggal_pakai' + me.uniquename,
                            id: 'tanggal_pakai' + me.uniquename,
                            name: 'tanggal_pakai',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            value: new Date(),
                        },
                    ]
                },
                {
                    xtype: 'coadeptvouchercomboboxV2',
                    fieldLabel: 'Account Code',
                    itemId: 'fd_coa_id' + me.uniquename,
                    id: 'coa_id' + me.uniquename,
                    name: 'coa_id',
                    displayField: 'coaname',
                    emptyText: 'Select COA',
                    width: 230,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection:false,
                     typeAhead:false,
                    listeners:{
                                
                                keyup: function(field){
                                    var c = 0;
                                       var searchString = field.getValue();

                                       if (searchString) {

                                       this.store.filterBy(function (record, id) {
                                        if( record.get('coaname').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('coa').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('kelsubdesc').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else {
                                            return false;
                                            this.store.clearFilter(true);
                                        }
                                        });
                                       }

                                },
                                buffer:300,
                            },
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Account Name',
                    itemId: 'fd_coaname' + me.uniquename,
                    id: 'coaname' + me.uniquename,
                    name: 'coaname',
                    emptyText: 'Auto Value',
                    width: 400,
                    readOnly: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
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
                            fieldLabel: 'Kel Sub',
                            itemId: 'fd_kelsub' + me.uniquename,
                            id: 'kelsub' + me.uniquename,
                            name: 'kelsub',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_kelsubdesc' + me.uniquename,
                            id: 'kelsubdesc' + me.uniquename,
                            name: 'kelsubdesc',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
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
                            xtype: 'inoutcombobox',
                            fieldLabel: 'Data Flow',
                            itemId: 'fd_dataflow' + me.uniquename,
                            id: 'dataflow' + me.uniquename,
                            name: 'dataflow',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                         {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'cashflowcombobox',
                            fieldLabel: 'Cash Flow',
                            itemId: 'fd_cashflow' + me.uniquename,
                            id: 'cashflow' + me.uniquename,
                            name: 'setupcashflow_id',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_amount' + me.uniquename,
                            id: 'amount' + me.uniquename,
                            name: 'amount',
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Description',
                    itemId: 'fd_description' + me.uniquename,
                    id: 'description' + me.uniquename,
                    name: 'description',
                    fieldStyle: 'text-transform:uppercase',
                    emptyText: '',
                    width: 400,
                    grow: true,
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Catatan',
                    itemId: 'fd_remarks' + me.uniquename,
                    id: 'remarks' + me.uniquename,
                    name: 'remarks',
                    fieldStyle: 'text-transform:uppercase',
                    emptyText: '',
                    width: 400,
                    grow: true,
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                
                 {
                            xtype: 'splitter',
                            width: '20'
                        },
                        
                        {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        
                                {
                                    title: 'DETAIL SUB COA',
                                    xtype: 'kasbondeptgridsubdetail',
                                    name: 'gridtabkasbondeptsubdetail',
                                    id: 'gridtabkasbondeptsubdetail',
                                    readOnly: false,
                                    height:200
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
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                   
                       
                            
                           
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
                                        xtype: 'button',
                                        action: 'save',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-save',
                                        text: 'Save'
                                    },
                                    
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
//                                    {
//                                        xtype: 'button',
//                                        action: 'test',
//                                        itemId: 'btnTest',
//                                        padding: 5,
//                                        width: 75,
//                                        iconCls: 'icon-test',
//                                        text: 'Test'
//                                    },
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
                                ]
                            },
                       
                  
                ]
            }
        ];
        return x;
    }
});

