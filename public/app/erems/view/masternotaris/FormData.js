Ext.define('Erems.view.masternotaris.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masternotarisformdata',
    requires:['Erems.library.template.component.Citycombobox',
              'Erems.library.template.component.Countrycombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'notaris_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s.]/,
                    minLength: 1,
                    maxLength: 5,
                    anchor: '-500'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_side',
                    name: 'notaris',
                    fieldLabel: 'Notaris name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s.]/,
                    maxLength: 30,
                    anchor: '-350'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_notaris_register',
                    name: 'notaris_register',
                    fieldLabel: 'Notaris Register',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s.]/,
                    maxLength: 30,
                    anchor: '-350'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_notaris_npwp',
                    name: 'notaris_npwp',
                    fieldLabel: 'Notaris NPWP',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s.]/,
                    maxLength: 50,
                    anchor: '-350'
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'alamat',
                    fieldLabel : 'Address',
                    anchor     : '-5'
                },
                {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none',
                    items: [{
                            xtype: 'countrycombobox',
                            anchor: '-5',
                            flex: 1,
                            itemId:'fd_country',
                            fieldLabel: 'Country',
                            name: 'country_id'
                            
                        }, {
                            xtype: 'splitter', width: 10,
                        }, {
                            xtype: 'citycombobox',
                            anchor: '-5',
                            itemId:'fd_city',
                            flex: 1,
                            fieldLabel: 'City',
                            name: 'city_id'
                            
                            
                        }]
                }, {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none',
                    items: [{
                            xtype      : 'xphonenumberfieldEST',
                            fieldLabel : 'Telp',
                            anchor     : '-5',
                            name       : 'telp',
                            flex       : 1
                        }, {
                            xtype: 'splitter', width: 10,
                        }, {
                            xtype      : 'xphonenumberfieldEST',
                            fieldLabel : 'Fax',
                            anchor     : '-5',
                            name       : 'fax',
                            flex       : 1
                        }]
                }, {
                    padding: '10px 0 0 0',
                    xtype: 'textfield',
                    itemId: 'fdms_email',
                    name: 'email',
                    fieldLabel: 'Email',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50,
                    anchor: '-250',
                    vtype:'email',
                    listeners: {
                        'blur': function (thisField) {
                            if (!thisField.isValid()) {
                                this.setValue("");
                            }
                        }
                    }
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});