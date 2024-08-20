Ext.define('Cashier.view.kasbondept.FormTracking', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kasbondeptformtracking',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 550,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdkasbondept",
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
                    id: 'kasbondept_id' + me.uniquename,
                    name: 'kasbondept_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbon_id' + me.uniquename,
                    name: 'kasbon_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'voucher_id' + me.uniquename,
                    name: 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'approvename' + me.uniquename,
                    name: 'approvename',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'status' + me.uniquename,
                    name: 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'projectname' + me.uniquename,
                    name: 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'ptname',
                    name: 'ptname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefixdept' + me.uniquename,
                    name: 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'other_made_by' + me.uniquename,
                    name: 'other_made_by',
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
                            xtype: 'projectcombobox',
                            fieldLabel: 'Project',
                            itemId: 'fd_projectt_id' + me.uniquename,
                            id: 'projectt_id_b123',
                            name: 'project_id',
                            width: 350,
                            emptyText: 'Project',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                       {
                            xtype: 'ptusercombobox',
                            fieldLabel: 'PT',
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id_b123',
                            name: 'pt_id',
                            width: 350,
                            emptyText: 'Pt / Company',
                            readOnly: false,
                            allowBlank: false,
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
                            xtype: 'textfield',
                            fieldLabel: 'Cashbon No',
                            itemId: 'fd_voucher_no' + me.uniquename,
                            id: 'voucher_no' + me.uniquename,
                            name: 'voucher_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },

                       
                         {
                            xtype: 'splitter',
                            width: '150'
                        },
                        {
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'Cashbon User',
                            itemId: 'fd_made_by' + me.uniquename,
                            id: 'made_by' + me.uniquename,
                            name: 'made_by',
                            width: 350,
                            emptyText: 'Select user for cashbon',
                            //matchFieldWidth: false,
                            readOnly: false,
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
                                        if( record.get('employee_name').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        
                                        });
                                       }

                                },
                                buffer:300,
                            },
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount' + me.uniquename,
                            name: 'amount',
                            id: 'amount' + me.uniquename,
                            fieldLabel: 'Cashbon Amount',
                            emptyText: 'Auto',
                            width: 250,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                           // fieldStyle: 'background-color:#eee;background-image: none;'
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount_bayar' + me.uniquename,
                            name: 'amount_bayar',
                            id: 'amount_bayar' + me.uniquename,
                            fieldLabel: 'Declared Amount',
                            emptyText: 'Auto',
                            width: 250,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                        },
                        {
                            xtype: 'splitter',
                            width: '150'
                        },
                        {
                            xtype: 'xmoneyfield',
                            fieldLabel: 'Cashback Amount',
                            itemId: 'fd_' + me.uniquename,
                            id: 'amount_cashback' + me.uniquename,
                            name: 'amount_cashback',
                            emptyText: 'Auto',
                            width: 250,
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_remainingkasbon' + me.uniquename,
                            name: 'remainingkasbon',
                            id: 'remainingkasbon' + me.uniquename,
                            fieldLabel: 'Remaining Amount',
                            emptyText: 'Auto',
                            width: 250,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                        },
                      
                    ]
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
                            xtype: 'tabpanel',
                            itemId: 'kasbondepttab',
                            name: 'kasbondepttab',
                            width: 950,
                            height: 200,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'DECLARATION VOUCHER',
                                    xtype: 'kasbondeptgriddecvdept',
                                    name: 'gridtabkasbondeptdecvdept',
                                    id: 'gridtabkasbondeptdecvdept',
                                    readOnly: false,
                                },
                                
                            ],
                        }
                    ]
                },
                 {
                            xtype: 'splitter',
                            width: '150'
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
                            xtype: 'tabpanel',
                            itemId: 'kasbondepttab2',
                            name: 'kasbondepttab2',
                            width: 950,
                            height: 200,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'HISTORY TRANSACTION',
                                    xtype: 'kasbondeptgriddetaillog',
                                    name: 'gridtabkasbondeptdetaillog',
                                    id: 'gridtabkasbondeptdetaillog',
                                    readOnly: false,
                                },
                                
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
                        layout: 'vbox',
                        align: 'right',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
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
                                        action: 'cancel',
                                        itemId: 'btnCancel',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-cancel',
                                        text: 'Close',
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

