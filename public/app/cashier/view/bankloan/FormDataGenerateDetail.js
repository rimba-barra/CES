Ext.define('Cashier.view.bankloan.FormDataGenerateDetail', {
	extend: 'Cashier.library.template.view.FormData',
	alias: 'widget.bankloandetailgenerateformdata',
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	height: 200,
	bodyBorder: true,
	bodyPadding: true,
	uniquename: '_bankloandetailgenerate',
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: {
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px',
				anchor: '100%'
			},
			items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Saldo Kas Setara Kas',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'coacombogrid',
                            fieldLabel:'',
                            emptyText: 'Select COA',
                            name: 'coa_saldo_kas',
                            allowBlank: false,
                            enableKeyEvents: true,
                            typeAhead: true,
                            forceSelection: true,
                            width: '100%',
                            listeners: {
                                keyup: function (field) {
                                    var me = this;
                                    var c = 0;
                                    var searchString = field.getValue().toLowerCase();
                                    var store = field.getPicker().getStore();
                                    if (searchString) {

                                        store.filterBy(function (record, id) {
                                            if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else if (record.get('coa').indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else {
                                                return false;
                                                store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                            },
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Saldo Restricted Fund',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'coacombogrid',
                            fieldLabel:'',
                            emptyText: 'Select COA',
                            name: 'coa_saldo_restricted',
                            allowBlank: false,
                            enableKeyEvents: true,
                            typeAhead: true,
                            forceSelection: true,
                            width: '100%',
                            listeners: {
                                keyup: function (field) {
                                    var me = this;
                                    var c = 0;
                                    var searchString = field.getValue().toLowerCase();
                                    var store = field.getPicker().getStore();
                                    if (searchString) {

                                        store.filterBy(function (record, id) {
                                            if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else if (record.get('coa').indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else {
                                                return false;
                                                store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                            },
                        },
                    ]
                },
			],
			dockedItems: me.generateDockedItems()
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
				type: 'hbox',
			},
			items: [                           
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				align: 'right',
				bodyBorder: false,
				defaults: {
					layout: 'fit'
				},
				items: [				
				{
					xtype: 'button',
					action: 'generate',
					itemId: 'btnGenerate',
					padding: 5,
					width: 75,
                    iconCls: 'icon-refresh',
					text: 'Generate'
				},
				{
					xtype: 'splitter',
					width: '10'
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
			},
			]
		}
		];
		return x;
		
	}
});