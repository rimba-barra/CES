Ext.define('Erems.view.popupnamasementara.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.popupnamasementaraformdata',
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
                    name: 'cac_id'
                }, {
                    xtype: 'textfield',
                    name: 'cac_code',
                    fieldLabel: 'Code'
                }, {
                    xtype: 'textfield',
                    name: 'cac_name',
                     width:400,
                    fieldLabel: 'Fullname'
                },
                {
                    xtype      : 'xaddressfieldEST',
                    cols       : 100,
                    name       : 'ktp_address',
                    fieldLabel : 'KTP Address'
                },
                {
                    xtype: 'textfield',
                    width:300,
                    name: 'ktp_no',
                    fieldLabel: 'KTP Number'
                },
                {
                    xtype      : 'xphonenumberfieldEST',
                    width      : 300,
                    name       : 'home_phone',
                    fieldLabel : 'Home Phone Number'
                },
                {
                    xtype      : 'xphonenumberfieldEST',
                    width      : 300,
                    name       : 'handphone',
                    fieldLabel : 'Handphone Number'
                },
                {
             
                    xtype: 'combobox',
                    width:400,
                    name: 'upline_id',
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                    fieldLabel: 'Upline'
                },
                {
                    xtype: 'textfield',
                    width:300,
                    name: 'email',
                    fieldLabel: 'Email'
                },
                {
                    xtype: 'textfield',
                    name: 'npwp',
                    width:300,
                    fieldLabel: 'NPWP Number'
                },
                {
                    xtype      : 'xaddressfieldEST',
                    cols       :100,
                    name       : 'npwp_address',
                    fieldLabel : 'NPWP Address'
                },
                {
                    xtype: 'combobox',
                    name: 'bank_bank_id',
                    width: 400,
                    displayField: 'bank_company_name',
                    valueField: 'bank_id',
                    fieldLabel: 'Bank'
                },
                {
                    xtype: 'textfield',
                    name: 'nomor_rekening',
                    
                    fieldLabel: 'Nomor Rekening'
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

