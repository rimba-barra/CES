Ext.define('Erems.view.topupwhatsapp.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.topupwhatsappformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    // height: 500,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                xtype: 'fieldcontainer',
                fieldDefaults: {
                    labelAlign: 'top',
                    msgTarget: 'side'
                },
                defaults: {
                    border: false,
                    xtype: 'panel',
                    bodyStyle: 'background:none',
                    flex: 1,
                    layout: 'anchor'
                },
                layout: 'hbox',
                items: [
                {
                    width: 600,
                    items: [
                    {
                        xtype: 'hiddenfield',
                        itemId: 'whatsapp_topup_id',
                        name: 'whatsapp_topup_id'
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'layer_img',
                        name: 'layer_img'
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'edit_image_flag',
                        name: 'edit_image_flag'
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'user_id',
                        name: 'user_id'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'user_fullname',
                        name: 'user_fullname',
                        fieldLabel: 'User',
                        readOnly:true,
                        anchor: '-5'
                    },
                    {
                        xtype        : 'datefield',
                        labelWidth   : 200,
                        allowBlank   : false,
                        fieldLabel   : 'Topup Date',
                        itemId       : 'topup_date',
                        name         : 'topup_date',
                        format       : 'd-m-Y',
                        altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                        submitFormat : 'Y-m-d H:i:s.u',
                        value        : new Date(),
                        flex         : 1,
                        editable     : false
                    },
                    {
                        xtype        : 'xmoneyfieldEST',
                        fieldLabel   : 'Nominal',
                        itemId       : 'nominal',
                        name         : 'nominal',
                        value        : 0.00,
                        flex         : 2,
                        decPrecision : 4
                    },
                    {
                        xtype: 'form',
                        itemId: 'formku',
                        bodyStyle: 'background:none;border:0',
                        items: [{
                            xtype: 'filefield',
                            itemId: 'topupwhatsapp_layermap',
                            name: 'topupwhatsapp_layermap',
                            fieldLabel: 'Bukti Topup',
                            emptyText: 'Select an image',
                            buttonText: 'Browse'
                        }]
                    },
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background:none',
                            itemId: 'topupwhatsapp_layermapimage',
                            height: 200,
                            html: '',
                            // anchor: '100%'
                        },
                        {
                            xtype: 'box',
                            hidden: true,
                            itemId: 'downloadBtn',
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: '[ Download Bukti Topup ]'
                            },
                            listeners: {
                                render: function (component) {
                                    component.getEl().on('click', function (e) {
                                        var top = _myAppGlobal.getController('Topupwhatsapp');
                                        top.downloadImg("topupwhatsapp");
                                    });
                                }
                            }
                        },
                    ]
                }]
            }],
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
            width: 75,
            iconCls: 'icon-save',
            text: 'Save'
        },
        {
            xtype: 'button',
            action: 'approve',
            itemId: 'btnApprove',
            padding: 5,
            width: 75,
            iconCls: 'icon-approve',
            text: 'Approve',
            hidden: true
        },
        {
            xtype: 'button',
            action: 'reject',
            itemId: 'btnReject',
            padding: 5,
            width: 75,
            iconCls: 'icon-unapprove',
            text: 'Reject',
            hidden: true
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
    }
    ];
    return x;
}
});

