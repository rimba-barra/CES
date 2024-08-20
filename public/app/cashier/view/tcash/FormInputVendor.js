Ext.define('Cashier.view.tcash.FormInputVendor', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tcashforminputvendor',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 380,
    bodyBorder: true,
    bodyPadding: 10,
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
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id_rrrr',
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_vendor_id_rrrr',
                    name: 'kasbank_vendor_id',
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
                            xtype: 'vendorcombobox',
                            fieldLabel: 'Vendor Name',
                            itemId: 'fd_vendor_id',
                            id: 'vendor_id_e',
                            name: 'vendor_id',
                            emptyText: 'Select Vendor',
                            width: 300,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
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
                            fieldLabel: 'Invoice No.',
                            itemId: 'fd_invoice',
                            id: 'invoice_e',
                            name: 'invoice',
                            emptyText: 'Input invoice',
                            width: 500,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PO No.',
                            itemId: 'fd_po',
                            id: 'po_e',
                            name: 'po',
                            emptyText: 'Input PO No.',
                            width: 500,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'DO No.',
                            itemId: 'fd_do',
                            id: 'do_e',
                            name: 'do',
                            emptyText: 'Input DO No.',
                            width: 500,
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
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                         {
                            xtype: 'xmoneyfield',                         
                            anchor: '100%',
                            itemId: 'fd_amount_wsfgh',
                            id: 'amount_eeeee',
                            name: 'amount',
                            fieldLabel: 'Invoice Amount Rp.',   
                            emptyText: 'Auto Value',
                            value: 0, 
                            width: 240,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,                            
                            enableKeyEvents: true,
                            rowdata: null
                        },    
                        {
                            xtype: 'xmoneyfield',                         
                            anchor: '100%',
                            itemId: 'fd_ppn_waqsd',
                            id: 'ppn_eeeeee',
                            name: 'ppn',
                            fieldLabel: 'PPN Rp.',   
                            emptyText: 'Manual Input',
                            value: 0, 
                            width: 240,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,                            
                            enableKeyEvents: true,
                            rowdata: null
                        },    
                        {
                            xtype: 'xmoneyfield',                         
                            anchor: '100%',
                            itemId: 'fd_pph_wadfghb',
                            id: 'pph_eeeeee',
                            name: 'pph',
                            fieldLabel: 'PPH Rp.',   
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
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 0 0 105',
                            text: '------------------------------------------------------',
                        },
                        {
                            xtype: 'xmoneyfield',                         
                            anchor: '100%',
                            itemId: 'fd_total_amount_wqaf',
                            id: 'total_amount_e',
                            name: 'total_amount',
                            fieldLabel: 'Total Amount Rp',   
                            emptyText: 'Auto Value',
                            value: 0, 
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: false,                            
                            enableKeyEvents: true,
                            rowdata: null
                        },    
                       
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

