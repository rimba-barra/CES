Ext.define('Cashier.view.kasbondeptposting.FormCashback', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.kasbondeptpostingformcashback',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    height       : 200,
    bodyBorder   : true,
    bodyPadding  : 10,
    uniquename   : "_fdkasbondeptposting",
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
                    id   : 'project_id' + me.uniquename,
                    name : 'project_id',
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
                    id   : 'fixed_coa' + me.uniquename,
                    name : 'fixed_coa',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'coa_id' + me.uniquename,
                    name : 'coa_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'prefix_id' + me.uniquename,
                    name : 'prefix_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'adads' + me.uniquename,
                    name : 'cheque_id',
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
                            xtype           : 'xmoneyfield',
                            fieldLabel      : 'Cashback',
                            itemId          : 'fd_' + me.uniquename,
                            id              : 'amount_kembali' + me.uniquename,
                            name            : 'amount_kembali',
                            emptyText       : 'Auto Value',
                            width           : 250,
                            readOnly        : true,
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
                                    xtype           : 'voucherprefixcashbackcombobox',
                                    fieldLabel      : 'Prefix',
                                    itemId          : 'fd_voucherprefix_id' + me.uniquename,
                                    id              : 'voucherprefix_id' + me.uniquename,
                                    name            : 'voucherprefix_id',
                                    emptyText       : '',
                                    width           : 250,
                                    readOnly        : false,
                                    allowBlank      : false,
                                    enforceMaxLength: true,
                                    enableKeyEvents : true,
                                    rowdata         : null,
                                    hidden          : false,
                                    tpl             : Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
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
                            xtype           : 'datefield',
                            fieldLabel      : 'Cashback Date',
                            itemId          : 'fc_cashback_date' + me.uniquename,
                            id              : 'eff_date' + me.uniquename,
                            name            : 'eff_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            editable        : false
                        },
                      
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
                                        iconCls: 'icon-approve',
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

