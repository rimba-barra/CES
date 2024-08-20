Ext.define('Cashier.view.kasbondept.FormData', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.kasbondeptformdata',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    height       : 470,
    bodyBorder   : true,
    bodyPadding  : 10,
    uniquename   : "_fdkasbondept",
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
                    id   : 'kasbondept_id' + me.uniquename,
                    name : 'kasbondept_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'kasbon_id' + me.uniquename,
                    name : 'kasbon_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'voucher_id' + me.uniquename,
                    name : 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'kasbank_id' + me.uniquename,
                    name : 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'approvename' + me.uniquename,
                    name : 'approvename',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'status' + me.uniquename,
                    name : 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'projectname' + me.uniquename,
                    name : 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'ptname',
                    name : 'ptname',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'prefixdept' + me.uniquename,
                    name : 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'other_made_by' + me.uniquename,
                    name : 'other_made_by',
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
                            xtype           : 'ptusercombobox',
                            fieldLabel      : 'Pt/Company',
                            itemId          : 'fd_pt_id' + me.uniquename,
                            id              : 'pt_id_b123',
                            name            : 'pt_id',
                            width           : 350,
                            emptyText       : 'Pt / Company',
                            readOnly        : false,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'label',
                            forId           : 'lblstatus' + me.uniquename,
                            text            : 'Status',
                            width           : 100,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text : '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId          : 'fd_lblstatus' + me.uniquename,
                            id              : 'lblstatus__b123',
                            name            : 'lblstatus',
                            width           : 100,
                            allowBlank      : false,
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
                            xtype           : 'departmentcombobox',
                            fieldLabel      : 'Department',
                            itemId          : 'fd_department_id' + me.uniquename,
                            id              : 'department_id' + me.uniquename,
                            name            : 'department_id',
                            width           : 350,
                            emptyText       : 'Department',
                            readOnly        : false,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'CA Date',
                            itemId          : 'fd_voucher_date' + me.uniquename,
                            id              : 'voucher_date' + me.uniquename,
                            name            : 'voucher_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
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
                            xtype     : 'employeehrdcombobox',
                            fieldLabel: 'User for cashbon',
                            itemId    : 'fd_made_by' + me.uniquename,
                            id        : 'made_by' + me.uniquename,
                            name      : 'made_by',
                            width     : 350,
                            emptyText : 'Select user for cashbon',
                                  //matchFieldWidth: false,
                            readOnly        : false,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            forceSelection  : true,
                            typeAhead       : false,
                            listeners       : {
                                
                                keyup: function(field){
                                    var c            = 0;
                                    var searchString = field.getValue();

                                       if (searchString) {

                                       this.store.filterBy(function (record, id) {
                                        if( record.get('employee_name').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        
                                        });
                                       }

                                },
                                buffer: 300,
                            },
                        },
                         {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'textfield',
                            fieldLabel      : 'CA No.',
                            itemId          : 'fd_voucher_no' + me.uniquename,
                            id              : 'voucher_no' + me.uniquename,
                            name            : 'voucher_no',
                            emptyText       : 'Auto Value',
                            width           : 250,
                            readOnly        : true,
                            allowBlank      : false,
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
                            xtype     : 'employeehodcombobox',
                            fieldLabel: 'Head of Dept.',
                            itemId    : 'fd_approveby_id' + me.uniquename,
                            id        : 'approveby_id' + me.uniquename,
                            name      : 'approveby_id',
                            width     : 350,
                            emptyText : 'Head of Dept.',
                                 // matchFieldWidth: false,
                            readOnly  : false,
                            allowBlank: false,
                                  //allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            forceSelection  : true,
                            typeAhead       : false,
                            listeners       : {
                                
                                keyup: function(field){
                                    var c            = 0;
                                    var searchString = field.getValue();

                                       if (searchString) {

                                       this.store.filterBy(function (record, id) {
                                        if( record.get('employee_name').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        
                                        });
                                       }

                                },
                                buffer: 300,
                            },
                        },
                         {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'textfield',
                            fieldLabel      : 'No. PO',
                            itemId          : 'fd_po_no' + me.uniquename,
                            id              : 'po_no' + me.uniquename,
                            name            : 'po_no',
                            width           : 250,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Cashback Date',
                            itemId          : 'fd_cashbackon' + me.uniquename,
                            id              : 'cashbackon' + me.uniquename,
                            name            : 'cashbackon',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            hidden          : true,
                        },
                    {
                            xtype           : 'datefield',
                            fieldLabel      : 'Uncashback Date',
                            itemId          : 'fd_uncashbackon' + me.uniquename,
                            id              : 'uncashbackon' + me.uniquename,
                            name            : 'uncashbackon',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            hidden          : true,
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
                            xtype           : 'groupcashbontypecombobox',
                            fieldLabel      : 'Group Cashbon Type',
                            itemId          : 'fd_tipekasbondept_id' + me.uniquename,
                            id              : 'tipekasbondept_id' + me.uniquename,
                            name            : 'tipekasbondept_id',
                            anchor          : '50%',
                            width           : 350,
                            emptyText       : 'Select Group Cashbon Type',
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            forceSelection  : false,
                        },    
                        {
                           xtype: 'splitter',
                           width: '80'
                       },
                       {
                           xtype           : 'kasbonreffcombobox',
                           fieldLabel      : 'Reference Cashbon',
                           itemId          : 'fd_kasbondept_reference_id' + me.uniquename,
                           id              : 'kasbondept_reference_id' + me.uniquename,
                           name            : 'kasbondept_reference_id',
                           width           : 250,
                           emptyText       : 'Ketik / Cari Cashbon...',
                           allowBlank      : true,
                           enforceMaxLength: true,
                           enableKeyEvents : true,
                           queryMode       : 'remote',
                           minChars        : 1,
                           rowdata         : null,
                           typeAhead       : true,
                           hideTrigger     : true,
                           hidden          : true,
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
                            xtype           : 'currencycombobox',
                            fieldLabel      : 'Currency',
                            itemId          : 'fd_currency_word' + me.uniquename,
                            id              : 'currency_word' + me.uniquename,
                            name            : 'currency_word',
                            anchor          : '50%',
                            width           : 350,
                            emptyText       : 'Select Currency',
                            readOnly        : false,
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
                            xtype     : 'xmoneyfield',
                            minValue  : 0,
                            itemId    : 'fs_amount' + me.uniquename,
                            name      : 'amount',
                            id        : 'amount' + me.uniquename,
                            fieldLabel: 'Amount',
                            emptyText : 'Manual Input',
                            width     : 350,
                                  // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : false,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 30,
                            fieldStyle       : 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            fieldLabel      : 'Cashback',
                            itemId          : 'fd_' + me.uniquename,
                            id              : 'amount_kembali' + me.uniquename,
                            name            : 'amount_kembali',
                            emptyText       : 'Auto Value',
                            width           : 250,
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
                            xtype     : 'xmoneyfield',
                            minValue  : 0,
                            itemId    : 'fs_amount_bayar' + me.uniquename,
                            name      : 'amount_bayar',
                            id        : 'amount_bayar' + me.uniquename,
                            fieldLabel: 'Amount Paid',
                            emptyText : 'Auto',
                            width     : 350,
                                  // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : false,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 30,
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            fieldLabel      : 'Amount Balance',
                            itemId          : 'fd_' + me.uniquename,
                            id              : 'amount_selisih' + me.uniquename,
                            name            : 'amount_selisih',
                            emptyText       : 'Auto',
                            width           : 250,
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
                            xtype           : 'textareafield',
                            itemId          : 'fdms_description' + me.uniquename,
                            id              : 'description' + me.uniquename,
                            name            : 'description',
                            fieldLabel      : 'Description',
                            fieldStyle      : 'text-transform:uppercase',
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            grow            : true,
                            width           : 750,
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
                            width: '105'
                        },
                        {
                            xtype       : 'button',
                            action      : 'add_notes',
                            itemId      : 'btnAddNotes',
                            margin      : '0 5 0 0',
                            iconCls     : 'icon-new',
                            text        : 'Add Notes',
                            enableToggle: true,
                            pressed     : false,
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
                            xtype           : 'textareafield',
                            itemId          : 'fdms_approval_notes' + me.uniquename,
                            id              : 'approval_notes' + me.uniquename,
                            name            : 'approval_notes',
                            fieldLabel      : 'Notes',
                            fieldStyle      : 'text-transform:uppercase',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            width           : 750,
                            hidden          : true,
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
                            xtype     : 'textfield',
                            itemId    : 'fs_voucher_dept_no' + me.uniquename,
                            name      : 'voucher_dept_no',
                            id        : 'voucher_dept_no' + me.uniquename,
                            fieldLabel: 'Voucher Dept No',
                            emptyText : 'Auto Value',
                            width     : 350,
                                  // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : true,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            fieldStyle       : 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'textfield',
                            fieldLabel      : 'Cashier Voucher No :',
                            itemId          : 'fd_' + me.uniquename,
                            id              : 'cashier_voucher_no' + me.uniquename,
                            name            : 'cashier_voucher_no',
                            emptyText       : 'Auto Value',
                            width           : 250,
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
                            xtype           : 'rewardcombobox',
                            fieldLabel      : 'Reward',
                            itemId          : 'fd_purchaseletter_reward_id' + me.uniquename,
                            id              : 'purchaseletter_reward_id' + me.uniquename,
                            name            : 'purchaseletter_reward_id',
                            width           : 350,
                            emptyText       : 'Ketik / Cari Reward...',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            queryMode       : 'remote',
                            minChars        : 1,
                            rowdata         : null,
                                  // forceSelection: true,
                            typeAhead  : true,
                            hideTrigger: true,
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype    : 'tabpanel',
                            itemId   : 'kasbondepttab',
                            name     : 'kasbondepttab',
                            width    : 750,
                            height   : 200,
                            activeTab: 0,
                            defaults : {layout: 'fit'},
                            items    : [
                                {
                                    title   : 'DETAIL COA',
                                    xtype   : 'kasbondeptgriddetail',
                                    name    : 'gridtabkasbondeptdetail',
                                    id      : 'gridtabkasbondeptdetail',
                                    readOnly: false,
                                },
                                 {
                                    title   : 'ATTACHMENTS',
                                    xtype   : 'kasbondeptgridattachmentdetail',
                                    name    : 'gridtabattachmentdetail',
                                    id      : 'gridtabattachmentdetail',
                                    readOnly: false,
                                          //hidden: false,
                                          //width: 750,
                                          //height: 300,
                                }
                                
                            ],
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
        var x  = [
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
                        layout    : 'vbox',
                        align     : 'right',
                        bodyBorder: false,
                        defaults  : {
                            layout: 'fit'
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
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype            : 'xmoneyfield',
                                        anchor           : '100%',
                                        itemId           : 'fd_totaldetail',
                                        id               : 'totaldetail' + me.uniquename,
                                        name             : 'totaldetail',
                                        fieldLabel       : 'Total Detail',
                                        emptyText        : 'Auto Value',
                                        width            : 240,
                                        value            : 0,
                                        hideTrigger      : true,
                                        keyNavEnabled    : false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength : true,
                                        readOnly         : true,
                                        allowBlank       : false,
                                        enableKeyEvents  : true,
                                        rowdata          : null
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype            : 'xmoneyfield',
                                        anchor           : '100%',
                                        itemId           : 'fd_balance',
                                        id               : 'balance' + me.uniquename,
                                        name             : 'balance',
                                        fieldLabel       : 'Balance',
                                        emptyText        : 'Auto Value',
                                        value            : 0,
                                        width            : 240,
                                        hideTrigger      : true,
                                        keyNavEnabled    : false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength : true,
                                        readOnly         : true,
                                        allowBlank       : false,
                                        enableKeyEvents  : true,
                                        rowdata          : null},
                                ]
                            },
                            {xtype: 'tbspacer', height: 5},
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
                    },
                ]
            }
        ];
        return x;
    }
});

