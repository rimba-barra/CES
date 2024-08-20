Ext.define('Cashier.view.vdrequest.FormDataCopyVoucher', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.formdatacopyvoucher',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 180,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherrequestdatadesc',
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
                    name: 'voucher_id',
                    id: 'voucher_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'mode',
                    id: 'mode' + me.uniquename,
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel:'Copy to Project',
                    emptyText: 'Select Project',
                    name: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '0 0 5 0',
                    width: 400,
                    enforeMaxLength: true,
                    readOnly: true,
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
                    fieldLabel:'Copy to PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    width: 400
                },
                {
                    xtype: 'datefield',
                    name: 'voucher_date',
                    id: 'voucher_date' + me.uniquename,
                    allowBlank: false,
                    fieldLabel: 'Reg. Date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy',
                    value: new Date(),
                    anchor: '60%',
                    maxValue: new Date(),
                    listeners: {
                        blur: function(field) {
                            if( ! field.isValid()) {
                                Ext.Msg.alert("Alert", "Invalid Date!");
                                Ext.getCmp("voucher_date" + me.uniquename).setValue("");
                                return false;
                            }
                        }
                    }
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
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
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

