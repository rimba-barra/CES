Ext.define('Erems.view.utility.UtilitydetailFormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.utilitydetailformdata',
    requires:[
		'Erems.library.template.component.Utilitytypecombobox',
		'Erems.library.template.component.Utilitystatuscombobox'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'utility_id',
                    name: 'utility_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'unit_id',
                    name: 'unit_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'purchaseletter_id',
                    name: 'purchaseletter_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'is_detail',
                    name: 'is_detail',
					value: 'yes'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'temp_utility_id',
                    name: 'temp_utility_id'
                },
				/* Progress Air dan Listrik */
               	{xtype: 'panel', bodyPadding: 10, title: 'Progress Air dan Listrik', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'utilitytypecombobox',
                                                    fieldLabel: 'Utility Type',
                                                    anchor: '-5',
													itemId: 'fd_utilitytype_id',
                                                    name: 'utilitytype_id',
                                                    flex: 1,
                                                    allowBlank: false
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Installment No.',
                                                    anchor: '-5',
                                                    name: 'installment_no',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    enforceMaxLength:true,
                                                    maxLength:30,
                                                    maskRe:/[A-Za-z0-9\s.]/
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Meter No.',
                                                    anchor: '-5',
                                                    name: 'meter_no',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    enforceMaxLength:true,
                                                    maxLength:30,
                                                    maskRe:/[A-Za-z0-9\s.]/
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype            : 'datefield',
                                                    fieldLabel       : 'Request Date',
                                                    anchor           : '-5',
                                                    name             : 'request_date',
                                                    flex             : 1,
                                                    value            : new Date(),
                                                    format           : 'd-m-Y',
                                                    altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat     : 'Y-m-d H:i:s.u',
                                                    maskRe           :/[0-9-]/,
                                                    enforceMaxLength :true,
                                                    maxLength        :10,
                                                    listeners        : {
                                                        blur : function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                }, 
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Daya',
                                                    anchor     : '-5',
                                                    name       : 'power',
                                                    flex       : 1
                                                }
                                            ]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Installment Date',
                                                    anchor: '-5',
                                                    name: 'installment_date',
                                                    flex: 1,
                                                    //allowBlank: false,
													//value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'utilitystatuscombobox',
                                                    fieldLabel: 'Utility Status',
                                                    anchor: '-5',
													itemId: 'fd_utilitystatus_id',
                                                    name: 'utilitystatus_id',
                                                    flex: 1,
                                                    allowBlank: false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Followup Date',
                                                    anchor: '-5',
                                                    name: 'followup_date',
                                                    flex: 1,
                                                    //allowBlank: false,
													//value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
                                                }]
                                        },
										{
											xtype: 'splitter', height: 10,
										},
										{
                                            xtype      : 'xnotefieldEST',
                                            anchor     : '100%',
                                            fieldLabel : 'Note',
                                            labelAlign : 'top',
                                            name       : 'note',
                                            width      : '100%',
										}
                                    ]
                                },
                            ]
                        }
                    ]
                }
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});