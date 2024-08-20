Ext.define('Masterdata.view.sistemdocumentnumbering.FormData', {
    extend: 'Ext.form.Panel',
	
    alias: 'widget.SistemdocumentnumberingFormData',
	itemId: 'SistemdocumentnumberingFormData',
	
    frame: true,
    height: 370,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',	
		
    initComponent: function() {
        var me = this;

	    var currentTime = new Date(), now = currentTime.getFullYear(), years = [], y = 1975;
	    while(y<=now){
	        years.push([y]);
	        y++;
	    }
	    
	    var storeThn = new Ext.data.SimpleStore({
	        fields: [ 'tahun' ],        
	        data: years
	    });	 
	    
	    var storeDay = new Ext.data.SimpleStore({
	        fields: [ 'day' ],        
	        data: ' '
	    });	 	    
	    
	    var storeBln = Ext.create('Ext.data.Store', {
						    fields: ['id', 'month'],
						    data : [
				                {"id" : 1, "month" : "January"},
				                {"id" : 2, "month" : "February"},
				                {"id" : 3, "month" : "March"},
				                {"id" : 4, "month" : "April"},
				                {"id" : 5, "month" : "May"},
				                {"id" : 6, "month" : "June"},
				                {"id" : 7, "month" : "July"},
				                {"id" : 8, "month" : "August"},
				                {"id" : 9, "month" : "September"},
				                {"id" : 10, "month" : "October"},
				                {"id" : 11, "month" : "November"},
				                {"id" : 12, "month" : "December"}
						    ]
						});	        
        
        Ext.applyIf(me, {	
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%',
                labelWidth: 100 
            },        	
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'sistemdocumentnumber_id',
                    name: 'sistemdocumentnumber_id'
				},
                {
                    xtype: 'label',
                    text: '',
                    itemId: 'error',
                    style : {
                        color : 'red'
                    }
                },				
				{
					xtype: 'combobox',
					fieldLabel: 'Application Name',
					itemId: 'apps_id',
					name: 'apps_id',
					allowBlank: false,
					displayField: 'apps_name',
					valueField: 'apps_id',
					forceSelection: true,
					typeAhead: true,
					queryMode: 'local'
				},				
				{
					xtype: 'combobox',
					fieldLabel: 'Project Name',
					itemId: 'project_id',
					name: 'project_id',
					allowBlank: false,
					displayField: 'project_name',
					valueField: 'project_id',
					forceSelection: true,
					typeAhead: true,
					queryMode: 'local',
					readOnly: true,
					emptyText: 'Select Application First!'
				},
				{
					xtype: 'combobox',
					fieldLabel: 'Pt Name',
					itemId: 'pt_id',
					name: 'pt_id',
					allowBlank: false,
					displayField: 'pt_name',
					valueField: 'pt_id',
					forceSelection: true,
					typeAhead: true,
					queryMode: 'local',
					readOnly: true,
					emptyText: 'Select Project First!'
				},				
				{
                    xtype: 'textfield',
					fieldLabel: 'Module Name',
                    itemId: 'module_name',
                    name: 'module_name',
					allowBlank: false,
					margin: '0 100 5 0',
					maxLength: 200
                },
				{
                    xtype: 'textfield',
					fieldLabel: 'Format',
                    itemId: 'format',
                    name: 'format',
					allowBlank: false,
					emptyText: 'Ex: INV/[@VAR1]/[PROJECT][PT]/[DD][MM][YY]/[XXXXXX]/[@VAR2]',
					maxLength: 200
                },    
                {
                	xtype: 'fieldcontainer',
                	defaults: {
                		labelAlign: 'top',
                		labelSeparator: '',
                		labelClsExtra: 'small',
                        fieldStyle: 'margin-bottom:3px;',
                        anchor: '100%',
                        columnWidth: 0.50
                	},
                	layout: {
                        type: 'column'
                    },
                    items: [
		                {
							xtype: 'combobox',
		                    fieldLabel: 'Reset Type',
		                    name: 'reset_type',
		                    itemId: 'reset_type',
						    store: Ext.create('Ext.data.Store', {
									    fields: ['id', 'name'],
									    data : [
									        {"id":"Y", "name":"Yearly"},
									        {"id":"M", "name":"Monthly"},
									        {"id":"D", "name":"Daily"},
									        {"id":"X", "name":"Never Reset"}
									    ]
									}),
						    queryMode: 'local',
						    displayField: 'name',
						    valueField: 'id',
						    allowBlank: false
		                }, 
						{
		                    xtype: 'numberfield',
							fieldLabel: 'Counter',
		                    itemId: 'counter',
		                    name: 'counter',
							allowBlank: false,
							margin: '0 0 0 100',
							minValue: 0,
							maxLength: 0,
							enforceMaxLength: true,
							emptyText: 'Fill format (X) first'
		                }	            
                    ]
                },                     
                {
                	xtype: 'fieldcontainer',
                	defaults: {
                		labelAlign: 'top',
                		labelSeparator: '',
                		labelClsExtra: 'small',
                        fieldStyle: 'margin-bottom:3px;',
                        anchor: '100%',
                        columnWidth: 0.33
                	},
                	layout: {
                        type: 'column'
                    },
                    items: [
			            {
							xtype: 'combobox',
			                fieldLabel: 'Year',
			                name: 'year',
			                itemId: 'year',
						    store: storeThn,
						    queryMode: 'local',
						    displayField: 'tahun',
						    valueField: 'tahun',
						    readOnly: true,
						    margin: '0 0 0 0'
			            }, 
		                {
							xtype: 'combobox',
							fieldLabel: 'Month',
			                name: 'month',
			                itemId: 'month',
						    store: storeBln,
						    queryMode: 'local',
						    displayField: 'month',
						    valueField: 'id',
						    readOnly: true,
						    margin: '0 0 0 3'
		                },	 
		                {
							xtype: 'combobox',
							fieldLabel: 'Day',
			                name: 'day',
			                itemId: 'day',
						    store: storeDay,
						    queryMode: 'local',
						    displayField: 'day',
						    valueField: 'day',
						    readOnly: true,
						    margin: '0 0 0 3'
		                } 			            
                    ]
                },                  
				{
                    xtype: 'textareafield',
                    fieldLabel: 'Description',					
                    itemId: 'description',
                    name: 'description',                                       
					maxLength: 255,
					height: 60
                },
				/*{
					xtype: 'checkboxfield',
					fieldLabel: ' ',
					itemId: 'is_default',											
					name: 'is_default',
					boxLabel: 'Default',
					boxLabelCls: 'x-form-cb-label small',
					inputValue: '1',
					uncheckedValue: '0',
					margin: '10 0'
				}*/		
			],
            dockedItems: [
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
                            text: 'Cancel'
                        }
                    ]
                }
            ]			
		});
        me.callParent(arguments);
    }
});	