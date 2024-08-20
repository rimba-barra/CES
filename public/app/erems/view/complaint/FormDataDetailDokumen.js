Ext.define('Erems.view.complaint.FormDataDetailDokumen', {
	extend      : 'Erems.library.template.view.FormData',
	alias       : 'widget.complaintformdatadetaildokumen',
	requires    :['Erems.library.template.component.Typefilebastcombobox'],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 260,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent : function() {
		var me = this;

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

		Ext.applyIf(me, {
			items : [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_aftersales_dokumenupload',
					name   : 'aftersales_dokumenupload'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_aftersales_id',
					name   : 'aftersales_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_temp_id_dokumen',
					name   : 'temp_id_dokumen'
				},
				{
					xtype     : 'panel',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype     : 'panel',
							width     : '100%',
							padding   : '10px',
							bodyStyle : 'border:0px',
							items     : [
								{   
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [ 
										{
											xtype      : 'filefield',
											name       : 'dokumen_bast',
											emptyText  : 'Select an dokumen',
											fieldLabel : 'Dokumen',
											msgTarget  : 'side',
											anchor     : 1,
											buttonText : 'Select File',
											allowBlank : false,
											listeners  : {
												afterrender : function(cmp){
												  	cmp.fileInputEl.set({
														accept :'image/jpeg, application/pdf' // or w/e type
											  		});
												}
											}
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype            : 'typefilebastcombobox',
											fieldLabel       : 'Jenis File',
											itemId           : 'fd_typefilebast',
											name             : 'jenis_file',
											emptyText        : 'Please Select',
											anchor           : '-5',
											allowBlank       : false,
											editable         : false,
											enforceMaxLength : true,
											enableKeyEvents  : true,
											rowdata          : null,
											width            : '75%',
										},
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xnotefieldEST',
											fieldLabel : 'Description',
											anchor     : '-5',
											name       : 'description',
											flex       : 1,
										}
									]
								},
							]
						},
					]
				}
			],
			dockedItems : me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});