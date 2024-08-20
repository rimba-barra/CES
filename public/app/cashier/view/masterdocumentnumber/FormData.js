Ext.define('Cashier.view.masterdocumentnumber.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterdocumentnumberformdata',
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
                    name: 'documentnumber_id'
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                },
                {
                    xtype: 'textfield',
                    name: 'module_name',
                    fieldLabel: 'Module name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                     emptyText: 'Contoh : KAS/PC atau BANK/BNI',
                    anchor: '-5',
                },
                {
                    xtype: 'textfield',
                    name: 'format',
                    fieldLabel: 'Prefix',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    emptyText: 'NAMA_BANK[XXXX]/[MM]',
                    anchor: '-5',
                },
                {
                    xtype: 'textfield',
                    name: 'year',
                    fieldLabel: 'Year',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 9,
                    anchor: '-5',
                },
                {
                    xtype: 'textfield',
                    name: 'month',
                    fieldLabel: 'Month',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 9,
                    anchor: '-5',
                },
                {
                    xtype: 'textfield',
                    name: 'counter',
                    fieldLabel: 'Number',
                    enforceMaxLength: true,
                    maxLength: 9,
                },
                {
                    xtype: 'combobox',
                    name: 'reset_type',
                    fieldLabel: 'Reset Type',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: false,
                    forceSelection: true,
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: 'Y', description: 'Year'},
                            {status: 'M', description: 'Month'},
                            {status: 'D', description: 'Day'},
                        ]
                    }),
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

