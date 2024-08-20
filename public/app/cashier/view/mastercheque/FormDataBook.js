Ext.define('Cashier.view.mastercheque.FormDataBook', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterchequeformdatabook',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
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
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_type',
                    value: 'OUT'
                },
//                 {
//                    xtype: 'hiddenfield',
//                    name: 'project_project_id'
//                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'pt_pt_id'
//                },
//                {
//                    xtype: 'textfield',
//                    name: 'pt_name',
//                    fieldLabel: 'Company',
//                    enforceMaxLength: true,
//                    readOnly: true,
//                    maskRe: /[^\`\"\']/,
//                    maxLength: 255,
//                    anchor: '-5'
//                },
                {
                    xtype: 'combobox',
                    name: 'project_project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                },
               {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    forceSelection: false,
                    allowBlank: false,
                    readOnly: false,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px">',
                            '<tr class="x-grid-row">',
                            '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                    absoluteReadOnly: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: false,
                    typeAhead: false,
                    listeners: {
                        keyup: function (field) {
                            var searchString = field.getValue();
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
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
                },
                {
                    xtype: 'combobox',
                    name: 'voucherprefix_voucherprefix_id',
                    fieldLabel: 'Bank',
                    displayField: 'coa_name',
                    valueField: 'voucherprefix_id',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                },
                {
                    xtype: 'textfield',
                    name: 'series',
                    fieldLabel: 'Series',
                    enforceMaxLength: true,
                    allowBlank: false,
                    maskRe: /[^\`\"\']/,
                    maxLength: 5,
                    anchor: '-5',
                },
                {
                    xtype: 'textfield',
                    name: 'cheque_no',
                    fieldLabel: 'Cheque No.',
                    enforceMaxLength: true,
                    allowBlank: false,
                    maskRe: /[0-9]/,
                    maxLength: 16,
                    anchor: '-5',
                },
//                {
//                    xtype: 'datefield',
//                    fieldLabel: 'Issued Date',
//                    name: 'issued_date',
//                    format: 'd-m-Y',
//                    submitFormat: 'Y-m-d H:i:s.u',
//                },
                {
                    xtype: 'textfield',
                    name: 'jumlah',
                    allowBlank: false,
                    fieldLabel: 'Jumlah Generate',
                    enforceMaxLength: true,
                    maskRe: /[0-9\.]/,
                    maxLength: 3,
                    anchor: '-5',
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
                        action: 'saveuse',
                        itemId: 'btnSaveUse',
                        disabled: true,
                        padding: 5,
                        width: 105,
                        iconCls: 'icon-search',
                        text: 'Save & Use'
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

