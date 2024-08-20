Ext.define('Cashier.view.subeditor.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.subeditorformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'journalsubdetail_id',
    initComponent: function () {
        var me = this;
        var code = Ext.create('Ext.data.Store', {
            autoLoad: false,
            storeId : 'storeCode',
            fields: [{
                name: 'subgl_id',
                type: 'int'
            },
            {
                name: 'code',
                type: 'string'
            },
            {
                name: 'code1',
                type: 'string'
            },
            {
                name: 'code2',
                type: 'string'
            },
            {
                name: 'code3',
                type: 'string'
            },
            {
                name: 'code4',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'kelsub_id',
                type: 'int'
            }
            ],
        });
        
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
                name: 'journalsubdetail_id'
            },
            {
                xtype: 'textfield',
                name: 'project_id',
                hidden : true
            },
            {
                xtype: 'textfield',
                name: 'pt_id',
                hidden : true
            },
            {
                xtype: 'hiddenfield',
                name: 'kelsub_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'ceksubglempty',
                value : 1

            },
            {
                xtype: 'textfield',
                name: 'voucher_no',
                emptyText: 'Input Journal No',
                fieldLabel: 'Journal No',
                readOnly:true,
                // allowBlank: false
            },
            {
                xtype: 'datefield',
                fieldLabel:'Journal Date',
                name: 'voucher_date',
                emptyText: 'Select Date',
                readOnly:true,
                // allowBlank: false,
                format: 'd-m-Y',
                submitFormat: 'Y-m-d'
            },
            {
                xtype: 'textfield',
                name: 'coa',
                emptyText: 'Input COA',
                fieldLabel: 'COA',
                readOnly:true,
                // allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'type',
                emptyText: 'Input Type',
                readOnly:true,
                fieldLabel: 'Type',
                // allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'kelsub',
                emptyText: 'Input Kelsub',
                fieldLabel: 'Kelsub',
                readOnly:true,
                // allowBlank: false
            },
            // {
            //     xtype: 'subglcombobox',
            //     fieldLabel: 'Sub Code',
            //     itemId: 'fd_subgl_id',
            //     id: 'subgl_id',
            //     name: 'subgl_id',
            //     emptyText: 'Ketik Sub Code...',
            //     width: 300,
            //     allowBlank: false,
            //     enforceMaxLength: true,
            //     enableKeyEvents: true,
            //     queryMode: 'remote',
            //     forceSelection:true
            // },
            {

                xtype: 'combo',
                fieldLabel: 'Ganti Sub Code',
                emptyText: 'Ketik Sub Code...',
                name: 'subgl_id',
                queryMode: 'local',
                enableKeyEvents: true,
                store:code,
                forceSelection:true,
                allowBlank: false,
                valueField: 'subgl_id',
                displayField: 'code',
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="600px">',
                    '<tr class="x-grid-row" w>',
                    '<th width="20%"><div class="x-column-header x-column-header-inner">Sub Code</div></th>',
                    '<th width="15%"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                    '<th width="10%"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                    '<th width="10%"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                    '<th width="10%"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
                    '<th width="45%"><div class="x-column-header x-column-header-inner">Description</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),   
            },

            {
                xtype: 'textfield',
                name: 'code',
                emptyText: 'Input Code',
                readOnly:true,
                fieldLabel: 'Code'
            },
            {
                xtype: 'textfield',
                name: 'code1',
                emptyText: 'Input Code 1',
                readOnly:true,
                fieldLabel: 'Code 1'
            },
            {
                xtype: 'textfield',
                name: 'code2',
                emptyText: 'Input Code 2',
                readOnly:true,
                fieldLabel: 'Code 2'
            },
            {
                xtype: 'textfield',
                name: 'code3',
                emptyText: 'Input Code 3',
                readOnly:true,
                fieldLabel: 'Code 3'
            },
            {
                xtype: 'textfield',
                name: 'code4',
                emptyText: 'Input Code 4',
                readOnly:true,
                fieldLabel: 'Code 4'
            },
            {
                xtype: 'textareafield',
                name: 'description',
                emptyText: 'Input Description',
                readOnly:true,
                fieldLabel: 'Description'
            },
            {
                xtype: 'textareafield',
                name: 'keterangan',
                emptyText: 'Input Remarks',
                fieldLabel: 'Remarks',
                readOnly:true
            },
            {
                xtype: 'xmoneyfield',
                name: 'amount',
                readOnly:true,
                fieldLabel: 'Amount',
                emptyText: 'Input Amount',
                enforceMaxLength: true,
                align: 'right',
                maskRe: /[^\`\"\']/,
                enableKeyEvents: false,
                fieldStyle: 'text-align:right;',
                renderer: Ext.util.Format.numberRenderer('0,000.00')
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

