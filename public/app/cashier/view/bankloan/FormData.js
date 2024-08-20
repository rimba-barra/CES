Ext.define('Cashier.view.bankloan.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.bankloanformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_bankloan',
    bindPrefixName: 'Bankloan',
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function(){
    	var me = this;
        var date = new Date();

        var year = [];
        for (var i = (date.getFullYear()-5); i <= date.getFullYear(); i++) {
            year.push(
                {'tahun_id' : i, 'txt': i}
            );
        }

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
        			name: 'hideparam',
        			value: 'default'
        		},
                {
                    xtype: 'hiddenfield',
                    id: 'bank_loan_id' + me.uniquename,
                    name: 'bank_loan_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_project_id' + me.uniquename,
                    name: 'project_id',
                    id: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_pt_id' + me.uniquename,
                    name: 'pt_id',
                    id: 'pt_id',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Company',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                		{
                			xtype: 'ptcustomcombobox',
                			fieldLabel: '',
                			itemId: 'fd_projectpt_id' + me.uniquename,
                			id: 'projectpt_id',
                			name: 'projectpt_id',
                			width: 354,
                			emptyText: 'Company',
                			readOnly: false,
                			allowBlank: false,
                			// enforceMaxLength: true,
                			enableKeyEvents : true,
                			forceSelection: true,
                			rowdata: null
                		},
                    ]
                },
        		{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Periode',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'bulan',
                            fieldLabel: '',
                            queryMode: 'local',
                            valueField: 'bulan_id',
                            value: (date.getMonth()+1),
                            forceSelection: true,
                            displayField: 'txt',
                            width: 174,
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['bulan_id', 'txt'],
                                data: [
                                    {bulan_id: 1, txt: 'Januari'},
                                    {bulan_id: 2, txt: 'Februari'},
                                    {bulan_id: 3, txt: 'Maret'},
                                    {bulan_id: 4, txt: 'April'},
                                    {bulan_id: 5, txt: 'Mei'},
                                    {bulan_id: 6, txt: 'Juni'},
                                    {bulan_id: 7, txt: 'Juli'},
                                    {bulan_id: 8, txt: 'Agustus'},
                                    {bulan_id: 9, txt: 'September'},
                                    {bulan_id: 10, txt: 'Oktober'},
                                    {bulan_id: 11, txt: 'November'},
                                    {bulan_id: 12, txt: 'Desember'},
                                ]
                            }),
                            autoSelect:true,
                            listeners: {
                                afterrender: function() {
                                this.setValue(this.value);    
                                }
                            },
                            readOnly: false,
                            allowBlank: false,
                        },
                        {
                            xtype: 'splitter',
                            width: '6'
                        },
                        {
                            xtype: 'combobox',
                            name: 'tahun',
                            fieldLabel: '',
                            queryMode: 'local',
                            valueField: 'tahun_id',
                            value: date.getFullYear(),
                            forceSelection: true,
                            displayField: 'txt',
                            width: 174,
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['tahun_id', 'txt'],
                                data: year
                            }),
                            autoSelect:true,
                            listeners: {
                                afterrender: function() {
                                this.setValue(this.value);    
                                }
                            },
                            readOnly: false,
                            allowBlank: false,
                        },
                    ],
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	bodyBorder: false,
                	defaults: {
                		layout: 'fit'
                	},
                	items: [
                		{
                			xtype: 'tabpanel',
                			itemId: 'bankloantab',
                			name: 'bankloantab',
                			activeTab: 0,
                            region: 'center',
                            layout: 'hbox',
                            flex: 1,
                			items: [
                				{
                					title: 'DETAIL',
                					xtype: 'bankloangriddetail',
                					name: 'gridtabdetail',
                					id: 'gridtabdetail',
                                    closable: false,
                                    flex: 1
                					/*width: 750,
                					height: 300*/
                				}
                			]
                		}
                	]
                }
        	]
        });
        me.callParent(arguments);

    },
    generateDockedItems: function () {
    	var x = [
    		{
    			xtype: 'toolbar',
    			dock: 'bottom',
    			ui: 'footer',
    			padding: '0 0 0 0',
    			layout: {
    				padding: 6,
    				type: 'hbox'
    			},
    			items: [
    				{
    					xtype: 'fieldcontainer',
    					layout: 'hbox',
    					align : 'left',
    					bodyBorder: false,
    					defaults: {
    						layout: 'fit'
    					},
    					items: [
    						{
    							xtype: 'button',
    							action: 'save',
    							itemId: 'btnSave',
    							padding: 5,
    							width: 75,
    							iconCls: 'icon-save',
    							text: 'Save',
    						},
                            {
                                xtype: 'button',
                                action: 'cancel',
                                itemId: 'btnCancel',
                                padding: 5,
                                width: 75,
                                iconCls: 'icon-cancel',
                                text: 'Cancel',
                                handler: function () {
                                    this.up('window').close();
                                }
                            },
    					]
    				}
    			]
    		}
    	];

    	return x;
    }
});