Ext.define('Cashier.view.kasbondeptposting.FormEditRemaining', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kasbondeptpostingformeditremaining',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdkasbondeptposting",
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
                id: 'hideparam' + me.uniquename,
                name: 'hideparam',
                value: 'default'
            },
            {
                xtype: 'hiddenfield',
                id: 'project_id' + me.uniquename,
                name: 'project_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'kasbondept_id' + me.uniquename,
                name: 'kasbondept_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'kasbon_id' + me.uniquename,
                name: 'kasbon_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'voucher_id' + me.uniquename,
                name: 'voucher_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'kasbank_id' + me.uniquename,
                name: 'kasbank_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'approvename' + me.uniquename,
                name: 'approvename',
            },
            {
                xtype: 'hiddenfield',
                id: 'status' + me.uniquename,
                name: 'status',
            },
            {
                xtype: 'hiddenfield',
                id: 'projectname' + me.uniquename,
                name: 'projectname',
            },
            {
                xtype: 'hiddenfield',
                id: 'ptname',
                name: 'ptname',
            },
            {
                xtype: 'hiddenfield',
                id: 'prefixdept' + me.uniquename,
                name: 'prefixdept',
            },
            {
                xtype: 'hiddenfield',
                id: 'fixed_coa' + me.uniquename,
                name: 'fixed_coa',
            },
            {
                xtype: 'hiddenfield',
                id: 'coa_id' + me.uniquename,
                name: 'coa_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'prefix_id' + me.uniquename,
                name: 'prefix_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'adads' + me.uniquename,
                name: 'cheque_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'other_made_by' + me.uniquename,
                name: 'other_made_by',
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
                    xtype: 'xmoneyfield',
                    fieldLabel: 'Remaining',
                    itemId: 'fde_remainingkasbon' + me.uniquename,
                    id: 'remainingkasbon' + me.uniquename,
                    name: 'remainingkasbon',
                    emptyText: 'Auto Value',
                    allowBlank: false,
                    width: 300,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },

                ]
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
                    xtype: 'textareafield',
                    itemId: 'fde_action' + me.uniquename,
                    id: 'action' + me.uniquename,
                    name: 'action',
                    fieldLabel: 'Edit Reason',
                    allowBlank: false,
                    enforceMaxLength: true,
                    grow: true,
                    width: 300,
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
    var x = [
    {
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        padding: '0 0 0 0',
        layout: {
            padding: 6,
            type: 'hbox',
        },
        items: [
        {
            xtype: 'fieldcontainer',
            layout: 'vbox',
            align: 'right',
            bodyBorder: false,
            defaults: {
                layout: 'fit'
            },
            items: [

            {xtype: 'tbspacer', height: 5},
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
                    xtype: 'button',
                    action: 'save',
                    itemId: 'btnSave',
                    padding: 5,
                    width: 75,
                    iconCls: 'icon-approve',
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

