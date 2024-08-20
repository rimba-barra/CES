Ext.define('Erems.view.mastercac.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastercacformdata',
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
                    fieldLabel: 'Code',
                    enforceMaxLength:true,
                    maxLength:8,
                    allowBlank:false,
                    maskRe: /[A-Za-z0-9-]/,
                }, {
                    xtype: 'textfield',
                    name: 'cac_name',
                    width:400,
                    fieldLabel: 'Fullname',
                    maskRe: /[A-Za-z0-9\s]/,
                },
                {
                    xtype      : 'xaddressfieldEST',
                    cols       :100,
                    name       : 'ktp_address',
                    fieldLabel : 'KTP Address',
                },
                {
                    xtype      : 'xnumericfieldEST',
                    width      : 300,
                    name       : 'ktp_no',
                    fieldLabel : 'KTP Number',
                    maxLength  : 16,
                },
                {
                    xtype      : 'xphonenumberfieldEST',
                    width      : 300,
                    name       : 'home_phone',
                    fieldLabel : 'Home Phone Number',
                },
                {
                    xtype      : 'xphonenumberfieldEST',
                    width      : 300,
                    name       : 'handphone',
                    fieldLabel : 'Handphone Number',
                },
                {
             
                    xtype: 'combobox',
                    width:400,
                    queryMode:'local',
                    name: 'upline_id',
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                    fieldLabel: 'Upline'
                },
                {
                    xtype: 'textfield',
                    width:300,
                    name: 'email',
                    fieldLabel: 'Email',
                    vtype:'email',
                    listeners: {
                        'blur': function (thisField) {
                            if (!thisField.isValid()) {
                                this.setValue("");
                            }
                        }
                    },
                },
                {
                    xtype      : 'xnumericfieldEST',
                    name       : 'npwp',
                    width      : 300,
                    fieldLabel : 'NPWP Number',
                    maxLength  : 15,
                },
                {
                    xtype      : 'xaddressfieldEST',
                    cols       : 100,
                    name       : 'npwp_address',
                    fieldLabel : 'NPWP Address',
                },
                {
                    xtype: 'combobox',
                    name: 'bank_bank_id',
                    queryMode:'local',
                    width: 400,
                    //displayField: 'bank_name - bank_company_name',
                    displayField: 'bank_company_name',
                   /* listConfig: {
                        //  itemTpl: '{bank_name} - {bank_company_name}'
                        itemTpl: '{bank_company_name}'
                    }, */
                    valueField: 'bank_id',
                    fieldLabel: 'Bank'
                },
                {
                    xtype      : 'xnumericfieldEST',
                    name       : 'nomor_rekening',
                    fieldLabel : 'Nomor Rekening',
                    maxLength  : 15,
                },

                //added by anas 06072021
                {
                    xtype: 'textfield',
                    name: 'username',
                    width:300,
                    fieldLabel: 'Username',
                },
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    name: 'pass',
                    width:300,
                    fieldLabel: 'Password',
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5px 0 5px 0',
                    items: [
                        {
                            xtype: 'splitter', width: 110,
                        },
                        {
                            xtype: 'label',
                            text: '*kosongkan jika password tidak diganti',
                        }
                    ]
                },
                //end added by anas

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

