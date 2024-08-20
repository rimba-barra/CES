Ext.define('Erems.view.mastergaransi.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastergaransiformdata',
    requires:['Erems.library.template.component.Periodtypecombobox'],
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
                    name: 'guaranteetype_id'
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
                    anchor:'-300'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_guaranteetype',
                    name: 'guaranteetype',
                    fieldLabel: 'Guarantee Type',
                    allowBlank: false,
                    enforceMaxLength: true,
                    allowBlank: false,
                    maskRe: /[A-Za-z0-9\s.]/,
                    maxLength: 30,
                    anchor: '-5'
                }, {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none',
                    items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'Period',
                            anchor: '-5',
                            name: 'guarantee',
                            allowBlank: false,
                            minValue:0,
                            value:0,
                            maxValue:100,
                            flex: 1
                        }, {
                            xtype: 'splitter', width: 10,
                        }, {
                            xtype: 'periodtypecombobox',
                            fieldLabel: 'Periode type',
                            anchor: '-5',
                            name: 'period',
                            allowBlank: false,
                            flex: 1,
                            editable:false
                        }]
                },{
                    xtype      : 'xnotefieldEST',
                    padding    : '10px 0 0 0',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-5'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});