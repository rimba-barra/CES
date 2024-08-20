Ext.define('Erems.view.constprogressconstreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.constprogressconstreportformdata',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Typecombobox',
		'Erems.library.template.component.Spkstatuscombobox',
		'Erems.library.template.component.Lunasstatuscombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 500,
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
                            xtype: 'clustercombobox',
                            name: 'cluster_id',
							fieldLabel:'Cluster / Kawasan',
                            reportParams:true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_cluster_id',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'typecombobox',
                            name: 'type_id',
                            fieldLabel:'Type',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_type_id',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'spkstatuscombobox',
                            name: 'spkstatus_id',
                            fieldLabel:'Status SPK',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_statusspk',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'lunasstatuscombobox',
                            name: 'lunasstatus_id',
                            fieldLabel:'Status Lunas',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_statuslunas',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                },
				{
					xtype: 'container',
					layout: 'hbox',
					width: '100%',
					items: [{
                            xtype      : 'xnumericfieldEST',
                            fieldLabel : 'Construction Progress',
                            anchor     : '-5',
                            name       : 'cp_start',
                            flex       : 12,
                            labelWidth : '60%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
						{xtype: 'splitter', width: 10}, 
						{
                            xtype      : 'xnumericfieldEST',
                            fieldLabel : 'to',
                            anchor     : '-5',
                            name       : 'cp_end',
                            flex       : 6,
                            labelWidth : 30,
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
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
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Process'
                    },
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

