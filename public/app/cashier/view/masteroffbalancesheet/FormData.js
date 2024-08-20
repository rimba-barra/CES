Ext.define('Cashier.view.masteroffbalancesheet.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masteroffbalancesheetformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'off_balancesheet_id',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '97%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'off_balancesheet_id'
                },
                {
                xtype: 'hiddenfield',
                name: 'project_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'bank_type_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'banktype'
            },
            {
                xtype: 'hiddenfield',
                name: 'sel_pt_id'
            },
            {
                xtype: 'projectptcombobox',
                fieldLabel:'PT',
                emptyText: 'Select PT',
                name: 'pt_id',
                allowBlank: false,
                enableKeyEvents: true,
                margin: '0 0 5 0',
                enforeMaxLength: true,
                forceSelection:true,
            },
            {
                xtype: 'textareafield',
                fieldLabel:'PT',
                emptyText: 'Select PT',
                name: 'pt_id_edit',
                hidden:true,
                height: 40,
                allowBlank: true,
                enableKeyEvents: true,
                margin: '0 0 5 0',
                enforeMaxLength: true,
                forceSelection:true,
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Period',
                allowBlank: false,
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '',
                    emptyText: 'From',
                    name: 'date_from',
                    width: 100,
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
                    emptyText: 'Until',
                    name: 'date_until',
                    width: 100,
                    allowBlank: false,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                }
                ]
            },
            {
                xtype: 'combo',
                fieldLabel:'Bank Type',
                itemId: 'fdms_banktype_id',
                name: 'banktype_id',
                emptyText: 'Select Bank Type...',
                width: 150,
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                queryMode: 'local',
                minChars: 2,
                store: Ext.create('Ext.data.Store', {
                    autoLoad: false,
                    storeId : 'storeBanktype',
                    fields: [{
                        name: 'banktype_id',
                        type: 'int'
                    },
                    {
                        name: 'banktype',
                        type: 'string'
                    },
                    {
                        name: 'description',
                        type: 'string'
                    },
                    ],
                }),
                forceSelection:true,
                valueField: 'banktype_id',
                displayField: 'banktype',
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px">',
                    '<tr class="x-grid-row" w>',
                    '<th width="30%"><div class="x-column-header x-column-header-inner">Bank Type</div></th>',
                    '<th width="70%"><div class="x-column-header x-column-header-inner">Description</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{banktype}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),
            },
            // {
            //     xtype: 'banktypecombobox',
            //     fieldLabel:'Bank Type',
            //     emptyText: 'Select Bank Type',
            //     itemId: 'fdms_banktype_id',
            //     name: 'banktype_id',
            //     allowBlank: false,
            //     enableKeyEvents: true,
            //     margin: '0 0 5 0',
            //     enforeMaxLength: true,
            //     forceSelection:true
            //  },
            {
                xtype: 'textfield',
                name: 'bank_name',
                fieldLabel: 'Bank Name',
                emptyText: 'Input Bank Name',
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
            },
            {
                xtype: 'textfield',
                name: 'bank_acc_no',
                fieldLabel: 'Bank ACC No',
                emptyText: 'Input ACC No',
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
            },
            {
                xtype: 'xmoneyfield',
                name: 'opening_balance',
                fieldLabel: 'Opening Balance',
                enforceMaxLength: true,
                enableKeyEvents: true,
                maskRe: /[^\`\"\']/,
                value:0,
                anchor: '-5',
                allowBlank: false,
                fieldStyle: 'text-align:right;',
                width: '300'

            },
            {
                xtype: 'xmoneyfield',
                name: 'debit',
                fieldLabel: 'Debit',
                enforceMaxLength: true,
                enableKeyEvents: true,
                maskRe: /[^\`\"\']/,
                value:0,
                allowBlank: false,
                anchor: '-5',
                fieldStyle: 'text-align:right;',
                width: '300'

            },
            {
                xtype: 'xmoneyfield',
                name: 'credit',
                fieldLabel: 'Credit',
                enforceMaxLength: true,
                enableKeyEvents: true,
                maskRe: /[^\`\"\']/,
                value:0,
                allowBlank: false,
                anchor: '-5',
                fieldStyle: 'text-align:right;',
                width: '300'

            },
            {
                xtype: 'xmoneyfield',
                name: 'closing_balance',
                fieldLabel: 'Closing Balance',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                value:0,
                allowBlank: false,
                fieldStyle: 'text-align:right;',
                anchor: '-5',
                width: '300',
                forceSelection:true
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
                        text: 'Save'
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

