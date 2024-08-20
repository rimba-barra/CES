Ext.define('Erems.view.buktipemilik.NjopFormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.buktipemiliknjopformdata',
	requires: ['Erems.library.template.view.DateField'],
	frame: true,
	// autoScroll: true,
	anchorSize: 100,
	height: 200,
	width: 300,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'padding:5px 5px 0',
	id: 'buktipemiliknjopformdata',
	initComponent: function () {
		var me = this;
        var currentDate = new Date();
        var years = [];
        var yDate = currentDate.getFullYear();

        for (var i = (yDate - 10); i <= (yDate); i++) {

            years.push({
                "number": i, "name": i
            });
        }
        
        var yearStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: years
        });

		function dateOneYear() {
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth() + x);
			return CurrentDate;
		}

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'buktipemilik_id',
					name: 'buktipemilik_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'njop_id',
					name: 'njop_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'unit_id',
					name: 'unit_id'
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						// {
		    //                 xtype: 'datefield',
		    //                 fieldLabel: 'Tahun',
						// 	// labelWidth: 120,
		    //                 anchor: '-5',
		    //                 name: 'tahun',
		    //                 flex: 1,
						// 	allowBlank: false,
		    //            		format: 'Y',
						// 	altFormats: 'Y',
						// 	submitFormat: 'Y'
		    //             },

                        {
                            xtype        : 'combobox',
		                    fieldLabel 	 : 'Tahun',
                            name         : 'tahun',
                            displayField : 'name',
                            valueField   : 'number',
                            value        : yDate,
                            store        : yearStore,
							allowBlank 	 : false,
                            listeners 	 : {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
                        },
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{ 
							xtype        : 'xmoneyfieldEST',
							fieldLabel   : 'NJOP',
							name         : 'njop',
							allowBlank 	 : false,
							value        : 0.00,
							flex         : 1,
							decPrecision : 4
						}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	generateDockedItem: function () {
		var x = [
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
						action: 'save',
						itemId: 'btnSave',
						padding: 5,
						width: 75,
						iconCls: 'icon-save',
						text: 'Save'
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
		];
		return x;
	},

});