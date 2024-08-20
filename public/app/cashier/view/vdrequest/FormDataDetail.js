Ext.define('Cashier.view.vdrequest.FormDataDetail', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.vdrequestdetailformdata',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    height       : 500,
    bodyBorder   : true,
    bodyPadding  : 10,
    uniquename   : '_voucherrequestdetail',
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id   : 'hideparam' + me.uniquename,
                    name : 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'statedata',
                    id   : 'statedata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name : 'kelsub_id',
                    id   : 'kelsub_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name : 'voucher_id',
                    id   : 'voucher_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name : 'voucherdetail_id',
                    id   : 'voucherdetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name : 'is_ppnprogresif',
                    id   : 'is_ppnprogresif' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name : 'is_pphprogresif',
                    id   : 'is_pphprogresif' + me.uniquename,
                },
                {
                    xtype     : 'textfield',
                    name      : 'indexdata',
                    id        : 'indexdata' + me.uniquename,
                    fieldLabel: 'Index',
                    width     : 100,
                    readOnly  : true,
                    allowBlank: false,
                },
                {
                    xtype           : 'kasbondepthasapplylocalcombobox',
                    fieldLabel      : 'Kasbon No',
                    itemId          : 'fd_kasbondept_id' + me.uniquename,
                    id              : 'kasbondept_id' + me.uniquename,
                    name            : 'kasbondept_id',
                    anchor          : '50%',
                    width           : 300,
                    emptyText       : 'Select Data',
                    queryMode       : 'local',
                    readOnly        : false,
                    allowBlank      : true,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null
                },
                {
              xtype       : 'coadeptvouchercombobox',
              fieldLabel  : 'Account Code',
              itemId      : 'fd_coa_id' + me.uniquename,
              id          : 'coa_id' + me.uniquename,
              name        : 'coa_id',
              displayField: 'coaname',
              emptyText   : 'Select COA',
              width       : 230,
              allowBlank  : false,
                        //forceSelection: true,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                        //forceSelection:true,
                    typeAhead: false,
                    listeners: {
                                
                                keyup: function(field){
                                    var c            = 0;
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
                                buffer: 300,
                            },
                },
                {
                    xtype           : 'textfield',
                    fieldLabel      : 'Account Name',
                    itemId          : 'fd_coaname' + me.uniquename,
                    id              : 'coaname' + me.uniquename,
                    name            : 'coaname',
                    emptyText       : 'Auto Value',
                    width           : 400,
                    readOnly        : true,
                    allowBlank      : true,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'textfield',
                            fieldLabel      : 'Kel Sub',
                            itemId          : 'fd_kelsub' + me.uniquename,
                            id              : 'kelsub' + me.uniquename,
                            name            : 'kelsub',
                            emptyText       : 'Auto Value',
                            width           : 200,
                            readOnly        : true,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype           : 'textfield',
                            fieldLabel      : '',
                            itemId          : 'fd_kelsubdesc' + me.uniquename,
                            id              : 'kelsubdesc' + me.uniquename,
                            name            : 'kelsubdesc',
                            emptyText       : 'Auto Value',
                            width           : 300,
                            readOnly        : true,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                         {
                            xtype           : 'inoutcombobox',
                            fieldLabel      : 'Data Flow',
                            itemId          : 'fd_dataflow' + me.uniquename,
                            id              : 'dataflow' + me.uniquename,
                            name            : 'dataflow',
                            emptyText       : 'Auto Value',
                            width           : 200,
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype : 'hiddenfield',
                            itemId: 'fd_cashflowtype' + me.uniquename,
                            id    : 'cashflowtype' + me.uniquename,
                            name  : 'cashflowtype',
                            width : 20,
                        },
                        {
                            xtype           : 'cashflowcombobox',
                            fieldLabel      : 'Cash Flow',
                            itemId          : 'fd_cashflow' + me.uniquename,
                            id              : 'cashflow' + me.uniquename,
                            name            : 'setupcashflow_id',
                            emptyText       : 'Auto Value',
                            width           : 300,
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,                            
                            listeners  : {
                                keyup: function (field) {
                                    var c            = 0;
                                    var searchString = field.getValue();
                                    if(searchString == null){
                                        return false;
                                    }
                                    if (searchString.length > 0) {

                                        this.store.filterBy(function (record, id) {
                                            if (record.get('cashflowtype').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('cashflowtype').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('cashflowtype').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }

                                },
                                buffer: 300,
                            },
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype         : 'checkboxfield',
                            fieldLabel    : 'Pajak',
                            name          : 'checkppn',
                            itemId        : 'fd_checkppn' + me.uniquename,
                            id            : 'checkppn' + me.uniquename,
                            boxLabel      : 'PPN',
                            boxLabelCls   : 'x-form-cb-label small',
                            inputValue    : '1',
                            uncheckedValue: '0',
                            checked       : false
                         },
                         {
                            xtype: 'splitter',
                            width: '10',
                         },
                         {
                            xtype           : 'tipepajakcombobox',
                            fieldLabel      : '',
                            itemId          : 'fd_tipepajakdetailppn_id' + me.uniquename,
                            id              : 'tipepajakdetailppn_id' + me.uniquename,
                            name            : 'tipepajakdetailppn_id',
                            emptyText       : 'Tipe PPN',
                            width           : 200,
                            forceSelection  : true,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            readOnly        : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype           : 'tipepajakpersentaseppncombobox',
                            fieldLabel      : '',
                            itemId          : 'fd_persentaseppn' + me.uniquename,
                            id              : 'persentaseppn' + me.uniquename,
                            name            : 'persentaseppn',
                            emptyText       : 'Persentase',
                            width           : 100,
                            forceSelection  : true,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            readOnly        : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype           : 'textfield',
                            fieldLabel      : '',
                            itemId          : 'fd_no_faktur' + me.uniquename,
                            id              : 'no_faktur' + me.uniquename,
                            name            : 'no_faktur',
                            emptyText       : 'No Faktur',
                            width           : 150,
                            readOnly        : true,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            maskRe          : /[0-9\.]/
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'splitter',
                            width: '105',
                         },
                        {
                            xtype         : 'checkboxfield',
                            fieldLabel    : '',
                            name          : 'checkpph',
                            itemId        : 'fd_checkpph' + me.uniquename,
                            id            : 'checkpph' + me.uniquename,
                            boxLabel      : 'PPH',
                            boxLabelCls   : 'x-form-cb-label small',
                            inputValue    : '1',
                            uncheckedValue: '0',
                            checked       : false
                         },
                         {
                            xtype: 'splitter',
                            width: '10',
                         },
                         {
                            xtype           : 'tipepajakpphcombobox',
                            fieldLabel      : '',
                            itemId          : 'fd_tipepajakdetailpph_id' + me.uniquename,
                            id              : 'tipepajakdetailpph_id' + me.uniquename,
                            name            : 'tipepajakdetailpph_id',
                            emptyText       : 'Tipe PPH',
                            width           : 200,
                            readOnly        : false,
                            forceSelection  : true,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            readOnly        : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype           : 'tipepajakpersentasepphcombobox',
                            fieldLabel      : '',
                            itemId          : 'fd_persentasepph' + me.uniquename,
                            id              : 'persentasepph' + me.uniquename,
                            name            : 'persentasepph',
                            emptyText       : 'Persentase',
                            width           : 100,
                            readOnly        : false,
                            forceSelection  : true,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            readOnly        : true,
                            rowdata         : null
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype            : 'xmoneyfield',
                            anchor           : '100%',
                            itemId           : 'fd_amount' + me.uniquename,
                            id               : 'amount' + me.uniquename,
                            name             : 'amount',
                            fieldLabel       : 'Amount',
                            emptyText        : 'Manual Input',
                            value            : 0,
                            width            : 300,
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            enforceMaxLength : true,
                            readOnly         : false,
                            allowBlank       : false,
                            enableKeyEvents  : true,
                            rowdata          : null
                        },
                    ]
                },
                {
                    xtype           : 'textareafield',
                    fieldLabel      : 'Remaks',
                    itemId          : 'fd_remarks' + me.uniquename,
                    id              : 'remarks' + me.uniquename,
                    name            : 'remarks',
                    emptyText       : '',
                    fieldStyle      : 'text-transform:uppercase',
                    width           : 400,
                    grow            : true,
                    readOnly        : false,
                    allowBlank      : true,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null
                },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
    //                 {
    //                    xtype: 'fieldcontainer',
    //                    layout: 'hbox',
    //                   // align: 'right',
    //                    bodyBorder: false,
    //                    width: 750,
    //                    defaults: {
    //                        layout: 'fit'
    //                    },
    //                    items: [
    //                        {
    //                        title: 'DETAIL SUB COA',
    //                        xtype: 'vdrequestgridsubdetail',
    //                        name: 'gridtabsubdetail',
    //                        id: 'gridtabsubdetail',
    //                        readOnly: false,
    //                    },
    //                    ]
    //                },
{
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        
                                {
                                    title   : 'DETAIL SUB COA',
                                    xtype   : 'vdrequestgridsubdetail',
                                    name    : 'gridtabsubdetail',
                                    id      : 'gridtabsubdetail',
                                    readOnly: false,
                                    height  : 300,
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
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                padding: '0 0 0 0',
                layout : {
                    padding: 6,
                    type   : 'hbox',
                },
                items: [
                   
                       
                            
                           
                            {
                                xtype     : 'fieldcontainer',
                                layout    : 'hbox',
                                align     : 'right',
                                bodyBorder: false,
                                defaults  : {
                                    layout: 'fit'
                                },
                                items: [
                                    
                                    {
                                        xtype  : 'button',
                                        action : 'save',
                                        itemId : 'btnSave',
                                        padding: 5,
                                        width  : 75,
                                        iconCls: 'icon-save',
                                        text   : 'Save'
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
                                        xtype  : 'button',
                                        action : 'cancel',
                                        itemId : 'btnCancel',
                                        padding: 5,
                                        width  : 75,
                                        iconCls: 'icon-cancel',
                                        text   : 'Cancel',
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

