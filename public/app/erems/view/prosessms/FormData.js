Ext.define('Erems.view.prosessms.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.prosessmsformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    height: 500,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'sms_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'customer_customer_id'
                },
                {
                    xtype: 'dfdatefield',
                  
                    value:new Date(),
                    name:'process_date',
                    readOnly: true,
                            keepRO: true,
                    fieldLabel: 'Process Date'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'customer_name',
                            fieldLabel: 'Customer Name',
                            width:200,
                            readOnly: true,
                            keepRO: true,
                            margin: '0px 20px 10px 0'
                        },
                        {
                            xtype: 'button',
                            action: 'browse',
                            text: 'Browse'
                        }
                    ]

                },
                {
                    xtype      : 'xphonenumberfieldEST',
                    name       : 'sms_phonenumber',
                    fieldLabel : 'No. HP',
                    keepRO     : true
                }, {
                    xtype      : 'xnotefieldEST',
                    name       : 'notes',
                    cols       : 100,
                    rows       : 5,
                    maxLength  : 150,
                    fieldLabel : 'Notes'
                },
                {
                    xtype      : 'xnamefieldEST',
                    name       : 'collector_employee_name',
                    fieldLabel : 'Collector',
                },
                {
                    xtype: 'combobox',
                    displayField:'smscategory',
                    valueField:'smscategory_id',
                    name: 'smscategory_smscategory_id',
                    fieldLabel: 'Jenis'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

