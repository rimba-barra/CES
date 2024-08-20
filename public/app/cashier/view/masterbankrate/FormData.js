Ext.define('Cashier.view.masterbankrate.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterbankrateformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'banktype_id',
    initComponent: function () {
        var me = this;
        var storex = Ext.create('Ext.data.Store', {
            autoLoad: true,
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
            }
            ]
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
                name: 'bank_rate_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'project_id',
                value: parseInt(apps.project)
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
                forceSelection:true
            },
            {
                xtype: 'voucherprefixcombobox',
                fieldLabel:'Bank',
                emptyText: 'Select Bank',
                name: 'voucherprefix_id',
                allowBlank: false,
                enableKeyEvents: true,
                margin: '0 0 5 0',
                enforceMaxLength: true,
                forceSelection:true,
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                    '<tr class="x-grid-row">',                
                    '<th width="50px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                    '<th width="100px"><div class="x-column-header x-column-header-inner">Bank Account</div></th>',
                    '<th width="50px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                    '<th width="50px"><div class="x-column-header x-column-header-inner">In / Out</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{in_out}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">{coaname}</tpl>'
                    )
            },
            {
                xtype: 'subglcombobox',
                fieldLabel: 'Sub.',
                itemId: 'fd_subgl_id',
                id: 'subgl_id',
                name: 'subgl_id',
                emptyText: 'Select Sub',
                width: 300,
                allowBlank: true,
                enforceMaxLength: true,
                forceSelection:true,
                // enableKeyEvents: true,
                queryMode: 'remote',
                hidden:true
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
                    width: 90,
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
                    width: 90,
                    allowBlank: false,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                }
                ]
            },
            {
                xtype: 'textfield',
                name: 'rate',
                allowBlank: false,
                fieldLabel: 'Rate',
                width: 100
            }
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

