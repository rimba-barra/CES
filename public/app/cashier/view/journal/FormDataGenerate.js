Ext.define('Cashier.view.journal.FormDataGenerate', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.journalformdatagenerate',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    closable: false,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    deletedsubRows: [],
    deletedLocalstoreSubRows: [],
    editedRow: -1,
    id: 'formdatageneratejournalID',
    deletedRowsWithoutID: 0,
    rowData: null,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
//                {
//                    xtype: 'hiddenfield',
//                    name: 'project_project_id'
//                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'pt_pt_id'
//                },
                {
                    xtype: 'hiddenfield',
                    name: 'unit_unit_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_customer_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'payment_payment_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucher_voucher_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'payment_denda'
                },
                {
                    xtype: 'splitter',
                    width: '650'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 400,

                    items: [
                       {
                                        xtype: 'projectcombobox',
                                        fieldLabel:'Project',
                                        emptyText: 'Select Project',
                                        name: 'project_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="250px" >',
                                            '<tr class="x-grid-row">',
                                              
                                                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                         '</table>'
                                     ),    
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
                    width: 400,

                    items: [
                       
                          {
                                        xtype: 'ptprojectcombobox',
                                        fieldLabel:'PT',
                                        emptyText: 'Select PT',
                                        name: 'pt_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    },
                       
                       
                    ]
                },
                {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Voucher Date',
                                    emptyText: 'From Date',
                                    name: 'vdate_from',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'Until Date',
                                    name: 'vdate_until',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
              
               
              
               
               
            ],
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
                        width: 75, iconCls: 'icon-save',
                        text: 'Submit'
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

