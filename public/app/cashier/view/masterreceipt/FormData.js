Ext.define('Cashier.view.masterreceipt.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterreceiptformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    closable: false,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    deletedOtherPaymentRows: [],
    deletedArPaymentRows: [],
    deletedsubRows: [],
    deletedLocalstoreSubRows: [],
    editedRow: -1,
    deletedRowsWithoutID: 0,
    id: 'formdatamasterreceiptID',
    itemId:'formdatamasterreceiptID',
    rowData: null,
    width: 1000,
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
                name: 'receipt_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'prefix_no_bfr'
            },
            {
                xtype: 'hiddenfield',
                name: 'receipt_type_bfr'
            },
            {
                xtype: 'hiddenfield',
                name: 'receipt_no_bfr'
            },
            {
                xtype: 'projectcombobox',
                fieldLabel:'Project',
                emptyText: 'Select Project',
                name: 'project_id',
                allowBlank: false,
                enableKeyEvents: true,
                margin: '0 0 5 0',
                enforeMaxLength: true,
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
            {
                xtype: 'ptprojectcombobox',
                fieldLabel:'PT',
                emptyText: 'Select PT',
                name: 'pt_id',
                allowBlank: false,
                margin: '0 0 5 0',
                enableKeyEvents: true
            },
            {
                xtype: 'splitter',
                width: '20'
            },
            {
                xtype: 'combobox',
                name: 'receipt_type',
                emptyText: 'Select Type',
                fieldLabel: 'Type',
                queryMode: 'local',
                valueField: 'type',
                allowBlank: false,
                forceSelection: true,
                displayField: 'description',
                store: new Ext.data.JsonStore({
                    fields: ['type', 'description'],
                    data: [
                    {type: 'default', description: 'Default'},
                    {type: 'rs', description: 'RS'},
                    {type: 're', description: 'RE'},
                    ]
                }),
            },
            {
                xtype: 'splitter',
                width: '20'
            },
            {
                xtype: 'textfield',
                name: 'prefix_no',
                emptyText: 'Insert Prefix',
                fieldLabel: 'Prefix',
                width: '350',
                hidden: false,
            },
            {
                xtype: 'splitter',
                width: '20'
            },
            {
                xtype: 'textfield',
                name: 'receipt_no',
                fieldLabel: 'Receipt No',
                emptyText: 'Insert Receipt No',
                allowBlank: false,
                width: '150',
                maxLength: 6,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                hidden: false
            },
            {
                xtype: 'splitter',
                width: '20'
            },
            {
                xtype: 'numberfield',
                name: 'counter_no',
                emptyText: '',
                value:1,
                fieldLabel: 'Counter',
                width: 50,
                hidden: false,
                minValue: 1
            },
            {
                xtype: 'splitter',
                width: '20'
            },
            {
                xtype: 'textareafield',
                fieldLabel: 'Remarks',
                emptyText: 'Insert Remarks',
                anchor: '-5',
                name: 'description',
                width: 300,
                allowBlank: false,
                height: 40,
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
        layout: {
            padding: 6,
            type: 'hbox'
        },
        items: [
        {
            xtype: 'button',
            action: 'savedata',
            itemId: 'btnSave',
            padding: 5,
            width: 75, iconCls: 'icon-save',
            text: 'Save',
        },
        {
            xtype: 'tbspacer',
            flex: 1
        },
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
        }
        ]
    }
    ];
    return x;
},
});

