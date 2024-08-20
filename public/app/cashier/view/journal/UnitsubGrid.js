Ext.define('Cashier.view.journal.UnitsubGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.journalunitsubgrid',
    storeConfig: {
        id: 'IDselectedUnitsubStore',
        idProperty: 'schedule_id',
        extraParams: {
            mode_read: 'unitsublist'
        }
    },
    id:'browseUnitsubgrid',
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Journal',
    newButtonLabel: 'New Unit',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'subgl_id',
                    text: 'subgl id',
                    width: 10,
                    hidden: true 
                },
                {
                    dataIndex: 'code',
                    text: 'Code',
                    width: 100
                },
                {
                    dataIndex: 'code1',
                    text: 'Code 1',
                    width: 100
                },
                {
                    dataIndex: 'code2',
                    text: 'Code 2',
                    width: 100
                },
                {
                    dataIndex: 'code3',
                    text: 'Code 3',
                    width: 100
                },
                {
                    dataIndex: 'code4',
                    text: 'Code 4',
                    width: 100
                },
                {
                    dataIndex: 'description',
                    text: 'Description ',
                    width: 170
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Pick Unit Sub"
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {

        var cbf = new Cashier.template.ComboBoxFields();

        var x = [
            {
                xtype: 'textfield',
                name: 'code',
                fieldLabel: 'Code',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 30,
                anchor: '-15',
                width: 100,
                allowBlank: false,
                listeners: {
                    afterrender: function (field) {
                        field.focus(false, 1000);
                    }
                }
            },
            {
                xtype: 'textfield',
                name: 'description',
                fieldLabel: 'Description ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
                id: 'customerNameId',
            },
        ];
        return x;
    }
});