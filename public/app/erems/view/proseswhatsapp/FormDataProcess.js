Ext.define('Erems.view.proseswhatsapp.FormDataProcess', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.proseswhatsappformdataprocess',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    height: 250,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'process_id'
                },
                {
                    xtype: 'dfdatefield',
                    value:new Date(),
                    name:'process_date',
                    fieldLabel: 'Process Date'
                },
                {
                    xtype: 'combobox',
                    name:'smscategory_smscategory_id',
                    displayField: 'smscategory',
                    valueField: 'smscategory_id',
                    fieldLabel: 'Category',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    defaults:{
                        width:150
                    },
                    items: [
                        {
                            xtype: 'dfdatefield',
                            margin:'0 20px 10px 0',
                            name:'start_date',
                            fieldLabel: 'SP Date',
                            width:200
                        }, {
                            xtype: 'dfdatefield',
                            name:'end_date',
                            labelWidth:20,
                            fieldLabel: 'S/D'
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    name:'collector_id',
                    fieldLabel: 'Collector'
                },
                {
                    xtype: 'dfdatefield',
                    name:'akad_plandate',
                    fieldLabel: 'Akad Plan'
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
                action: 'process',
               
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

