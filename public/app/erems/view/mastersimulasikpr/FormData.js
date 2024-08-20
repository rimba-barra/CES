Ext.define('Erems.view.mastersimulasikpr.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastersimulasikprformdata',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 600,
	//height: 300,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'textfield',
							fieldLabel: 'KPR Amount',
							name: 'kpr_realisation',
							labelWidth: '53%',
							maskRe: /[0-9\.]/,
							currencyFormat: true,
							enableKeyEvents: true,
                            decimalPrecision:2,
                            enforceMaxLength:true,
                            maxLength:13,
                            listeners:{
                                change:function(el, v, prev){
                                    var commaPos = v.indexOf('.')+1,
                                    strLen = v.length;

                                    if((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen-2)){
                                        el.setValue(prev);
                                    }
                                }
                            }
						}
                    ]
                },
                {
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					width: '100%',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'KPR Interest (%)',
							name: 'kpr_interest',
							labelWidth: '53%',
							maskRe: /[0-9\.]/,
							enableKeyEvents: true,
                            decimalPrecision:2,
                            enforceMaxLength:true,
                            maxLength:13,
                            listeners:{
                                change:function(el, v, prev){
                                    var commaPos = v.indexOf('.')+1,
                                    strLen = v.length;

                                    if(parseFloat(v) > 100){
                                        el.setValue(100);
                                    }else if(parseFloat(v) < 0){
                                        el.setValue(0);
                                    }else{    
                                        if((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen-2)){
                                            el.setValue(prev);
                                        }
                                    }
                                }
                            }
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					width: '100%',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'KPR Tenor (Month)',
							name: 'kpr_tenor',
							labelWidth: '53%',
							maskRe: /[0-9\.]/,
							enableKeyEvents: true
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					width: '100%',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Cicilan',
							name: 'kpr_cicilan',
							labelWidth: '53%',
							maskRe: /[0-9\.]/,
							currencyFormat: true,
							enableKeyEvents: true,
							readOnly: true,
                            decimalPrecision:2,
                            listeners: {
                                change: function(el){ 
                                    if(el.value >= 100){
                                        el.setValue(100);
                                    }else if(el.value < 0){
                                        el.setValue(0);
                                    }
                                }
                            }
						}
					]
				}
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
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
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

