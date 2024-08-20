Ext.define('Erems.view.mastercontractor.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastercontractorformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
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
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'contractor_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    maskRe: /[A-Za-z0-9]/,
                    enforceMaxLength: true,
                    maxLength: 5,
                    anchor: '-500'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_side',
                    name: 'contractorname',
                    fieldLabel: 'Contractor name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 30,
                    anchor: '-350'
                },


                {
                    xtype      : 'xaddressfieldEST',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'address',
                    fieldLabel : 'Address',
                    anchor     : '-5'
                },
                {   xtype : 'maskfield',
                    mask: '##.###.###.#-###.###',
                    itemId: 'fdms_npwp',
                    name: 'npwp',
                    fieldLabel: 'NPWP',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[0-9-.]/,
                    maxLength: 30,
                    anchor: '-350'
                },
                {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none',
                    items: [{
                            xtype: 'combobox',
                            anchor: '-5',
                            flex: 1,
                            itemId: 'fd_country',
                            fieldLabel: 'Country',
                            displayField: cbf.country.d,
                            valueField: cbf.country.v,
                            name: 'country_country_id',
                            queryMode:'local'

                        }, {
                            xtype: 'splitter', width: 10,
                        }, {
                            xtype: 'combobox',
                            anchor: '-5',
                            itemId: 'fd_city',
                            flex: 1,
                            displayField: cbf.city.d,
                            valueField: cbf.city.v,
                            fieldLabel: 'City',
                            name: 'city_city_id',
                            queryMode:'local'


                        }]
                }, {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Kodepos',
                            anchor: '-5',
                            name: 'kodepos',
                            maskRe: /[A-Za-z0-9]/,
                            flex: 1,
                            enforceMaxLength:true,
                            maxLength:10
                        }, {
                            xtype: 'splitter', width: 10,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            anchor: '-5',
                            name: 'email',
                            vtype:'email',
                            listeners: {
                                'blur': function (thisField) {
                                    if (!thisField.isValid()) {
                                        this.setValue("");
                                    }
                                }
                            },
                            enforceMaxLength:true,
                            maxLength:50,
                            flex: 1
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
                    itemId: 'fdms_sisde',
                    name: 'PIC',
                    fieldLabel: 'Contact Person',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z]/,
                    maxLength: 30,
                    anchor: '-350'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});